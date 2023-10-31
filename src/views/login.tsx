import router from '@/router'
import type { FormInstance } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { useTokenStore } from '../stores/user'

export default defineComponent({
  props: {},
  emits: [],
  components: {},
  setup(props, ctx) {
    const userStore = useTokenStore()
    const ruleFormRef = ref<FormInstance>()
    const data = reactive({
      user: { name: '', password: '' }
    })

    const submitForm = async () => {
      if (!ruleFormRef.value) return
      await ruleFormRef.value.validate((valid, fields) => {
        if (valid) {
          router.push({
            name: 'basiclist'
          })
          userStore.setToken('123123123123')
          sessionStorage.setItem('token', '123123123123')
        } else {
          console.log('error submit!', fields)
        }
      })
    }

    const resetForm = () => {
      if (!ruleFormRef.value) return
      ruleFormRef.value.resetFields()
    }

    return () => (
      <div
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          backgroundImage: 'url("/img/login.png")',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%'
        }}
      >
        <el-form
          ref={ruleFormRef}
          model={data.user}
          style={{
            width: '600px',
            margin: '300px auto'
          }}
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="用户名"
            prop="name"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <el-input v-model={data.user.name} autocomplete="off" />
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <el-input type="password" autocomplete="off" v-model={data.user.password} />
          </el-form-item>

          <el-form-item style={{ textAlign: 'center' }}>
            <el-button type="primary" onClick={submitForm}>
              确定
            </el-button>
            <el-button onClick={resetForm}>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    )
  }
})
