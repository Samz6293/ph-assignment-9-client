import { CircleCheckIcon, ShoppingBagIcon, StoreIcon } from "lucide-react";

const roles = [
    { value: "customer", icon: ShoppingBagIcon, title: "Customer", text: "Order from local pizzerias" },
    { value: "vendor", icon: StoreIcon, title: "Vendor (Restaurant Owner)", text: "List my restaurant’s menu" },
] as const; // as const: keeps value as "customer" | "vendor" instead of plain string

export default function RolePicker({ role, onRoleChange }: { role: "customer" | "vendor", onRoleChange: (role: "customer" | "vendor") => void }) {
    return (
        <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold">I am joining as</span>

            <div className="grid grid-cols-1 gap-2.5
                sm:grid-cols-2">
                {roles.map((option) => {
                    const isSelected = role === option.value;

                    return (
                        // each card is a label around a hidden radio, so clicking anywhere on it selects it
                        <label key={option.value} className={`flex flex-col gap-1.5 border-2 p-3.5 rounded-xl cursor-pointer
                            ${isSelected ? "border-primary bg-primary-soft text-primary-soft-foreground" : "border-border"}`}>
                            <input type="radio" name="role" value={option.value} checked={isSelected} onChange={() => onRoleChange(option.value)} className="sr-only" />

                            <span className="flex justify-between">
                                <option.icon className={`size-5
                                    ${!isSelected && "text-muted-foreground"}`} strokeWidth={2.5} />
                                {isSelected && <CircleCheckIcon className="size-5" strokeWidth={2.5} />}
                            </span>
                            <span className="text-md font-bold">{option.title}</span>
                            <span className={`text-sm leading-snug
                                ${!isSelected && "text-muted-foreground"}`}>{option.text}</span>
                        </label>
                    )
                })}
            </div>
        </div>
    )
}
