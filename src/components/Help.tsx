import { useEffect, useRef, useState } from "react";

export default function Help({ trigger, children }: { trigger: React.ReactNode, children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const helpRef = useRef<HTMLDivElement>(null);

    const followCursor = (e: MouseEvent) => {
        if (helpRef.current) {
            helpRef.current.style.left = e.pageX + 20 + "px";
            helpRef.current.style.top = e.pageY + 20 + "px";
        }
    }

    useEffect(() => {
        if (open) {
            document.addEventListener("mousemove", followCursor);
        } else {
            document.removeEventListener("mousemove", followCursor);
        }
    }, [open])

    return (
    <>
        <div className="w-full" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            {trigger}
        </div>
        {open && <div ref={helpRef} className="fixed bg-tint0 rounded-sm border-1 border-tint300 p-4 ">
            {children}
        </div>}
    </>)

}

export function HelpDebt({ children, message }: { children: React.ReactNode, message?: string }) {
    return (<Help trigger={children}>
        <p className="text-sm text-gray-400">{
            message
        }</p>
    </Help>)
}