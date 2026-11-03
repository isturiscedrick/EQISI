import {
  Boxes,
  Building2,
  Cpu,
  FlaskConical,
  HeartPulse,
  MapPin,
  Route,
  Ship,
  ShieldCheck,
  Truck,
  UtensilsCrossed,
  Users,
  Wallet,
  Warehouse,
  type LucideIcon,
} from 'lucide-react'

const systemIcons: Record<string, LucideIcon> = {
  'Payroll Management System': Wallet,
  'Human Resource Information System': Users,
  'Warehouse Management System': Warehouse,
  'Compensation & Benefits System': HeartPulse,
  'Inventory Management System': Boxes,
  'Global Positioning System': MapPin,
}

const industryIcons: Record<string, LucideIcon> = {
  'Food and Beverage': UtensilsCrossed,
  'Chemical and Laboratory Management': FlaskConical,
  'Exportation and Importation': Ship,
  'Fleet Management': Truck,
  'Logistics Management': Route,
  'Warehousing Management': Warehouse,
  'Property Management': Building2,
  'Security and Intelligence Services': ShieldCheck,
}

/** Falls back to a generic icon if a new item is added to the content file without a mapping. */
export const systemIcon = (name: string): LucideIcon => systemIcons[name] ?? Cpu
export const industryIcon = (name: string): LucideIcon => industryIcons[name] ?? Building2