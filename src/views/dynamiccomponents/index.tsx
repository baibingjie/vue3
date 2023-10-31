import { defineComponent, markRaw, reactive, ref, KeepAlive } from 'vue'
import User from './component/user'
import Config from './component/config'
import Third from './component/scope'
import type { TabsPaneContext } from 'element-plus'

export default defineComponent({
  props: {},
  emits: [],
  components: { User, Config },
  setup(props, ctx) {
    const comData = reactive({
      activeName: 'first',
      tabs: [
        { label: '默认插槽', name: 'first', com: markRaw(User) },
        { label: '具名插槽', name: 'second', com: markRaw(Config) },
        { label: '作用域插槽', name: 'third', com: markRaw(Third) }
      ]
    })

    return () => (
      <div>
        动态组件Tabs
        <el-tabs
          style="margin-top:40px"
          v-model={comData.activeName}
          class="demo-tabs"
          type="border-card"
          onTabClick={(pane: TabsPaneContext) => {
            // 添加类型断言
            comData.activeName = pane.paneName as string

            // 或者类型判断
            // if (typeof pane.paneName === 'string') {
            //   comData.activeName = pane.paneName
            // }
          }}
        >
          {comData.tabs.map((item: any) => (
            <el-tab-pane label={item.label} name={item.name}>
              <item.com></item.com>
            </el-tab-pane>
          ))}
        </el-tabs>
      </div>
    )
  }
})
