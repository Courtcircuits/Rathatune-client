type ButtonType = "primary" | "secondary" | "tertiary" | "warning";

function Button({ children, onClick, type }: { children: React.ReactNode, onClick: () => void, type: ButtonType }) {
    const colors = {
        primary: "border-tint300 text-tint700 hover:text-tint50 hover:bg-tint600 stroke-tint700 hover:stroke-tint50",
        secondary: "bg-tint700 border-tint700 text-tint50 hover:bg-tint600 hover:border-tint600 hover:text-tint50 stroke-tint50 hover:stroke-tint50",
        tertiary: "bg-tint100 text-tint700",
        warning: "border-warn text-warn bg-lightwarn hover:bg-warn hover:text-lightwarn"
    }

    return <button className={"border-1 py-2 flex w-full " + colors[type] + " rounded-sm transition-colors ease-linear duration-100"} onClick={
        onClick
    }>
        <div className="flex flex-row w-full justify-center items-center">{children}</div>
    </button>;
}

function IconButton(props: {
    onClick: () => void,
    icon: React.ReactNode,
    text: string
    type: ButtonType
}) {
    return <Button onClick={props.onClick} type={props.type}>
        <div className="border-0">{props.icon} </div>
        <p className="pl-3 truncate">{props.text}</p>
    </Button>
}

function WarningButton(props: {
    onClick: () => void,
    text: string
}) {
    return <Button onClick={props.onClick} type="warning"> <p className="pl-3">{props.text}</p> </Button>
}

export default Button;
export { IconButton, WarningButton };