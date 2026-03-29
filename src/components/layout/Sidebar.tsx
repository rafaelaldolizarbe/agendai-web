'use client'

import { useAuth } from '@/hooks/useAuth'
import {
  Calendar,
  Users,
  Scissors,
  BarChart2,
  Settings,
  LogOut,
  Building2,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  {
    label: 'Agenda',
    href: '/dashboard/schedule',
    icon: Calendar,
    roles: ['owner', 'hairdresser'],
  },
  {
    label: 'Profissionais',
    href: '/dashboard/staff',
    icon: Scissors,
    roles: ['owner'],
  },
  {
    label: 'Clientes',
    href: '/dashboard/clients',
    icon: Users,
    roles: ['owner', 'hairdresser'],
  },
  {
    label: 'Unidades',
    href: '/dashboard/branches',
    icon: Building2,
    roles: ['owner'],
  },
  {
    label: 'Comissões',
    href: '/dashboard/commissions',
    icon: BarChart2,
    roles: ['owner', 'hairdresser'],
  },
  {
    label: 'Configurações',
    href: '/dashboard/settings',
    icon: Settings,
    roles: ['owner'],
  },
]

export function Sidebar() {
  const { isOwner, isHairdresser, user, logout } = useAuth()
  const pathname = usePathname()

  const userRoles = [
    ...(isOwner ? ['owner'] : []),
    ...(isHairdresser ? ['hairdresser'] : []),
  ]

  const visibleItems = menuItems.filter((item) =>
    item.roles.some((role) => userRoles.includes(role))
  )

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-100 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-xl font-semibold text-gray-900">
          Agend<span className="text-purple-600">AI</span>
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-1">
        {visibleItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-purple-50 text-purple-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-3 py-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-sm font-medium">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors w-full"
        >
          <LogOut size={18} />
          Sair
        </button>
      </div>
    </aside>
  )
}
