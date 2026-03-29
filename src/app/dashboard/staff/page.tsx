'use client'

import { useEffect, useState } from 'react'
import { staffService } from '@/services/staff'
import { StaffMember } from '@/types'
import { Scissors, Plus, Phone, Percent } from 'lucide-react'
import Link from 'next/link'

const specialtyColors: Record<string, string> = {
  Cabeleireira: 'bg-purple-50 text-purple-700',
  Cabeleireiro: 'bg-purple-50 text-purple-700',
  Manicure: 'bg-pink-50 text-pink-700',
  Pedicure: 'bg-pink-50 text-pink-700',
  Colorista: 'bg-amber-50 text-amber-700',
  Maquiadora: 'bg-rose-50 text-rose-700',
}

export default function StaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    staffService
      .list()
      .then(setStaff)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Profissionais</h1>
          <p className="text-gray-500 text-sm mt-1">
            {staff.length} profissional{staff.length !== 1 ? 'is' : ''} cadastrado{staff.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link
          href="/dashboard/staff/new"
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus size={16} />
          Novo profissional
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 animate-pulse">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-100" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-100 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : staff.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <Scissors size={32} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Nenhum profissional cadastrado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {staff.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl border border-gray-100 p-6 hover:border-gray-200 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-lg font-medium">
                  {member.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{member.name}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      specialtyColors[member.specialty] ?? 'bg-gray-50 text-gray-600'
                    }`}
                  >
                    {member.specialty}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Phone size={14} />
                  {member.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Percent size={14} />
                  {member.commissionPct}% de comissão
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    member.active
                      ? 'bg-green-50 text-green-700'
                      : 'bg-red-50 text-red-700'
                  }`}
                >
                  {member.active ? 'Ativo' : 'Inativo'}
                </span>
                <button className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                  Ver detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
