import { request } from './generic.service'

const getSpecialty = (id) => request({ url: `specialty/${id}`, method: 'get' })
const getSpecialties = () => request({ url: 'specialty', method: 'get' })

export {
  getSpecialty,
  getSpecialties
}