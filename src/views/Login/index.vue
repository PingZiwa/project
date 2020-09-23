<template>
  <div class="login-wrap">
    <el-form
      :model="formLabelAlign"
      class="login-from"
      label-position="top"
      label-width="80px">
      <h2>用户登录</h2>
      <el-form-item label="账号">
        <el-input v-model="formLabelAlign.username"/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formLabelAlign.password"/>
      </el-form-item>
      <el-button
        class="login-btn"
        type="primary"
        @click.prevent="handleLogin()">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formLabelAlign: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    handleLogin () {
      this.$http.post('login', this.formLabelAlign).then(res => {
        console.log(res)
        // 登陆成功  1.跳转home  2.提示登陆成功
        // 登陆失败 提示失败的原因
        const {
          // 获取data的值 进行判断
          data, meta: {
            msg, status
          }} = res.data
        if (status === 200) {
          // 成功跳转
          localStorage.setItem('token', data.token)// 保存登陆成功的token值
          this.$message.success(msg) // 登录成功的提示信息
          this.$router.push({
            name: 'home'
          })
        } else {
          // 失败提示
          this.$message.error(msg) // 登陆失败的提示信息
        }
      })
    }
  }
}
</script>

<style lang="less">
// 登录页的样式
h2{
  margin: 0;
}
.login-wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-from {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}
.login-btn {
  width: 100%;
}
</style>
