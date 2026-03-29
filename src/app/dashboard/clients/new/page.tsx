'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { clientsService } from '@/services/clients'
import { ArrowLeft, Users } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import keycloak from '@/lib/keycloak'

const schema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  phone: z.string().min(10, 'Telefone inválido'),
  whatsApp: z.string().min(10, 'WhatsApp inválido'),
})

type FormData = z.infer<typeof schema>

const inputClass =
  'w-full px-3 py-2.5 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-gray-400'

export default function NewClientPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      await clientsService.create({
        ...data,
        keycloakUserId: keycloak.subject ?? '',
      })
      router.push('/dashboard/clients')
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
          href="/dashboard/clients"
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={18} className="text-gray-500" />
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Novo cliente</h1>
          <p className="text-gray-500 text-sm mt-1">Cadastre um novo cliente</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
            <Users size={18} className="text-purple-600" />
          </div>
          <p className="font-medium text-gray-900">Dados do cliente</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Nome completo
            </label>
            <input
              {...register('name')}
              type="text"
              placeholder="Ex: Ana Souza"
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
              placeholder="Ex: (11) 99999-0004"
              className={inputClass}
            />
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              WhatsApp
            </label>
            <input
              {...register('whatsApp')}
              type="text"
              placeholder="Ex: 5511999990004"
              className={inputClass}
            />
            <p className="text-xs text-gray-400 mt-1">
              Formato internacional sem símbolos. Ex: 5511999990004
            </p>
            {errors.whatsApp && (
              <p className="text-xs text-red-500 mt-1">{errors.whatsApp.message}</p>
            )}
          </div>

          {/* Botões */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
            >
              {loading ? 'Salvando...' : 'Cadastrar cliente'}
            </button>
            <Link
              href="/dashboard/clients"
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
