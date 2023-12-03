import React, { ReactNode, useEffect, useRef, useState } from "react";
import SearchIcon from "../../assets/icon/search";

interface DropdownProps {
  triggerComponent: ReactNode,
  menu: ReactNode
}

function Dropdown({ triggerComponent, menu }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const refMenuComponent = useRef<HTMLDivElement>(null);
  const refTriggerComponent = useRef<HTMLButtonElement>(null);

  const toggle = (e: MouseEvent) => {
    if (!isOpen) {
      if (refTriggerComponent.current?.contains(e.target as Node)) {
        setIsOpen(open => !open);
        return
      }
    }
    if (!refMenuComponent.current?.contains(e.target as Node)) {
      console.log(e.target)
      setIsOpen(false);
      console.log("click outside");
    }

  }

  useEffect(() => {
    document.addEventListener("click", toggle);
    return () => {
      document.removeEventListener("click", toggle);
    };
  }, [])

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    })
    return () => {
      document.removeEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          setIsOpen(false);
        }
      })
    }
  }, [open])

  return (
    <div>
      <button ref={refTriggerComponent}>
        {triggerComponent}
      </button>
      {isOpen &&
        <div ref={refMenuComponent}>
          {menu}
        </div>
      }
    </div>

  );
}

function DropdownMenu({ children }: { children: ReactNode }) {
  const refMenuContainer = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const menuContainer = refMenuContainer.current;
    if (menuContainer) {
      const { right } = menuContainer.getBoundingClientRect();
      const { innerWidth } = window;
      if (right > innerWidth - 10) {
        menuContainer.classList.add("right-3");
      }
    }
  }, []);

  return (
    <div ref={refMenuContainer} className="absolute mt-4 py-4 border-1 border-tint400 bg-tint0 rounded-sm">
      {children}
    </div>
  );
}
function SectionSeparator() {
  return (
    <div className="w-full h-[1px] bg-tint300 my-4"></div>
  )
}

function Searchbar({ placeholder, value, onChange }: { placeholder: string, value: string, onChange: (value: string) => void }) {
  return (
    <div className="flex flex-row items-center stroke-tint500">
      <SearchIcon width={20} height={20} />
      <input autoFocus className="  px-3 py-1 outline-none" placeholder={placeholder} type="text" value={value} onChange={(e) => onChange(e.target.value)}></input>
    </div>
  )
}


export default Dropdown;
export { DropdownMenu, SectionSeparator, Searchbar };