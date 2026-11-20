import { ReceiptIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getTransactions } from "@/lib/fetch";
import { formatDate } from "@/lib/date";

// 12.99 + "usd" → "12.99 USD"
const formatAmount = (amount: number, currency: string) => `${amount.toFixed(2)} ${currency.toUpperCase()}`;

// read-only: transactions only come from the Stripe webhook, so there are no actions here
export default async function TransactionsList() {
    const transactions = await getTransactions();

    if (transactions.length === 0) {
        return (
            <div className="flex flex-col items-center gap-3 bg-card border text-center px-6 py-14 rounded-2xl">
                <span className="flex items-center justify-center size-14 bg-primary-soft text-primary-soft-foreground rounded-full">
                    <ReceiptIcon className="size-6" strokeWidth={2.5} />
                </span>
                <p className="text-lg font-bold">No payments yet</p>
                <p className="text-muted-foreground">When a vendor upgrades to Premium, the payment shows up here.</p>
            </div>
        )
    }

    // every payment uses the one Premium price, so they share a currency and can be added up
    const total = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

    return (
        <div className="flex flex-col gap-3">
            <p className="text-sm text-muted-foreground font-semibold">
                {transactions.length} {transactions.length === 1 ? "payment" : "payments"} · {formatAmount(total, transactions[0].currency)} total
            </p>

            {/* mobile: one card per payment */}
            <div className="flex flex-col gap-3
                md:hidden">
                {transactions.map((transaction) =>
                    <div key={transaction._id} className="flex flex-col gap-2 bg-card border p-4 rounded-2xl">
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex flex-col min-w-0">
                                <b className="truncate">{transaction.vendor?.businessName ?? transaction.vendor?.name ?? "Account deleted"}</b>
                                <span className="text-sm text-muted-foreground truncate">{transaction.vendor?.email}</span>
                            </div>
                            <span className="shrink-0 font-heading text-xl">{formatAmount(transaction.amount, transaction.currency)}</span>
                        </div>
                        <div className="flex items-center justify-between gap-3 text-sm">
                            <span className="text-muted-foreground">{formatDate(transaction.createdAt)}</span>
                            <span className="bg-success-soft text-success-soft-foreground text-xs font-bold capitalize px-2.5 py-1 rounded-full">{transaction.status}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* tablet + desktop: table */}
            <div className="hidden bg-card border rounded-2xl overflow-hidden
                md:block">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="pl-5">Vendor</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Plan</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="pr-5 text-right">Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((transaction) =>
                            <TableRow key={transaction._id}>
                                <TableCell className="pl-5">
                                    <div className="flex flex-col">
                                        <b>{transaction.vendor?.businessName ?? transaction.vendor?.name ?? "Account deleted"}</b>
                                        <span className="text-sm text-muted-foreground">{transaction.vendor?.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="font-semibold">{formatAmount(transaction.amount, transaction.currency)}</TableCell>
                                <TableCell className="capitalize">{transaction.plan}</TableCell>
                                <TableCell>
                                    <span className="bg-success-soft text-success-soft-foreground text-xs font-bold capitalize px-2.5 py-1 rounded-full">{transaction.status}</span>
                                </TableCell>
                                <TableCell className="pr-5 text-right text-muted-foreground">{formatDate(transaction.createdAt)}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
