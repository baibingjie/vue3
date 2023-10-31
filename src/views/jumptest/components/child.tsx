import { defineComponent, inject, toRef } from 'vue'

export default defineComponent({
  props: {
    name: String,
    onMycountname: {
      type: Function
    },
    onMycount: {
      type: Function
    }
  },
  inject: ['message'],
  data() {
    return {
      // 基于注入值的初始数据
      fullMessage: this.message
    }
  },
  setup(props, { emit }) {
    const injectMessage = inject('message')
    const postmsg = () => {
      // emit 子组件向父组件传值
      console.log(11111)
      emit('mycountname', '你好啊，螃蟹')
    }
    const name = toRef(props, 'name')
    const onclick = () => {
      // emit 子组件向父组件传值
      emit('mycount', '你为啥不来看我')
    }

    return () => (
      <div style={{ marginTop: '100px' }} v-once>
        <h3>这里是子组件</h3>
        {injectMessage} ,{props.name}
        <br />
        <a-button type="primary" onClick={postmsg}>
          传递信息
        </a-button>
        <br />
        <a-button type="primary" onClick={onclick} style={{ marginTop: '30px' }}>
          点击发个信息试试
        </a-button>
      </div>
    )
  }
})
