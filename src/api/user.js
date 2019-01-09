import axios from '@/libs/api.request'

export const login = ({ userName, password }) => {
  const data = {
    userName,
    password
  }
  return axios.request({
    url: '/api/users/login',
    params: {
      userName: data.userName,
      password: data.password
    },
    method: 'get'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: '/api/users/getUserInfo',
    params: {
      token
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}
