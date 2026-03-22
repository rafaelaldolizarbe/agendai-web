import api from '@/lib/axios'
import { StaffMember } from '@/types'

export const staffService = {
  list: async (): Promise<StaffMember[]> => {
    const { data } = await api.get('/api/v1/staff')
    return data
  },

  getById: async (id: string): Promise<StaffMember> => {
    const { data } = await api.get(`/api/v1/staff/${id}`)
    return data
  },

  create: async (payload: {
    branchId: string
    keycloakUserId: string
    name: string
    phone: string
    specialty: string
    commissionPct: number
  }): Promise<StaffMember> => {
    const { data } = await api.post('/api/v1/staff', payload)
    return data
  },

  updateCommission: async (id: string, commissionPct: number): Promise<StaffMember> => {
    const { data } = await api.patch(`/api/v1/staff/${id}/commission`, { commissionPct })
    return data
  },

  deactivate: async (id: string): Promise<StaffMember> => {
    const { data } = await api.patch(`/api/v1/staff/${id}/deactivate`)
    return data
  },
}
