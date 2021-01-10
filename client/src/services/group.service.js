import request from './generic.service'

const getGroup = (id) => request({url: `group/${id}`, method: 'get'})
const getGroups = () => request({url: `group`, method: 'get'})

export {
  getGroup,
  getGroups
}