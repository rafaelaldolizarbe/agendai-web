import api from '@/lib/axios'
import { Tenant } from '@/types'

export const tenantsService = {
  list: async (): Promise<Tenant[]> => {
    const { data } = await api.get('/api/v1/tenants')
    return data
  },

  getById: async (id: string): Promise<Tenant> => {
    const { data } = await api.get(`/api/v1/tenants/${id}`)
    return data
  },

  create: async (payload: {
    name: string
    slug: string
  }): Promise<Tenant> => {
    const { data } = await api.post('/api/v1/tenants', payload)
    return data
  },
}
