import type { FormInstance } from 'element-plus'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import axios from 'axios'
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'

export default defineComponent({
  props: {},
  emits: [],
  components: {},
  setup(props, ctx) {
    const visible = ref<boolean>(false)
    const formRef = ref<FormInstance>()
    const total = ref<number>(0) // 列表总数
    const readonlyRef = ref<boolean>(false) // 是否只读
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age'
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: '操作',
        dataIndex: 'operation',
        customRender: (record: any) => {
          return (
            <>
              <a
                style={{ margin: '0 10px' }}
                onClick={() => {
                  readonlyRef.value = true
                  formState.user = record.record
                  visible.value = true
                }}
              >
                详情
              </a>
              <a style={{ margin: '0 10px' }}>删除</a>
              <a style={{ margin: '0 10px' }}>编辑</a>
            </>
          )
        }
      }
    ]
    const formState = reactive({
      user: {
        name: '',
        age: undefined,
        address: ''
      },
      // 这里要做类型断言
      dataSource: [] as any[]
    })

    const validateMessages = {
      required: '${label}不能为空!'
    }
    const onFinish = (values: any) => {
      let parmas: any = { key: 1, ...values.user }
      formState.dataSource.push(parmas)
      visible.value = false
    }

    const resetForm = () => {
      if (!formRef.value) return
      formRef.value.resetFields()
    }

    // const pagination = computed(() => ({
    //   total: 10,
    //   current: 1,
    //   pageSize: 10
    // }))

    onMounted(() => {
      axios.get('/user/list').then((res) => {
        if (res.status == 200 && res.data.data.length > 0) {
          formState.dataSource = res.data.data
          total.value = res.data.data.length
        }
      })
    })

    return () => (
      <a-config-provider locale={zh_CN}>
        <div>
          <a-button
            class="editable-add-btn"
            style="margin-bottom: 8px"
            type="primary"
            onClick={() => {
              formRef?.value?.resetFields()
              readonlyRef.value = false
              visible.value = true
            }}
          >
            添加
          </a-button>
          <a-table
            dataSource={formState.dataSource}
            columns={columns}
            bordered
            pagination={false}
            scroll={{ y: 600 }}
          ></a-table>
          <a-pagination
            style={{ float: 'right', marginTop: '30px' }}
            current={1}
            total={total.value}
            showSizeChanger
            showTotal={() => '共' + total.value + '条数据'}
            pageSize={20}
          />
          <a-modal
            visible={visible.value}
            title="添加一个"
            footer={null}
            onCancel={() => {
              visible.value = false
            }}
          >
            <a-form
              model={formState}
              name="nest-messages"
              validate-messages={validateMessages}
              onFinish={onFinish}
              ref={formRef}
            >
              <a-form-item name={['user', 'name']} label="姓名">
                <a-input v-model:value={formState.user.name} disabled={readonlyRef.value} />
              </a-form-item>
              <a-form-item name={['user', 'age']} label="年龄">
                <a-input v-model:value={formState.user.age} disabled={readonlyRef.value} />
              </a-form-item>
              <a-form-item name={['user', 'address']} label="地址">
                <a-input v-model:value={formState.user.address} disabled={readonlyRef.value} />
              </a-form-item>
              <a-form-item>
                <a-button type="primary" html-type="submit">
                  提交
                </a-button>
                <a-button style="margin-left: 10px" onClick={resetForm}>
                  取消
                </a-button>
              </a-form-item>
            </a-form>
          </a-modal>
        </div>
      </a-config-provider>
    )
  }
})
