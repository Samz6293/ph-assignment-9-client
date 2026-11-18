import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// profile photo, or the first letter of the name when there's no photo
export default function UserAvatar({ name, image, className, textClassName }: { name: string, image?: string | null, className?: string, textClassName?: string }) {
    return (
        <Avatar className={className}>
            <AvatarImage src={image ?? undefined} alt="" />
            <AvatarFallback className={textClassName}>{name[0].toUpperCase()}</AvatarFallback>
        </Avatar>
    )
}
