import { defineComponent, watchEffect } from 'vue'
import { RouterView } from 'vue-router'
import { useTokenStore } from './stores/user'

export default defineComponent({
  setup() {
    const userStore = useTokenStore()

    watchEffect(() => {
      //watchEffect页面一刷新，方法立即被调用
      if (sessionStorage.getItem('token')) {
        userStore.setToken(sessionStorage.getItem('token') as string)
      }
    })
    return () => <RouterView />
  }
})
