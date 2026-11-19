import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import UserAvatar from "@/components/shared/UserAvatar";
import NoUsers from "@/components/admin/NoUsers";
import UserStatusTag from "@/components/admin/UserStatusTag";
import { getUsers } from "@/lib/fetch";
import { formatDate } from "@/lib/date";
import { UserData } from "@/lib/types";

// "Vendor · Napoli Corner" for vendors, just the role for everyone else
const roleLabel = (user: UserData) => `${user.role}${user.businessName ? ` · ${user.businessName}` : ""}`;

export default async function UsersList({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
    const { search, role } = await searchParams;
    // a repeated key (?role=a&role=b) arrives as an array; only plain strings go to the server
    const users = await getUsers(typeof search === "string" ? search : undefined, typeof role === "string" ? role : undefined);

    if (users.length === 0) return <NoUsers />;

    return (
        <div className="flex flex-col gap-3">
            <p className="text-sm text-muted-foreground font-semibold">{users.length} {users.length === 1 ? "user" : "users"}</p>

            {/* mobile: one card per user */}
            <div className="flex flex-col gap-3
                md:hidden">
                {users.map((user) =>
                    <div key={user._id} className="flex items-center gap-3 bg-card border p-4 rounded-2xl">
                        <UserAvatar name={user.name} image={user.image} className="size-11" />
                        <div className="flex flex-col flex-1 min-w-0">
                            <b className="truncate">{user.name}</b>
                            <span className="text-sm text-muted-foreground truncate">{user.email}</span>
                            <span className="text-xs text-muted-foreground capitalize mt-1">{roleLabel(user)} · Joined {formatDate(user.createdAt)}</span>
                        </div>
                        <UserStatusTag isBlocked={user.isBlocked} />
                    </div>
                )}
            </div>

            {/* tablet + desktop: table */}
            <div className="hidden bg-card border rounded-2xl overflow-hidden
                md:block">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="pl-5">User</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead className="pr-5">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) =>
                            <TableRow key={user._id}>
                                <TableCell className="pl-5">
                                    <div className="flex items-center gap-3">
                                        <UserAvatar name={user.name} image={user.image} className="size-9" />
                                        <div className="flex flex-col">
                                            <b>{user.name}</b>
                                            <span className="text-sm text-muted-foreground">{user.email}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="capitalize">{roleLabel(user)}</TableCell>
                                <TableCell className="text-muted-foreground">{formatDate(user.createdAt)}</TableCell>
                                <TableCell className="pr-5">
                                    <UserStatusTag isBlocked={user.isBlocked} />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
