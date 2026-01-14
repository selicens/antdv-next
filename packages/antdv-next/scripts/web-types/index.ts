import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { frontmatterPlugin } from '@mdit-vue/plugin-frontmatter'
import MarkdownIt from 'markdown-it'
import { glob } from 'tinyglobby'
import { version } from '../../package.json'

// --- 1. 配置 Markdown 解析器 ---
const md = MarkdownIt({ html: true })
md.use(frontmatterPlugin, {
  grayMatterOptions: {
    excerpt: false,
    format: 'yaml',
  },
})

// --- 配置项 ---
const CONFIG = {
  tagPrefix: 'a-',
  libraryName: 'antdv-next',
  libraryVersion: version,
  outputWebTypes: 'web-types.json',
  outputVSCode: 'web-tags.json',
}

const markdowns = [
  './src/pages/components/*/index.zh-CN.md',
  './src/pages/components/*/index.en-US.md',
]

const baseUrl = fileURLToPath(new URL('../../../../playground', import.meta.url))
const uiBaseUrl = fileURLToPath(new URL('../../', import.meta.url))

// --- 工具函数 ---

function toKebabCase(str: string) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

function cleanText(text?: string) {
  if (!text)
    return ''
  return text
  // 1. 处理常见的 HTML 实体转义
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
  // 2. 移除 markdown 链接 [text](url) -> text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
  // 3. 移除代码块符号和 HTML 标签
    .replace(/`/g, '')
    .replace(/<[^>]+>/g, '')
    .trim()
}

// --- 核心解析逻辑 ---

async function parseMarkdown(filePath: string) {
  const content = await fs.readFile(filePath, 'utf-8')
  const env: Record<string, any> = {}
  const tokens = md.parse(content, env)
  const frontmatter = env.frontmatter || {}

  if (!frontmatter.title)
    return null

  const componentName = frontmatter.title
  const tagName = `${CONFIG.tagPrefix}${toKebabCase(componentName)}`

  const attributes: any[] = []
  const events: any[] = []
  const slots: any[] = []

  let currentSection = ''

  for (let i = 0; i < tokens.length; i++) {
    const token: any = tokens[i]
    if (token.type === 'heading_open') {
      const inlineToken = tokens[i + 1]
      const text = inlineToken ? inlineToken.content.toLowerCase() : ''
      if (text.includes('api'))
        currentSection = 'api'
      else if (['property', 'props', '属性'].some(k => text.includes(k)))
        currentSection = 'props'
      else if (['events', 'event', '事件'].some(k => text.includes(k)))
        currentSection = 'events'
      else if (['slots', 'slot', '插槽'].some(k => text.includes(k)))
        currentSection = 'slots'
      else if (token.tag === 'h2')
        currentSection = ''
    }

    if (token.type === 'table_open' && currentSection) {
      const { headers, rows, endIndex } = parseTable(tokens, i)
      i = endIndex

      const idx = {
        name: headers.findIndex(h => ['property', '属性', 'event', '事件名', 'slot', '插槽', '插槽名'].some(k => h.includes(k))),
        desc: headers.findIndex(h => ['description', '说明'].some(k => h.includes(k))),
        type: headers.findIndex(h => ['type', '类型'].some(k => h.includes(k))),
        default: headers.findIndex(h => ['default', '默认值'].some(k => h.includes(k))),
      }

      if (idx.name === -1)
        continue

      rows.forEach((row) => {
        const nameRaw = row[idx.name]
        const descRaw = row[idx.desc]
        const typeRaw = row[idx.type]
        const defaultRaw = row[idx.default]

        if (!nameRaw || nameRaw === '-' || nameRaw.includes(' '))
          return

        const item = {
          name: currentSection === 'props' ? toKebabCase(nameRaw) : nameRaw,
          description: descRaw,
          type: typeRaw !== '-' ? typeRaw : 'any',
          default: defaultRaw !== '-' ? defaultRaw : undefined,
        }

        if (currentSection === 'props')
          attributes.push(item)
        else if (currentSection === 'events')
          events.push(item)
        else if (currentSection === 'slots')
          slots.push(item)
      })
    }
  }

  return {
    name: tagName,
    _componentName: componentName,
    source: filePath,
    description: frontmatter.description || frontmatter.subtitle || '',
    attributes,
    events,
    slots,
  }
}

function parseTable(tokens: any, startIndex: number) {
  const headers: string[] = []
  const rows: string[][] = []
  let currentRow: string[] = []
  let inThead = false
  let endIndex = startIndex

  for (let i = startIndex; i < tokens.length; i++) {
    const t = tokens[i]
    if (t.type === 'thead_open')
      inThead = true
    if (t.type === 'thead_close')
      inThead = false
    if (t.type === 'tr_open')
      currentRow = []
    if (t.type === 'tr_close') {
      if (!inThead && currentRow.length > 0)
        rows.push(currentRow)
    }
    if (t.type === 'th_open' || t.type === 'td_open') {
      const contentToken = tokens[i + 1]
      const text = contentToken && contentToken.type === 'inline' ? cleanText(contentToken.content) : ''
      if (inThead)
        headers.push(text.toLowerCase())
      else currentRow.push(text)
    }
    if (t.type === 'table_close') {
      endIndex = i
      break
    }
  }
  return { headers, rows, endIndex }
}

// 合并逻辑辅助函数：根据 name 合并中英文数组
function mergeLangData(zhList: any[], enList: any[]) {
  const map = new Map()
  // 先放中文
  zhList.forEach(item => map.set(item.name, { ...item, zhDesc: item.description }))
  // 再合英文
  enList.forEach((item) => {
    if (map.has(item.name)) {
      const exist = map.get(item.name)
      exist.description = `(ZH) ${exist.zhDesc}\n\n(EN) ${item.description}`
      exist.type = item.type // 优先采用英文版的类型定义
    }
    else {
      map.set(item.name, item)
    }
  })
  return Array.from(map.values())
}

async function run() {
  const files = await glob(markdowns, { cwd: baseUrl, absolute: true })
  console.log(`🚀 Found ${files.length} files. Starting parse...`)

  // Map 结构: ComponentName -> { zh: data, en: data }
  const componentMap = new Map<string, { zh?: any, en?: any }>()

  const results = await Promise.all(
    files.map(file => parseMarkdown(file).catch((e) => {
      console.error(`❌ Error parsing ${file}:`, e)
      return null
    })),
  )

  results.forEach((res) => {
    if (!res)
      return
    const key = res._componentName
    if (!componentMap.has(key))
      componentMap.set(key, {})
    const entry = componentMap.get(key)!
    if (res.source.includes('en-US'))
      entry.en = res
    else entry.zh = res
  })

  // --- 转换数据 ---
  const finalTags = Array.from(componentMap.values()).map(({ zh, en }) => {
    const base = en || zh
    const mergedDesc = `(ZH) ${zh?.description || ''}\n\n(EN) ${en?.description || ''}`

    return {
      name: base.name,
      description: mergedDesc.trim(),
      // source: {
      //   file: path.relative(uiBaseUrl, base.source),
      //   offset: 0,
      // },
      attributes: mergeLangData(zh?.attributes || [], en?.attributes || []).map(attr => ({
        name: attr.name,
        description: attr.description,
        default: attr.default,
        value: { kind: 'expression', type: attr.type },
      })),
      js: {
        events: mergeLangData(zh?.events || [], en?.events || []).map(ev => ({
          name: ev.name,
          description: ev.description,
          arguments: ev.type && ev.type !== 'any' ? [{ name: 'payload', type: ev.type }] : [],
        })),
      },
      slots: mergeLangData(zh?.slots || [], en?.slots || []).map(s => ({
        name: s.name,
        description: s.description,
      })),
    }
  })

  // --- 1. 生成 Web-Types (JetBrains) ---
  const webTypes = {
    '$schema': 'https://raw.githubusercontent.com/JetBrains/web-types/master/schema/web-types.json',
    'name': CONFIG.libraryName,
    'version': CONFIG.libraryVersion,
    'js-types-syntax': 'typescript',
    'description-markup': 'markdown',
    'framework': 'vue',
    'contributions': { html: { elements: finalTags } },
  }
  await fs.writeFile(path.resolve(uiBaseUrl, CONFIG.outputWebTypes), JSON.stringify(webTypes, null, 2))

  // --- 2. 生成 VS Code HTML Custom Data ---
  const vscodeData = {
    version,
    tags: finalTags.map(t => ({
      name: t.name,
      description: t.description,
      attributes: t.attributes.map(a => ({
        name: a.name,
        description: `Default: ${a.default || '-'}\n\n${a.description}`,
      })),
    })),
  }
  await fs.writeFile(path.resolve(uiBaseUrl, CONFIG.outputVSCode), JSON.stringify(vscodeData, null, 2))

  console.log(`✅ Success! \n- Web-Types: ${CONFIG.outputWebTypes}\n- VSCode Data: ${CONFIG.outputVSCode}`)
}

run()
