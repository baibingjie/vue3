import { defineComponent, reactive, ref, shallowRef, triggerRef, watchEffect } from 'vue'
import CommonHeader from '@/components/CommonHeader'

export default defineComponent({
  components: { CommonHeader },
  setup(props, ctx) {
    const message = reactive({
      text: 'hello'
    })

    // // 监听某一个值得变化
    // const count = ref(0)
    // const stop = watchEffect(() => console.log(count.value))
    // // -> 输出 0
    // count.value++

    // setTimeout(() => {
    //   count.value += count.value + 4
    // }, 2000)
    // // 加入stop就执行一次就停止了对数据的观察
    // stop()

    // --------------分割线
    const state = shallowRef({ count: 1 })

    // 不会触发更改
    state.value.count = 2

    triggerRef(state)
    console.log(state.value)

    return () => (
      <div style="height:300px">
        <CommonHeader
          v-slots={{
            default: () => {
              return <p style="color:red">插槽：默认插槽,可以读取父组件的数据{message.text}</p>
            }
          }}
        ></CommonHeader>
        <h4>这是user页面组件：{message.text}</h4>
      </div>
    )
  }
})
