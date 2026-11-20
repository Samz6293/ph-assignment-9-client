"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import FieldMessage from "@/components/shared/FieldMessage";
import { placeOrder } from "@/lib/customer";
import { PublicMenuItem } from "@/lib/types";

// onPlaced: lets the dialog close itself after a successful order
export default function OrderForm({ item, onPlaced }: { item: PublicMenuItem, onPlaced: () => void }) {
    const [deliveryDate, setDeliveryDate] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    // "YYYY-MM-DD" in the customer's own time zone ("en-CA" happens to write dates that way)
    const today = new Date().toLocaleDateString("en-CA");
    const shopName = item.vendor.businessName ?? item.vendor.name;

    // the same rules the server checks; "YYYY-MM-DD" strings compare correctly with <
    const dateError = deliveryDate === "" ? "Choose a delivery date." : deliveryDate < today ? "Choose today or a later date." : "";
    const addressError = deliveryAddress.trim().length < 10 ? "Enter the full delivery address." : "";
    const messageError = message.trim().length > 300 ? "Keep the message under 300 characters." : "";

    // errors stay hidden until the user types in that field or presses submit
    const showDateError = (deliveryDate !== "" || submitted) && dateError;
    const showAddressError = (deliveryAddress !== "" || submitted) && addressError;
    const showMessageError = messageError;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
        if (dateError || addressError || messageError) return;

        setLoading(true);
        const isDone = await placeOrder({
            itemId: item._id,
            deliveryDate,
            deliveryAddress: deliveryAddress.trim(),
            message: message.trim(),
        }, shopName);
        setLoading(false);
        if (isDone) onPlaced();
    };

    return (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
            <FieldGroup className="gap-4">
                <Field>
                    <FieldLabel htmlFor="deliveryDate">Delivery Date</FieldLabel>
                    {/* min: the browser's date picker greys out days before today */}
                    <Input id="deliveryDate" type="date" min={today} aria-invalid={!!showDateError}
                        value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} />
                    <FieldMessage message={showDateError} />
                </Field>

                <Field>
                    <FieldLabel htmlFor="deliveryAddress">Delivery Address</FieldLabel>
                    <Textarea id="deliveryAddress" placeholder="House, road, area, city" aria-invalid={!!showAddressError}
                        value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} />
                    <FieldMessage message={showAddressError} />
                </Field>

                <Field>
                    <FieldLabel htmlFor="message">Message for {shopName} (optional)</FieldLabel>
                    <Textarea id="message" placeholder="Special instructions, e.g. extra cheese, ring the bell twice" aria-invalid={!!showMessageError}
                        value={message} onChange={(e) => setMessage(e.target.value)} />
                    <FieldMessage message={showMessageError} />
                </Field>
            </FieldGroup>

            <Button size="lg" type="submit" disabled={loading} className="w-full
                sm:w-auto sm:self-end">
                {loading ? <><Spinner /> Placing order…</> : `Place order · ৳${item.price}`}
            </Button>
        </form>
    )
}
