import { request } from './generic.service'

const getGroup = (id) => request({url: `group/${id}`, method: 'get'})
const getGroups = (body) =>  { return (
  async function get(body) {
    let array = []
    await body.forEach(id => {
      request({url: `group/${id}`, method: 'get'}).then(res => {
        array.push(res.data)
      })
    })
    return array
  })(body)}

export {
  getGroup,
  getGroups
}