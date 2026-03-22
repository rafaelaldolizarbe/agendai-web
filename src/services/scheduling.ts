import api from '@/lib/axios'
import { Appointment } from '@/types'

export const schedulingService = {
  list: async (): Promise<Appointment[]> => {
    const { data } = await api.get('/api/v1/scheduling')
    return data
  },

  getById: async (id: string): Promise<Appointment> => {
    const { data } = await api.get(`/api/v1/scheduling/${id}`)
    return data
  },

  create: async (payload: {
    branchId: string
    staffId: string
    clientId: string
    staffServiceId: string
    scheduledAt: string
    createdVia?: string
  }): Promise<Appointment> => {
    const { data } = await api.post('/api/v1/scheduling', payload)
    return data
  },

  reschedule: async (id: string, newDate: string): Promise<Appointment> => {
    const { data } = await api.patch(`/api/v1/scheduling/${id}/reschedule`, {
      newDate,
    })
    return data
  },

  cancel: async (id: string): Promise<Appointment> => {
    const { data } = await api.patch(`/api/v1/scheduling/${id}/cancel`)
    return data
  },
}
