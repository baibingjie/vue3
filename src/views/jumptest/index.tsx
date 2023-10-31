import router from '@/router'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {},
  emits: [],
  components: {},
  setup(props, ctx) {
    const goToDeatils = () => {
      router.push({
        name: 'jumptestdetails',
        // query: {
        //   id: '456'
        // },
        state: { obj3: { name: 3 } }
      })
    }

    return () => (
      <div>
        <h3>跳转测试</h3>
        <a-button type="primary" onClick={goToDeatils}>
          跳转详情
        </a-button>
      </div>
    )
  }
})
