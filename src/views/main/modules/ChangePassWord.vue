<template>
  <el-dialog
    :title="dialog.title"
    :visible="dialog.visible"
    :width="dialog.width"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    :destroy-on-close="true"
    append-to-body
    v-if="dialog.visible"
  >
    <el-form :model="dialog" :rules="passWordFromRules" ref="passWordFrom">
      <el-form-item
        prop="oldPassWord"
        label="原密码："
        :label-width="dialog.labelWidth"
      >
        <el-input v-model="dialog.oldPassWord" type="password"></el-input>
      </el-form-item>
      <el-form-item
        prop="newPassWord"
        label="新密码："
        :label-width="dialog.labelWidth"
      >
        <el-input v-model="dialog.newPassWord" type="password"></el-input>
      </el-form-item>
      <el-form-item
        prop="confirmPassWord"
        label="确认密码："
        :label-width="dialog.labelWidth"
      >
        <el-input v-model="dialog.confirmPassWord" type="password"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="cloneDialog()">取 消</el-button>
      <el-button type="primary" @click="changePassWord()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { changePassWord } from "@/services/user"
export default {
  name: "ChangePassWord",
  data() {
    return {
      dialog: {
        title: "修改密码",
        width: "500px",
        visible: false,
        labelWidth: "100px",
        oldPassWord: "",
        newPassWord: "",
        confirmPassWord: "",
      },
      passWordFromRules: {
        oldPassWord: [
          { required: true, trigger: "blur", message: "原密码必填" },
        ],
        newPassWord: [
          { required: true, trigger: "blur", message: "新密码必填" },
        ],
        confirmPassWord: [
          { required: true, trigger: "blur", message: "确认密码必填" },
        ],
      },
    }
  },
  methods: {
    changePassWord() {
      const { oldPassWord, newPassWord, confirmPassWord } = this.dialog
      this.$refs["passWordFrom"].validate(async (valid) => {
        if (valid) {
          if (newPassWord !== confirmPassWord) {
            this.$message.error("两次密码输入不一致！")
          } else {
            const res = await changePassWord({ oldPassWord, newPassWord })
            if (res.code > 0) {
              this.$message.success(res.msg)
              this.cloneDialog()
            } else {
              this.$message.error(res.msg)
            }
          }
        } else {
          return false
        }
      })
    },
    cloneDialog() {
      this.dialog.visible = false
      this.$refs["passWordFrom"].resetFields()
    },
  },
}
</script>
