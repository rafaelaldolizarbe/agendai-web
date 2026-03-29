'use client'

import { useEffect, useState } from 'react'
import { schedulingService } from '@/services/scheduling'
import { Appointment } from '@/types'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ptBrLocale from '@fullcalendar/core/locales/pt-br'

const statusColors: Record<string, string> = {
  Confirmed: '#7c3aed',
  Completed: '#16a34a',
  Cancelled: '#dc2626',
  NoShow: '#9ca3af',
}

export default function SchedulePage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    schedulingService
      .list()
      .then(setAppointments)
      .finally(() => setLoading(false))
  }, [])

  const events = appointments.map((a) => ({
    id: a.id,
    title: `via ${a.createdVia}`,
    start: a.scheduledAt,
    backgroundColor: statusColors[a.status] ?? '#7c3aed',
    borderColor: statusColors[a.status] ?? '#7c3aed',
    extendedProps: { appointment: a },
  }))

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Agenda</h1>
          <p className="text-gray-500 text-sm mt-1">
            {appointments.length} agendamento{appointments.length !== 1 ? 's' : ''} no total
          </p>
        </div>
      </div>

      {/* Legenda */}
      <div className="flex items-center gap-4 mb-6">
        {Object.entries(statusColors).map(([status, color]) => (
          <div key={status} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-xs text-gray-500">
              {status === 'Confirmed' && 'Confirmado'}
              {status === 'Completed' && 'Concluído'}
              {status === 'Cancelled' && 'Cancelado'}
              {status === 'NoShow' && 'Não compareceu'}
            </span>
          </div>
        ))}
      </div>

      {/* Calendário */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        {loading ? (
          <div className="h-96 flex items-center justify-center">
            <p className="text-sm text-gray-400">Carregando agenda...</p>
          </div>
        ) : (
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            locale={ptBrLocale}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            events={events}
            slotMinTime="07:00:00"
            slotMaxTime="21:00:00"
            allDaySlot={false}
            height="auto"
            eventClick={(info) => {
              const a = info.event.extendedProps.appointment as Appointment
              alert(`Agendamento: ${a.status}\nCriado via: ${a.createdVia}`)
            }}
          />
        )}
      </div>
    </div>
  )
}
