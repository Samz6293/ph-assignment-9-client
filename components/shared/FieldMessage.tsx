import { CircleAlertIcon } from "lucide-react";
import { FieldError } from "@/components/ui/field";

// a fixed one-line slot under a field: the error appears inside it, so the form never jumps
export default function FieldMessage({ message }: { message: string | false }) {
    return (
        <div className="h-4">
            {message &&
                <FieldError>
                    <CircleAlertIcon className="size-4" strokeWidth={2.5} /> {message}
                </FieldError>
            }
        </div>
    )
}
