"use client";
import { useState } from "react";
import { EllipsisIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DeleteMenuItemDialog from "@/components/shared/DeleteMenuItemDialog";
import MenuItemForm from "@/components/vendor/MenuItemForm";
import { deleteMyMenuItem } from "@/lib/vendor";
import { MyMenuItem } from "@/lib/types";

// one "⋯" button opens a small menu: Edit opens the form dialog, Delete opens the confirm
// the dialogs sit outside the menu, so they stay open after the menu closes
export default function MyMenuItemActions({ item }: { item: MyMenuItem }) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger render={<Button size="icon" variant="outline" aria-label={`Actions for ${item.itemName}`} />}>
                    <EllipsisIcon strokeWidth={2.5} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
                        <PencilIcon strokeWidth={2.5} />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive" onClick={() => setIsDeleteOpen(true)}>
                        <Trash2Icon strokeWidth={2.5} />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* max-h + overflow: the form scrolls inside the dialog on short screens */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="grid-cols-1 max-h-9/10 overflow-y-auto
                    sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Edit {item.itemName}</DialogTitle>
                    </DialogHeader>
                    <MenuItemForm item={item} onSaved={() => setIsEditOpen(false)} />
                </DialogContent>
            </Dialog>

            <DeleteMenuItemDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen} itemName={item.itemName} onDelete={() => deleteMyMenuItem(item)} />
        </>
    )
}
