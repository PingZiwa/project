<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <el-row>
        <el-col :span="4"><div class="grid-content bg-purple">logo图</div></el-col>
        <el-col :span="18"><div class="grid-content bg-purple-light"><h1>后台管理系统</h1></div></el-col>
        <el-col :span="2"><div class="grid-content bg-purple"><a
          href="javascript:;"
          @click.prevent="handleSignout()">退出</a></div></el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-menu
          :router="true"
          :unique-opened="true"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"/>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="users">用户列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"/>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">角色列表</el-menu-item>
              <el-menu-item index="1-2">权限列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3" >
            <template slot="title">
              <i class="el-icon-location"/>
              <span>商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">商品列表</el-menu-item>
              <el-menu-item index="1-2">分类参数</el-menu-item>
              <el-menu-item index="1-3">商品分类</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"/>
              <span>订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">订单列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"/>
              <span>数据统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">数据报表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体 -->
      <el-container>
        <router-view/>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created () {
    // 先获取在login设置的token值
    const token = localStorage.getItem('token')
    // 判断到了首页是否有token值 如果没有回到登录页
    if (!token) {
      this.$router.push('/login')
    }
  },
  methods: {
    // 退出按钮的功能
    handleSignout () {
      // 1 先清除token
      localStorage.clear()
      // 2 提示退出成功
      this.$message.success('退出成功')
      // 3 返回到login页面
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less">
h1,el-submenu{
  margin: 0;
  padding: 0;
}
.el-container {
  height: 100%;
}
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    height: 100%;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
    width: 100%;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
