'use client'

import { useAuth } from '@/hooks/useAuth'
import { schedulingService } from '@/services/scheduling'
import { Appointment } from '@/types'
import { Calendar, Users, DollarSign } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const { user, isOwner, isHairdresser } = useAuth()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isOwner || isHairdresser) {
      schedulingService
        .list()
        .then(setAppointments)
        .finally(() => setLoading(false))
    }
  }, [isOwner, isHairdresser])

  const today = appointments.filter((a) => {
    const date = new Date(a.scheduledAt)
    const now = new Date()
    return (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    )
  })

  const confirmed = appointments.filter((a) => a.status === 'Confirmed')

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-1">
        Olá, {user.name?.split(' ')[0]} 👋
      </h1>
      <p className="text-gray-500 mb-8">
        {isOwner && 'Bem-vindo ao painel de gestão.'}
        {isHairdresser && 'Bem-vindo à sua agenda.'}
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
              <Calendar size={18} className="text-purple-600" />
            </div>
            <p className="text-sm text-gray-500">Agendamentos hoje</p>
          </div>
          <p className="text-3xl font-semibold text-gray-900">
            {loading ? '...' : today.length}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
              <Users size={18} className="text-blue-600" />
            </div>
            <p className="text-sm text-gray-500">Confirmados</p>
          </div>
          <p className="text-3xl font-semibold text-gray-900">
            {loading ? '...' : confirmed.length}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
              <DollarSign size={18} className="text-green-600" />
            </div>
            <p className="text-sm text-gray-500">Comissões do mês</p>
          </div>
          <p className="text-3xl font-semibold text-gray-900">R$ 0</p>
        </div>
      </div>

      {/* Lista de agendamentos de hoje */}
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-base font-medium text-gray-900">Agenda de hoje</h2>
        </div>
        <div className="p-6">
          {loading ? (
            <p className="text-sm text-gray-400">Carregando...</p>
          ) : today.length === 0 ? (
            <p className="text-sm text-gray-400">Nenhum agendamento para hoje.</p>
          ) : (
            <div className="space-y-3">
              {today.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(a.scheduledAt).toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                    <p className="text-xs text-gray-500">via {a.createdVia}</p>
                  </div>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      a.status === 'Confirmed'
                        ? 'bg-green-50 text-green-700'
                        : a.status === 'Cancelled'
                        ? 'bg-red-50 text-red-700'
                        : 'bg-gray-50 text-gray-700'
                    }`}
                  >
                    {a.status === 'Confirmed' && 'Confirmado'}
                    {a.status === 'Cancelled' && 'Cancelado'}
                    {a.status === 'Completed' && 'Concluído'}
                    {a.status === 'NoShow' && 'Não compareceu'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
