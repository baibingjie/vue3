import CommonHeader from '@/components/CommonHeader'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {},
  emits: [],
  components: { CommonHeader },
  setup(props, ctx) {
    return () => (
      <div>
        作用域插槽
        <CommonHeader
          v-slots={{
            scope: (scope: any) => {
              return (
                <p style="color:blue">
                  插槽：作用域插
                  {scope.list.map((item: any) => {
                    return <p>{item}</p>
                  })}
                </p>
              )
            }
          }}
        ></CommonHeader>
      </div>
    )
  }
})
