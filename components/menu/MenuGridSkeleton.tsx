import MenuCardSkeleton from "@/components/menu/MenuCardSkeleton";

// a grid of placeholder cards while the menu loads
export default function MenuGridSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 gap-5
            md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: count }, (_, index) =>
                <MenuCardSkeleton key={index} />
            )}
        </div>
    )
}
