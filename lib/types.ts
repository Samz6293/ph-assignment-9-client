import type { LucideIcon } from "lucide-react";

export interface NavLink {
    label: string
    href: string
}

export interface DashboardLink {
    label: string
    href: string
    icon: LucideIcon
}

export interface SignUpData {
    name: string
    email: string
    password: string
    image: File | null
    role: "customer" | "vendor"
    businessName?: string
}

export interface VendorPreview {
    businessName: string
    location: string
}

// a user as the Express server sends it (straight from MongoDB)
export interface UserData {
    _id: string
    name: string
    email: string
    image?: string
    role: "customer" | "vendor" | "admin"
    businessName?: string
    isBlocked?: boolean
    createdAt: string
}

// numbers for the admin overview (GET /stats/admin)
export interface AdminStats {
    totalUsers: number
    customers: number
    vendors: number
    admins: number
    totalMenuItems: number
    pendingMenuItems: number
    approvedMenuItems: number
    rejectedMenuItems: number
    totalTransactions: number
}
