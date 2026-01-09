<docs lang="zh-CN">
子元素垂直对齐。
</docs>

<docs lang="en-US">
Child elements vertically aligned.
</docs>

<template>
  <a-divider orientation="left">
    Align Top
  </a-divider>
  <a-row justify="center" align="top" class="row-demo">
    <a-col :span="4">
      <div class="demo-box height-100">
        col-4
      </div>
    </a-col>
    <a-col :span="4">
      <div class="demo-box height-50">
        col-4
      </div>
    </a-col>
    <a-col :span="4">
      <div class="demo-box height-120">
        col-4
      </div>
    </a-col>
    <a-col :span="4">
      <div class="demo-box height-80">
        col-4
      </div>
    </a-col>
  </a-row>

  <a-divider orientation="left">
    Align Middle
  </a-divider>
  <a-row justify="space-around" align="middle" class="row-demo">
    <a-col :span="4">
      <div class="demo-box height-100">
        col-4
      </div>
    </a-col>
    <a-col :span="4">
      <div class="demo-box height-50">
        col-4
      </div>
    </a-col>
    <a-col :span="4">
      <div class="demo-box height-120">
        col-4
      </div>
    </a-col>
    <a-col :span="4">
      <div class="demo-box height-80">
        col-4
      </div>
    </a-col>
  </a-row>

  <a-divider orientation="left">
    Align Bottom
  </a-divider>
  <a-row justify="space-between" align="bottom" class="row-demo">
    <a-col :span="4">
      <div class="demo-box height-100">
        col-4
      </div>
    </a-col>
    <a-col :span="4">
      <div class="demo-box height-50">
        col-4
      </div>
    </a-col>
    <a-col :span="4">
      <div class="demo-box height-120">
        col-4
      </div>
    </a-col>
    <a-col :span="4">
      <div class="demo-box height-80">
        col-4
      </div>
    </a-col>
  </a-row>
</template>

<style scoped>
.row-demo {
  padding: 8px 0;
  background: rgba(128, 128, 128, 0.08);
}
.demo-box {
  color: #fff;
  text-align: center;
  background: #0092ff;
}
.height-50 {
  height: 50px;
  line-height: 50px;
}
.height-80 {
  height: 80px;
  line-height: 80px;
}
.height-100 {
  height: 100px;
  line-height: 100px;
}
.height-120 {
  height: 120px;
  line-height: 120px;
}
</style>
