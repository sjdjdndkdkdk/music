<template>
  <div class="bg">
    <div id="login">
      <h2>登录页面</h2>
      <el-form ref="form" :model="form" label-width="20%">
        <el-form-item label="用户名:">
          <el-input v-model="form.name" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密  码:">
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" round @click="login" class="btn"
        >登录</el-button
      >
      <span @click="register" class="reg">前往注册</span>
      <span @click="back" class="back">返回主页</span>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import store from '@/store/index.js'
export default {
  data() {
    return {
      form: {
        name: "",
        password: "",
      },
    };
  },

  methods: {
    login() {
      if (this.form.name == "") {
        this.$message.error("用户名不能为空");
      } else if (this.form.password == "") {
        this.$message.error("密码不能为空");
      } else {
        axios
          .get("http://127.0.0.1/login", {
            params: {
              name: this.form.name,
              password: this.form.password,
            },
          })
          .then((res) => {
            if (res.data.status == 200) {
              // 修改登录信息为true
              this.$store.commit("updateIsLogin",true)
              this.$alert("用户"+this.form.name+"即将返回首页", "登录成功", {
                confirmButtonText: "确定",
                callback: (action) => {
                  this.$router.push({
                    path: "/",
                    query: {
                      name: this.form.name,
                    },
                  });
                },
              });
            } else {
              this.$alert("用户名或密码错误", "登录失败", {
                confirmButtonText: "确定",
                callback: (action) => {
                  (this.form.name = ""), (this.form.password = "");
                },
              });
            }
          })
          .catch((err) => {
            console.log("登录失败" + err);
          });
      }
    },
    register() {
      this.$router.push("/register");
    },
    back() {
      this.$router.push("/");
    },
  },
};
</script>
<style scoped>
.bg {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: url("../assets/img/login_bg.jpg");
  background-size: 100% 100%;
}
#login {
  height: 250px;
  width: 350px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.25);
  background: #ffffff;
  opacity: 0.85;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  text-align: center;
  display: flex;
  flex-direction: column; /*横向*/
  padding: 30px;
}
#login h2 {
  padding-bottom: 30px;
}
.btn {
  width: 60%;
  margin: auto;
}
.reg {
  color: red;
  position: absolute;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
}
.back {
  color: red;
  position: absolute;
  bottom: 10px;
  left: 10px;
}
</style>
