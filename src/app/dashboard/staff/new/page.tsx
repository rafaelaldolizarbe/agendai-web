'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { staffService } from '@/services/staff'
import { branchesService } from '@/services/branches'
import { Branch } from '@/types'
import { ArrowLeft, Scissors } from 'lucide-react'
import Link from 'next/link'

const schema = z.object({
  branchId: z.string().uuid('Selecione uma unidade'),
  keycloakUserId: z.string().min(1, 'ID do usuário é obrigatório'),
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  phone: z.string().min(10, 'Telefone inválido'),
  specialty: z.string().min(2, 'Especialidade é obrigatória'),
  commissionPct: z.number().min(0).max(100),
})

type FormData = z.infer<typeof schema>

const specialties = [
  'Cabeleireira',
  'Cabeleireiro',
  'Manicure',
  'Pedicure',
  'Colorista',
  'Maquiadora',
  'Barbeiro',
  'Esteticista',
]

const inputClass =
  'w-full px-3 py-2.5 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-gray-400'

export default function NewStaffPage() {
  const router = useRouter()
  const [branches, setBranches] = useState<Branch[]>([])
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { commissionPct: 0 },
  })

  useEffect(() => {
    branchesService.list().then(setBranches)
  }, [])

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      await staffService.create(data)
      router.push('/dashboard/staff')
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl">
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/dashboard/staff"
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={18} className="text-gray-500" />
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Novo profissional</h1>
          <p className="text-gray-500 text-sm mt-1">Cadastre um novo profissional</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
            <Scissors size={18} className="text-purple-600" />
          </div>
          <p className="font-medium text-gray-900">Dados do profissional</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Unidade */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Unidade
            </label>
            <select {...register('branchId')} className={`${inputClass} bg-white`}>
              <option value="">Selecione uma unidade...</option>
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
            {errors.branchId && (
              <p className="text-xs text-red-500 mt-1">{errors.branchId.message}</p>
            )}
          </div>

          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Nome completo
            </label>
            <input
              {...register('name')}
              type="text"
              placeholder="Ex: Juliana Silva"
              className={inputClass}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Telefone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Telefone
            </label>
            <input
              {...register('phone')}
              type="text"
              placeholder="Ex: (11) 99999-0002"
              className={inputClass}
            />
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Especialidade */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Especialidade
            </label>
            <select {...register('specialty')} className={`${inputClass} bg-white`}>
              <option value="">Selecione uma especialidade...</option>
              {specialties.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {errors.specialty && (
              <p className="text-xs text-red-500 mt-1">{errors.specialty.message}</p>
            )}
          </div>

          {/* Comissão */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Comissão (%)
            </label>
            <input
              {...register('commissionPct', { valueAsNumber: true })}
              type="number"
              min="0"
              max="100"
              placeholder="Ex: 40"
              className={inputClass}
            />
            {errors.commissionPct && (
              <p className="text-xs text-red-500 mt-1">{errors.commissionPct.message}</p>
            )}
          </div>

          {/* Keycloak User ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              ID do usuário (Keycloak)
            </label>
            <input
              {...register('keycloakUserId')}
              type="text"
              placeholder="Ex: uuid do usuário no Keycloak"
              className={inputClass}
            />
            {errors.keycloakUserId && (
              <p className="text-xs text-red-500 mt-1">{errors.keycloakUserId.message}</p>
            )}
          </div>

          {/* Botões */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
            >
              {loading ? 'Salvando...' : 'Cadastrar profissional'}
            </button>
            <Link
              href="/dashboard/staff"
              className="flex-1 text-center bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
