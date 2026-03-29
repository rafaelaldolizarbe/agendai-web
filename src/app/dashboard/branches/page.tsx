'use client'

import { useEffect, useState } from 'react'
import { branchesService } from '@/services/branches'
import { Branch } from '@/types'
import { Building2, Plus, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

export default function BranchesPage() {
  const [branches, setBranches] = useState<Branch[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    branchesService
      .list()
      .then(setBranches)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Unidades</h1>
          <p className="text-gray-500 text-sm mt-1">
            {branches.length} unidade{branches.length !== 1 ? 's' : ''} cadastrada{branches.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link
          href="/dashboard/branches/new"
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus size={16} />
          Nova unidade
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 animate-pulse">
              <div className="h-5 bg-gray-100 rounded w-3/4 mb-3" />
              <div className="h-4 bg-gray-100 rounded w-full mb-2" />
              <div className="h-4 bg-gray-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : branches.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <Building2 size={32} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Nenhuma unidade cadastrada.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {branches.map((branch) => (
            <div
              key={branch.id}
              className="bg-white rounded-xl border border-gray-100 p-6 hover:border-gray-200 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                  <Building2 size={18} className="text-purple-600" />
                </div>
                <p className="font-medium text-gray-900">{branch.name}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm text-gray-500">
                  <MapPin size={14} className="mt-0.5 shrink-0" />
                  {branch.address}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Phone size={14} />
                  {branch.phone}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    branch.active
                      ? 'bg-green-50 text-green-700'
                      : 'bg-red-50 text-red-700'
                  }`}
                >
                  {branch.active ? 'Ativa' : 'Inativa'}
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
