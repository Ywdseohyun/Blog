<template>
  <div class="login">
    <section class="form_login">
      <el-form :model="loginUser" :rules="rules" ref="loginForm" label-width="60px" class="loginForm">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="loginUser.email" placeholder="请输入email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>
        <div class="tiparea">
          <p>还没有账号？现在<router-link to="/register">注册</router-link></p>
        </div>
      </el-form>
    </section>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode';
export default {
  name: 'Login',
  components: {},
  data () {
    return {
      loginUser: {
        email: '',
        password: ''
      },
      rules: {
        // 表单验证
        email: [
          {
            type: "email",
            required: true,
            message: '邮箱格式不正确',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 20,
            message: '长度在6到20个字符之间',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      // 得到registerForm，并验证
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('/api/users/login', this.loginUser)
            .then(res => {
              // 拿到token
              const { token } = res.data;
              // 将token存储到localstorage
              localStorage.setItem('Token', token);

              // 解析token
              const decoded = jwt_decode(token);
              // token存储到vuex中
              this.$store.dispatch("setAuthenticated", !this.isEmpty(decoded));
              this.$store.dispatch("setUser", decoded);

              this.$router.push('/'); // 请求成功后跳转
            });
          }
        });
    },
    isEmpty (value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length ===0)
      );
    }
  }
}
</script>

<style lang="stylus" scoped>
.login {
  width: 100%;
  height: 100%;
  position: relative;
}
.form_login {
  width: 20%;
  margin-top: 50px;
  position: absolute;
  left: 36%;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}  
.submit_btn {
  width: 100%;
}        
.tiparea p {
  float: right;
}
.tiparea p a {
  color: #409eff;
}     
</style>