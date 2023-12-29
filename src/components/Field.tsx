import { FocusEventHandler, MouseEventHandler, useState } from "react"

interface FieldProps {
  label?: string,
  placeholder: string,
  type: string,
  value: string,
  onChange: (value: string) => void,
  onFocus?: FocusEventHandler<HTMLInputElement> | undefined,
  onBlur?: FocusEventHandler<HTMLInputElement> | undefined,
}

interface FieldWithCompletionProps extends FieldProps {
  completion: string[]
}

export function Field({ label, placeholder, type, value, onChange, onFocus, onBlur }: FieldProps) {
  return <div className="flex flex-col w-full py-2">
    {label && <label className="text-tint500 pb-1">{label}</label>}
    <input className="border-1 border-tint300 rounded-sm  px-3 py-1 bg-tint100 outline-none" onFocus={onFocus} onBlurCapture={onBlur} placeholder={placeholder} type={type} value={value} onChange={(e) => onChange(e.target.value)}></input>
  </div>
}


export function FieldWithCompletion({ label, placeholder, type, value, onChange, completion }: FieldWithCompletionProps) {
  const [showCompletion, setShowCompletion] = useState(false);
  return (
    <>
      <Field label={label} placeholder={placeholder} type={type} value={value} onChange={onChange} onFocus={()=>{
        setShowCompletion(true);
      }}
      onBlur={  
        () => {
          setShowCompletion(false);
        }
      }
      />
      {
        showCompletion &&
        (
          <div className="absolute border-tint300 border-1 rounded-sm w-fit px-1 py-2 flex flex-col bg-tint0 z-[50]">
          {
            completion.map((completion) => <CompletionOption text={completion} key={completion} onClick={() => {
              onChange(completion);
              setShowCompletion(false);
            }} />)
          }
          </div>
        )
      }
    </>
  )
}

function CompletionOption({ text, onClick }: { text: string, onClick: MouseEventHandler<HTMLButtonElement> }) {
  return (
    <button onMouseDown={(e)=>{
      e.stopPropagation();
      onClick(e)
    }}
    className="py-2 px-3 hover:bg-tint100 rounded-sm text-left">
      <p>{text}</p>
    </button>
  )
}
