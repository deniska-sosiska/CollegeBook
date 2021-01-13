import { request } from './generic.service'

const getUser = (id) => request({ url: `user/${id}`, method: 'get' })
const getUsers = () => request({ url: `user`, method: 'get' })
const setNewUser = (data) => request({ url: `user`, method: 'post', body: data })

export {
  getUser,
  getUsers,
  setNewUser
}