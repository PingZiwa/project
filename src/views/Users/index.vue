<template>
  <div class="wrap">
    <el-card class="box-card">
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索功能 -->
      <el-row>
        <el-col>
          <el-input
            v-model="query"
            class="inputSearch"
            clearable
            placeholder="请输入内容"
            @clear="clearables">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="seachUser()"
            />
          </el-input>
          <el-button
            type="success"
            @click="showUseradd()">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table
        :data="userlist"
        border
        style="width: 100%">
        <!-- // 添加type 值为index时  将会按照数字顺序排列 -->
        <el-table-column
          type="index"
          label="#"/>
        <el-table-column
          prop="username"
          label="姓名"/>
        <el-table-column
          prop="role_name"
          label="身份"/>
        <el-table-column
          prop="email"
          label="邮箱"/>
        <el-table-column
          prop="mobile"
          label="电话"/>
        <el-table-column
          prop="create_time"
          label="创建日期">
          <!-- 需要将时间戳修改为日期 需要给显示的内容外层包裹一个template -->
          <!-- template要用数据 需要设置slot-scope属性  值是数据源userlist -->
          <!-- 定义了scope要使用他 -->
          <template slot-scope="scope">
            {{ scope.row.create_time | fmtdate }}
          </template>
        </el-table-column>
        <el-table-column
          prop="mg_state"
          label="用户状态"
          width="100px">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeState(scope.row)"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
          <template slot-scope="scope">
            <!-- 编辑按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="showEditUsers(scope.row)"/>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="showDelectUsersbox(scope.row.id)"/>
            <!-- 分配角色按钮 -->
            <el-button
              type="success"
              icon="el-icon-check"
              circle
              @click="showAssignUsers(scope.row)"/>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- size-change每页显示条数变化时触发
            current-change当前页改变时触发
            current-page 当前页
            page-sizes每页多少条
            page-size设置显示多少条
            total总数
       -->
      <el-pagination
        :current-page="pagenum"
        :page-sizes="[2, 4]"
        :page-size="2"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </el-card>

    <!-- 添加用户 -->
    <el-dialog
      :visible.sync="dialogFormVisibleadd"
      title="添加用户"
      label-width="50%">
      <el-form :model="form">
        <el-form-item
          label="用户名">
          <el-input
            v-model="form.username"
            autocomplete="off"/>
        </el-form-item>
        <el-form-item

          label="密码">
          <el-input
            v-model="form.password"
            autocomplete="off"/>
        </el-form-item>
        <el-form-item

          label="邮箱">
          <el-input
            v-model="form.email"
            autocomplete="off"/>
        </el-form-item>
        <el-form-item

          label="电话">
          <el-input
            v-model="form.mobile"
            autocomplete="off"/>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addUsers()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户 -->
    <el-dialog
      :visible.sync="dialogFormVisibleedit"
      title="编辑用户"
      label-width="50%">
      <el-form :model="form">
        <el-form-item

          label="用户名">
          <el-input
            v-model="form.username"
            disabled
            autocomplete="off"/>
        </el-form-item>
        <el-form-item

          label="邮箱">
          <el-input
            v-model="form.email"
            autocomplete="off"/>
        </el-form-item>
        <el-form-item

          label="电话">
          <el-input
            v-model="form.mobile"
            autocomplete="off"/>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer">
        <el-button @click="dialogFormVisibleedit = false">取 消</el-button>
        <el-button
          type="primary"
          @click="editUsers(id)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配用户 -->
    <el-dialog
      :visible.sync="dialogFormVisibleAss"
      title="分配角色">
      <el-form :model="form">
        <el-form-item
          label="用户名">
          {{ cussName }}
        </el-form-item>
        <el-form-item
          label="角色">
          <el-select
            v-model="cussId">
            <el-option
              :value= "-1"
              label="请选择"/>
            <el-option
              v-for="(item,i) in roles"
              :key = "item.id"
              :value= "i"
              :label="item.roleName"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer">
        <el-button @click="dialogFormVisibleAss = false">取 消</el-button>
        <el-button
          type="primary"
          @click="assUsers()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      id: '',
      // 表格数据
      userlist: [],
      // 分页相关数据
      total: -1,
      pagenum: 1,
      pagesize: 4,
      // 添加用户对话框属性
      dialogFormVisibleadd: false,
      // 编辑用户对话框属性
      dialogFormVisibleedit: false,
      // 分配用户对话框属性
      dialogFormVisibleAss: false,
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 分配角色
      cussId: 0,
      cussName: '',
      cussUserid: '',
      // 所有角色列表
      roles: []
    }
  },
  created () {
    this.getUserslist()
  },
  methods: {
    // 分配角色按钮
    async showAssignUsers (user) {
      // 获取所有用户角色列表
      const res1 = await this.$http.get(`roles`)
      this.cussUserid = user.id
      this.roles = res1.data.data
      this.cussName = user.username
      // 获取当前用户的id
      const res = await this.$http.get(`users/${user.id}`)
      // console.log(res)
      // console.log(res1)
      this.cussId = res.data.data.rid
      this.dialogFormVisibleAss = true
    },
    // 分配用户发送请求
    async assUsers () {
      const res = await this.$http.put(`users/${this.cussUserid}/role`, {
        rid: this.cussId
      })
      console.log(res)
      this.dialogFormVisibleAss = false
      const {meta: {msg, status}, data} = res.data
      if (status === 200) {
        this.$message.success(msg)
      }
      this.getUserslist()
    },
    // 用户状态按钮
    async changeState (users) {
      // console.log(users)
      const res = await this.$http.put(`users/${users.id}/state/${users.mg_type}`)
      // console.log(res)
      const {meta: {msg, status}, data} = res.data
      if (status === 200) {
        this.$message.success(msg)
      }
    },
    // 编辑按钮
    showEditUsers (usersName) {
      this.form = usersName
      this.dialogFormVisibleedit = true
    },
    // 编辑用户发送请求
    async editUsers (id) {
      const res = await this.$http.put(`users/${this.form.id}`, this.form)
      // console.log(res)
      // 关闭对话框
      this.dialogFormVisibleedit = false
    },
    // 删除按钮
    showDelectUsersbox (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 发送删除的请求
        const res = await this.$http.delete(`users/` + id)
        const {meta: {msg, status}, data} = res.data
        // console.log(res)
        if (status === 200) {
          this.pagenum = 1
          this.getUserslist()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 添加用户发送请求
    async addUsers () {
      const res = await this.$http.post(`users`, this.form)
      // console.log(res)
      // 关闭对话框\
      this.dialogFormVisibleadd = false
      const {meta: {msg, status}, data} = res.data
      if (status === 201) {
        // 提示成功
        this.$message.success(msg)
        // 更新视图
        this.getUserslist()
        // 清空文本框
        this.form = {}
      } else {
        this.$$message.warning(msg)
      }
    },
    // 添加用户框显示或隐藏
    showUseradd () {
      this.dialogFormVisibleadd = true
    },
    // 清空小按钮
    clearables () {
      this.getUserslist()
    },
    // 搜索按钮
    seachUser () {
      this.pagenum = 1
      this.getUserslist()
    },
    // 分页相关的方法
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagenum = val
      // 刷新页面
      this.getUserslist()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      // 刷新页面
      this.getUserslist()
    },
    // 运用async await让一步看起来像同步
    // 用户列表请求
    async getUserslist () {
      // 但是这里需要判断token值 观看接口文档
      // 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
      // 所以先要设置请求权限 然后将token值赋给AUTH_TOKEN
      const AUTH_TOKEN = localStorage.getItem(`token`)
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN

      const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      console.log(res)
      const {meta: {msg, status}, data: {users, total}} = res.data
      if (status === 200) {
        // 给表格数据赋值
        this.userlist = users
        // 给total赋值
        this.total = total
        // 提示
        this.$message.success(msg)
      } else {
        this.$message.warning(msg)
      }
    }
  }
}
</script>

<style lang="less">
body{
  margin: 0;
  padding: 0;
}
.el-table {
  margin-top: 20px;
}
div{
  width: 100%;
}
.box-card{
  height: 100%;
  width: 100%;
}
.inputSearch{
  margin-top: 20px;
  width: 300px;
}
.wrap{
  // margin: 20px;
  box-sizing: border-box;
}
</style>
