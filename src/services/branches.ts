import api from '@/lib/axios'
import { Branch } from '@/types'

export const branchesService = {
  list: async (): Promise<Branch[]> => {
    const { data } = await api.get('/api/v1/branches')
    return data
  },

  getById: async (id: string): Promise<Branch> => {
    const { data } = await api.get(`/api/v1/branches/${id}`)
    return data
  },

  create: async (payload: {
    tenantId: string
    name: string
    address: string
    phone: string
  }): Promise<Branch> => {
    const { data } = await api.post('/api/v1/branches', payload)
    return data
  },

  deactivate: async (id: string): Promise<Branch> => {
    const { data } = await api.patch(`/api/v1/branches/${id}/deactivate`)
    return data
  },
}
