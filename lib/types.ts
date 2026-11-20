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

// vendor overview (GET /stats/vendor)
export interface VendorStats {
    totalMenuItems: number
    activeMenuItems: number
    pendingMenuItems: number
    approvedMenuItems: number
    rejectedMenuItems: number
    inactiveMenuItems: number
    pendingOrders: number
    acceptedOrders: number
    rejectedOrders: number
    cancelledOrders: number
    subscriptionPlan: "free" | "premium"
}

// customer overview (GET /stats/customer)
export interface CustomerStats {
    totalOrders: number
    pendingOrders: number
    acceptedOrders: number
    rejectedOrders: number
    cancelledOrders: number
}

export type MenuItemStatus = "pending" | "approved" | "rejected" | "inactive"

// a menu item as the admin list sends it, with the vendor attached by $lookup
export interface MenuItemData {
    _id: string
    vendorId: string
    itemName: string
    category: string
    description: string
    price: number
    location: string
    images: string[]
    status: MenuItemStatus
    createdAt: string
    vendor: {
        name: string
        email: string
        businessName?: string
    }
}

// a vendor's own item (GET /menu-items/mine): same fields, no vendor attached
// Omit<Type, "key">: copies a type without that key
export type MyMenuItem = Omit<MenuItemData, "vendor">

// what the Add / Edit form sends
export interface MenuItemInput {
    itemName: string
    category: string
    description: string
    price: number
    location: string
    images: string[]
}

export type OrderStatus = "pending" | "accepted" | "rejected" | "cancelled"

// fields every order has, whoever is looking at it
export interface OrderData {
    _id: string
    deliveryDate: string
    deliveryAddress: string
    message: string
    status: OrderStatus
    createdAt: string
    // missing when the vendor deleted the item after the order
    item?: {
        _id: string
        itemName: string
        images: string[]
        price: number
        category: string
    }
}

// extends: everything OrderData has, plus these fields
// a customer's order (GET /orders/mine), with the shop attached
export interface MyOrder extends OrderData {
    vendor?: {
        name: string
        businessName?: string
    }
}

// an order for a vendor's item (GET /orders/vendor), with the customer attached
export interface VendorOrder extends OrderData {
    customer?: {
        name: string
        email: string
        image?: string
    }
}

// what the order form sends; customer and vendor are worked out on the server
export interface OrderInput {
    itemId: string
    deliveryDate: string
    deliveryAddress: string
    message: string
}

// a live item on the public menu, with the vendor's public details
export type PublicMenuItem = MyMenuItem & {
    vendor: {
        name: string
        businessName?: string
        subscriptionPlan?: "free" | "premium"
    }
}

// Browse Menu filters, straight from the URL
export interface MenuFilters {
    search?: string
    category?: string
    location?: string
    sort?: string
    limit?: number
}
