import { useState } from "react"
import Button from "./Button"
import SelectIcon from "../assets/icon/select"
import Check from "../assets/icon/check"

export default function SelectButton({
    options, value, setValue
}: {
    options: string[],
    value : string,
    setValue: (value: string) => void
}) {
    const [open, setOpen] = useState(false)
    return (
        <div className="relative">
            <Button type="primary" onClick={() => setOpen(open => !open)}>
                <div className="w-full flex flex-row justify-between items-center px-4">
                    <p className="text-tint800">{value}</p>
                    {<SelectIcon width={20} height={20} />}
                </div>
            </Button>

            {open && <div className="absolute z-30 left-0 w-full bg-tint0 py-2 border-tint300 border-1 mt-1 rounded-sm flex items-center flex-col">
                {options.map((option, i) => {
                    return (
                        <button onClick={
                            () => {
                                setValue(option)
                                setOpen(false)
                            }
                        } key={i} className="px-3 w-[95%] py-2 rounded-sm flex justify-between items-center stroke-tint500 hover:bg-tint200">

                            <p>{option}</p>
                            {
                                value === option && <Check width={20} height={20} />
                            }
                        </button>
                    )
                })}
            </div>}
        </div>
    )
}

export function SelectButtonSearch({
    options,
    value,
    setValue,
}: {
    options: {
        name: string,
        id: string
    }[],
    setValue: (value: {
        name: string,
        id: string
    }) => void,
    value: {
        name: string,
        id: string
    }
}) {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState("")
    console.log(value)
    return (
        <div className="relative">
            <Button type="primary" onClick={() => setOpen(open => !open)}>
                <div className="w-full flex flex-row justify-between items-center px-4">
                    <p className="text-tint800">{value.name}</p>
                    {<SelectIcon width={20} height={20} />}
                </div>
            </Button>

            {open && <div className="absolute z-30 left-0 w-full bg-tint0 py-2 border-tint300 border-1 mt-1 rounded-sm flex items-center flex-col">
                <input type="text" className="w-[95%] bg-tint0 border-tint300 border-b-1 my-2 px-3 py-2 outline-none" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                {options.filter((options) => {
                    return options.name.toLowerCase().includes(search.toLowerCase())
                }).map((option, i) => {
                    return (
                        <button onClick={
                            () => {
                                setValue(option)
                                setOpen(false)
                            }
                        } key={i} className="px-3 w-[95%] py-2 rounded-sm flex justify-between items-center stroke-tint500 hover:bg-tint200">

                            <p>{option.name}</p>
                            {
                                value === option && <Check width={20} height={20} />
                            }
                        </button>
                    )
                })}
            </div>}
        </div>
    )
}