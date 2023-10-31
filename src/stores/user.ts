import { defineStore } from 'pinia'

interface UserState {
  token: string | null
  userInfo: {
    name: string | null
    age: number | string | null
    tel: number | string | null
  }
}

export const useTokenStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // token
    token: null,
    userInfo: {
      name: null,
      age: null,
      tel: null
    }
  }),
  getters: {
    getToken(): string {
      return this.token || ''
    },
    getUsernfo(): Object {
      return this.userInfo || {}
    }
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info ? info : ''
    },
    setUserInfo(info: any | undefined) {
      this.userInfo = info ? info : {}
    }
  }
})
