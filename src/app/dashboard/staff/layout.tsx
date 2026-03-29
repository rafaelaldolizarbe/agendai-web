import { RouteGuard } from '@/components/providers/RouteGuard'

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return <RouteGuard roles={['owner']}>{children}</RouteGuard>
}
