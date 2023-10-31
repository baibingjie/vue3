import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup(props, { slots }) {
    const state = reactive({
      list: ['1', '2']
    })
    return () => (
      <div style="background:yellow">
        <p>公共头部，做成插槽</p>
        {/* 这是默认插槽 */}
        {slots.default ? slots.default() : null}
        {slots.config ? slots.config() : null}
        {slots.scope ? slots.scope({ list: state.list }) : null}
      </div>
    )
  }
})
