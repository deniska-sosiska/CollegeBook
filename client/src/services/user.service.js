import { request } from './generic.service'

const getUser = (id) => request({ url: `user/${id}`, method: 'get' })
const getUsers = () => request({ url: `user`, method: 'get' })
// {
//   return (
//     async function get(currentUser) {
//       let allUser = await request({ url: `user`, method: 'get' })
      
//     }
//   )(currentUser)
// }

export {
  getUser,
  getUsers
}