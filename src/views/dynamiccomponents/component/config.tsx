import { defineComponent } from 'vue'
import CommonHeader from '@/components/CommonHeader'

export default defineComponent({
  props: {},
  emits: [],
  components: { CommonHeader },
  setup(props, ctx) {
    return () => (
      <div>
        具名插槽
        <CommonHeader
          v-slots={{
            config: () => {
              return <p style="color:blue">插槽：具名插槽；config组件插槽</p>
            }
          }}
        ></CommonHeader>
      </div>
    )
  }
})
