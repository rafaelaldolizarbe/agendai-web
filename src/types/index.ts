// ─── Tenant ──────────────────────────────────────────────
export interface Tenant {
  id: string
  name: string
  slug: string
  active: boolean
  createdAt: string
}

// ─── Branch ──────────────────────────────────────────────
export interface Branch {
  id: string
  tenantId: string
  name: string
  address: string
  phone: string
  active: boolean
}

// ─── Staff ───────────────────────────────────────────────
export interface StaffMember {
  id: string
  branchId: string
  keycloakUserId: string
  name: string
  phone: string
  specialty: string
  commissionPct: number
  active: boolean
}

// ─── Client ──────────────────────────────────────────────
export interface Client {
  id: string
  keycloakUserId: string
  name: string
  phone: string
  whatsApp: string
  createdAt: string
}

// ─── ServiceCatalog ───────────────────────────────────────
export interface ServiceCatalog {
  id: string
  name: string
  description: string
  durationMinutes: number
}

// ─── StaffService ─────────────────────────────────────────
export interface StaffService {
  id: string
  staffId: string
  serviceCatalogId: string
  price: number
  active: boolean
}

// ─── Appointment ─────────────────────────────────────────
export interface Appointment {
  id: string
  branchId: string
  staffId: string
  clientId: string
  staffServiceId: string
  scheduledAt: string
  status: AppointmentStatus
  createdVia: string
  createdAt: string
}

export type AppointmentStatus = 'Confirmed' | 'Completed' | 'Cancelled' | 'NoShow'

// ─── Commission ───────────────────────────────────────────
export interface Commission {
  id: string
  staffId: string
  appointmentId: string
  amount: number
  percentage: number
  period: string
  status: CommissionStatus
}

export type CommissionStatus = 'Pending' | 'Paid'
