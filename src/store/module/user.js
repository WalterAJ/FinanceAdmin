import { login, logout, getUserInfo } from '@/api/user'
import { setToken, getToken } from '@/libs/util'

export default {
  state: {
    userName: '',
    userId: '',
    avatorImgPath: '',
    token: getToken(),
    access: '',
    hasGetInfo: false
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, {userName, password}) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        login({
          userName,
          password
        }).then(res => {
          if(res.data.length != 0){
            const data = res.data[0];
            commit('setToken',data.userName);
            resolve({code:0,message:'登录成功'})
          } else{
            resolve({code:1,message:'用户密码错误'})
          }         
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
        //   commit('setToken', '')
        //   commit('setAccess', [])
        //   resolve()
        // }).catch(err => {
        //   reject(err)
        // })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        commit('setToken', '')
        commit('setAccess', [])
        resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfo(state.token).then(res => {
            if(res.data.length != 0){
              const data = res.data[0];
              commit('setUserName', data.userName)
              commit('setUserId', '1')
              if(data.access == 'admin'){//判断用户权限
                commit('setAccess', ['admin'],)//普通操作员
              } else{
                commit('setAccess', ['super_admin', 'admin'],)//超级管理员
              }
              commit('setHasGetInfo', true)
              resolve(data)
            } else{
              console.log('fail!')
            }
            
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}