export interface NavLink {
    label: string
    href: string
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
