declare module 'lucide-react' {
  import * as React from 'react'

  export type LucideIcon = React.ComponentType<
    React.SVGProps<SVGSVGElement> & {
      size?: number | string
      color?: string
      strokeWidth?: number | string
      absoluteStrokeWidth?: boolean
    }
  >

  export const Activity: LucideIcon
  export const AlertCircle: LucideIcon
  export const AlertTriangle: LucideIcon
  export const ArrowDownRight: LucideIcon
  export const ArrowRight: LucideIcon
  export const ArrowUpRight: LucideIcon
  export const BarChart3: LucideIcon
  export const BarChart: LucideIcon
  export const Briefcase: LucideIcon
  export const Bell: LucideIcon
  export const Bot: LucideIcon
  export const BrainCircuit: LucideIcon
  export const Building: LucideIcon
  export const Calculator: LucideIcon
  export const Calendar: LucideIcon
  export const CheckCircle2: LucideIcon
  export const CheckIcon: LucideIcon
  export const ChevronDown: LucideIcon
  export const ChevronRightIcon: LucideIcon
  export const ChevronsUpDown: LucideIcon
  export const Command: LucideIcon
  export const Cpu: LucideIcon
  export const CreditCard: LucideIcon
  export const Download: LucideIcon
  export const DollarSign: LucideIcon
  export const ExternalLink: LucideIcon
  export const FileSpreadsheet: LucideIcon
  export const FileText: LucideIcon
  export const Eye: LucideIcon
  export const LifeBuoy: LucideIcon
  export const Info: LucideIcon
  export const LayoutDashboard: LucideIcon
  export const LineChart: LucideIcon
  export const LogOut: LucideIcon
  export const MessageSquare: LucideIcon
  export const Moon: LucideIcon
  export const PanelLeftIcon: LucideIcon
  export const Plus: LucideIcon
  export const RefreshCw: LucideIcon
  export const RefreshCcw: LucideIcon
  export const Search: LucideIcon
  export const SearchIcon: LucideIcon
  export const Send: LucideIcon
  export const Settings: LucideIcon
  export const Smile: LucideIcon
  export const Sparkles: LucideIcon
  export const Server: LucideIcon
  export const Database: LucideIcon
  export const Sun: LucideIcon
  export const Target: LucideIcon
  export const Trash2: LucideIcon
  export const TrendingUp: LucideIcon
  export const User: LucideIcon
  export const Users: LucideIcon
  export const XIcon: LucideIcon
  export const Zap: LucideIcon
}