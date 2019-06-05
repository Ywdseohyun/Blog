<template>
  <div class="register">
    <section class="form_register">
      <el-form :model="registerUser" :rules="rules" ref="registerForm" label-width="100px" class="registerForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="registerUser.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerUser.email" placeholder="请输入email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerUser.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input type="password" v-model="registerUser.password2" placeholder="请确认密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">立即注册</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Register',
  components: {},
  data () {
    var validatePass2 = (rule, value, callback) => {
        if (value !== this.registerUser.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      registerUser: {
        name: '',
        email: '',
        password: '',
        password2: ''
      },
      rules: {
        // 表单验证
        name: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'   // 验证触发
          },
          {
            min: 2,
            max: 15,
            message: '长度在2到15个字符之间',
            trigger: 'blur'
          }
        ],
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
        ],
        password2: [
          {
            required: true,
            message: '确认密码不能为空',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 20,
            message: '长度在6到20个字符之间',
            trigger: 'blur'
          },
          {
            validator: validatePass2, // 验证方法
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
            this.$axios.post('/api/users/register', this.registerUser)
            .then(res => {
              // 注册成功
              this.$message({
                message: "账号注册成功！",
                type: 'success'
              });
            })

            this.$router.push('/login');
          }
        });
    }
  }
}
</script>

<style lang="stylus" scoped>
.register {
  width: 100%;
  height: 100%;
  position: relative;
}
.form_register {
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
</style>