<template>
  <div class="bg">
    <div id="register">
        <h2>注册页面</h2>
        <el-form ref="form" :model="form" label-width="20%">
        <el-form-item label="用户名:">
            <el-input v-model="form.name" placeholder="账号只能为数字" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
        </el-form-item>
        <el-form-item label="密  码:">
            <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        </el-form>
        <el-button type="primary" round @click="register" class="btn">注册</el-button>
        <span @click="login" class="reg">返回登录</span>
        <span @click="back" class="back">返回主页</span>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data () {
    return {
      form: {
        name: '',
        password: ''  
      },
      isnull: false
    };
  },
 
  methods: {
    register() {
      if(this.form.name == '') {
        this.$message.error('用户名不能为空');
      }else if(this.form.password == '') {
        this.$message.error('密码不能为空');
      }else{
        axios.post('http://127.0.0.1/register', this.form).then(res => {
          if(res.data.status == 200) {
            this.$alert('即将返回登录页面', '注册成功', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.push('/login')
              }
            })
          }else if(res.data.status == 202) {
            this.$alert('用户名已存在', '注册失败', {
              confirmButtonText: '确定',
              callback: action => {
                this.form.name = '',
                this.form.password = ''
              }
            })
          }else{
            console.log(res.message);
          }
        }).catch(err => {
          console.log('操作失败' + err);
        })
      }
    },
    login() {
      this.$router.push('/login')
    },
    back() {
      this.$router.push('/')
    }
  }
}
</script>
<style scoped>
.bg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: url('../assets/img/register_bg.jpg');
    background-size: 100% 100%;
}
 #register {
    height: 250px;
    width: 350px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.25);
    background: #ffffff;
    opacity: 0.85;
    position: absolute;
    top: 0;left: 0;right: 0;bottom: 0;
    margin: auto;
    text-align: center;
    display: flex;
    flex-direction: column;/*横向*/
    padding: 30px;
  }
  #register h2 {
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
    cursor:pointer;
  }
  .back {
    color: red;
    position: absolute;
    bottom: 10px;
    left: 10px;
  }
</style>
