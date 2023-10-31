import { defineComponent, reactive } from 'vue'
import { useRoute } from 'vue-router'
import Child from './components/child'

export default defineComponent({
  provide() {
    return {
      message: 'hello'
    }
  },
  props: {},
  emits: [],
  components: { Child },
  setup(props, ctx) {
    //首先在setup中定义
    const route = useRoute()
    //query
    let id = route.query.id
    console.log(id)
    console.log(history.state.obj3)
    const childThing = reactive({ text: '', msg: '' })
    const getMsg = (val: any) => {
      console.log(11111)
      childThing.text = val
    }

    const onCountClick = (val: any) => {
      childThing.msg = val
    }

    return () => (
      <div>
        <h3>这里是详情</h3>
        <a-button
          type="primary"
          onClick={() => {
            history.back()
          }}
        >
          返回
        </a-button>
        <br />
        这里是子组件传递的值: <strong>{childThing.text}</strong> <br />
        <strong>{childThing.msg}</strong>
        <Child name="编号89757" onMycountname={getMsg} onMycount={onCountClick} />
      </div>
    )
  }
})
