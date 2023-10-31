import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  props: {},
  emits: [],
  components: {},
  setup(props, ctx) {
    const ruleFormRef = ref<FormInstance>()
    const formRef = ref<FormInstance>()
    const ruleForm = reactive({
      name: '',
      region: '',
      count: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: ''
    })
    const formState = reactive({
      user: {
        name: '',
        age: undefined,
        email: '',
        website: '',
        introduction: ''
      }
    })
    const validateMessages = {
      required: '${label} is required!',
      types: {
        // email: '${label} is not a valid email!',
        number: '${label} is not a valid number!'
      },
      number: {
        range: '${label} must be between ${min} and ${max}'
      }
    }
    const rules = reactive<FormRules>({
      name: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
      ],
      region: [
        {
          required: true,
          message: 'Please select Activity zone',
          trigger: 'change'
        }
      ],
      count: [
        {
          required: true,
          message: 'Please select Activity count',
          trigger: 'change'
        }
      ],
      date1: [
        {
          type: 'date',
          required: true,
          message: 'Please pick a date',
          trigger: 'change'
        }
      ],
      date2: [
        {
          type: 'date',
          required: true,
          message: 'Please pick a time',
          trigger: 'change'
        }
      ],
      type: [
        {
          type: 'array',
          required: true,
          message: 'Please select at least one activity type',
          trigger: 'change'
        }
      ],
      resource: [
        {
          required: true,
          message: 'Please select activity resource',
          trigger: 'change'
        }
      ],
      desc: [{ required: true, message: 'Please input activity form', trigger: 'blur' }]
    })

    const submitForm = async () => {
      if (!ruleFormRef.value) return
      await ruleFormRef.value.validate((valid, fields) => {
        if (valid) {
          console.log(ruleForm)
          ElMessage('成功')
        } else {
          console.log('error submit!', fields)
        }
      })
    }

    const onFinish = (values: any) => {
      console.log('Success:', values)
    }

    const resetForm = () => {
      if (!formRef.value) return
      formRef.value.resetFields()
    }

    return () => (
      <div>
        <h3 style="margin-bottom: 20px">表单展示</h3>
        <h4>这是elementUI-plus</h4>
        <el-form
          ref={ruleFormRef}
          model={ruleForm}
          rules={rules}
          label-width="120px"
          class="demo-ruleForm"
          // :size="formSize"
          status-icon
          style="width:600px"
        >
          <el-form-item label="Activity name" prop="name">
            <el-input v-model={ruleForm.name} />
          </el-form-item>
          <el-form-item label="Activity zone" prop="region">
            <el-select v-model={ruleForm.region} placeholder="Activity zone">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="Activity count" prop="count">
            <el-select-v2
              v-model={ruleForm.count}
              placeholder="Activity count"
              options={[
                { value: '1', label: '1' },
                { value: '2', label: '2' },
                { value: '3', label: '3' },
                { value: '4', label: '4' }
              ]}
            />
          </el-form-item>
          <el-form-item label="Activity time" required>
            <el-col span={11}>
              <el-form-item prop="date1">
                <el-date-picker
                  v-model={ruleForm.date1}
                  type="date"
                  label="Pick a date"
                  placeholder="Pick a date"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col class="text-center" span={2}>
              <span class="text-gray-500">-</span>
            </el-col>
            <el-col span={11}>
              <el-form-item prop="date2">
                <el-time-picker
                  v-model={ruleForm.date2}
                  label="Pick a time"
                  placeholder="Pick a time"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="Instant delivery" prop="delivery">
            <el-switch v-model={ruleForm.delivery} />
          </el-form-item>
          <el-form-item label="Activity type" prop="type">
            <el-checkbox-group v-model={ruleForm.type}>
              <el-checkbox label="Online activities" name="type" />
              <el-checkbox label="Promotion activities" name="type" />
              <el-checkbox label="Offline activities" name="type" />
              <el-checkbox label="Simple brand exposure" name="type" />
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="Resources" prop="resource">
            <el-radio-group v-model={ruleForm.resource}>
              <el-radio label="Sponsorship" />
              <el-radio label="Venue" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Activity form" prop="desc">
            <el-input v-model={[ruleForm.desc, ['trim']]} type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" onClick={submitForm}>
              创建
            </el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
        <h4 style="margin-top: 20px">这是ant-design-vue</h4>
        <a-form
          model={formState}
          name="nest-messages"
          validate-messages={validateMessages}
          onFinish={onFinish}
          ref={formRef}
          style="width:600px"
        >
          <a-form-item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
            <a-input v-model:value={formState.user.name} />
          </a-form-item>
          <a-form-item name={['user', 'email']} label="Email">
            <a-input v-model:value={formState.user.email} />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit">
              Submit
            </a-button>
            <a-button style="margin-left: 10px" onClick={resetForm}>
              Reset
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    )
  }
})
