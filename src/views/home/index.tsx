import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import styles from './index.module.less'
import { RouterView, useRouter } from 'vue-router'
import router from '@/router'
import { useTokenStore } from '@/stores/user'
import axios from 'axios'
import type { FormInstance } from 'element-plus'

export default defineComponent({
  props: {},
  emits: [],
  components: {},
  setup(props, ctx) {
    const userStore = useTokenStore()
    const dialogVisible = ref(false)
    const ruleFormRef = ref<FormInstance>()
    const data = reactive({
      user: { name: '', age: '', tel: '' }
    })
    const token = userStore.getToken
    console.log(token)
    const handleOpen = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }

    const defaultMenu = computed({
      get() {
        // getter
        let path: any = router.currentRoute.value.fullPath
        if (router.currentRoute.value.meta.active) {
          path = router.currentRoute.value.meta.active
        }
        return path
      },
      set(val) {
        // setter
      }
    })

    const userName = ref<string>('')

    const SubTitle = () => <span>菜单一</span>

    const DropDown = () => (
      <el-dropdown-menu>
        <el-dropdown-item
          onClick={() => {
            dialogVisible.value = true
          }}
        >
          个人信息
        </el-dropdown-item>
      </el-dropdown-menu>
    )

    onMounted(() => {
      axios.get('/user/info').then((res) => {
        userStore.setUserInfo(res.data.items)
        userName.value = res.data.items.name
        data.user = res.data.items
      })
    })

    return () => (
      <div class={styles.content}>
        <el-header class={styles.header}>
          <div class={styles.headerbox}>
            <h3>白白的vue3项目</h3>
            <div class={styles.rightname}>
              <el-dropdown
                v-slots={{
                  dropdown: DropDown
                }}
              >
                <el-icon style="margin-right: 8px;" ariaexpanded={false}>
                  <house />
                </el-icon>
              </el-dropdown>
              <span>{userName.value}</span>
            </div>
          </div>
        </el-header>
        <div class={styles.maincontent}>
          <el-aside height="100%">
            <el-menu
              default-openeds={['/home']}
              router={true}
              active-text-color="#ffd04b"
              background-color="#545c64"
              class="el-menu-vertical-demo"
              default-active={defaultMenu}
              text-color="#fff"
              style={{ height: '100%' }}
              open={handleOpen}
            >
              <el-sub-menu
                index="/home"
                v-slots={{
                  title: SubTitle
                }}
              >
                <el-menu-item-group title="基础展示">
                  <el-menu-item index="/home/basiclist">列表</el-menu-item>
                  <el-menu-item index="/home/basicform">表单</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="跳转测试">
                  <el-menu-item index="/home/jumptest">跳转列表</el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>
              <el-menu-item index="/home/dynamiccomponents">
                <span>动态组件</span>
              </el-menu-item>
              <el-menu-item index="/home/editmodal">列表编辑</el-menu-item>
            </el-menu>
          </el-aside>
          <el-main class={styles.main}>
            <RouterView />
          </el-main>

          <el-dialog v-model={dialogVisible.value} title="个人信息" width="30%">
            <p>
              姓名：<span>{data.user.name}</span>
            </p>
            <p>
              年龄：<span>{data.user.age}</span>
            </p>
            <p>
              电话：<span>{data.user.tel}</span>
            </p>
          </el-dialog>
        </div>
      </div>
    )
  }
})
