type ButtonType = "primary" | "secondary" | "tertiary" | "warning" | "accept";

function Button({ children, onClick, type, small, style }: { children: React.ReactNode, onClick?: () => void, type: ButtonType, small?: boolean, style?: string }) {
    const colors = {
        primary: "border-tint300 text-tint700 hover:bg-tint200 stroke-tint700",
        secondary: "bg-tint700 border-tint700 text-tint50 hover:bg-tint600  hover:text-tint50 stroke-tint50 hover:stroke-tint50",
        tertiary: "bg-tint100 text-tint700",
        warning: "border-warn text-warn bg-lightwarn hover:bg-warn hover:text-lightwarn stroke-warn hover:stroke-lightwarn",
        accept: "border-green text-green bg-lightgreen hover:bg-green hover:text-lightgreen stroke-green hover:stroke-lightgreen"
    }
    let padding = "py-2"
    if (small) {
        padding = "py-1"
    }

    return <button className={"border-1 flex w-full " + colors[type] + " rounded-sm transition-colors ease-linear duration-100 "+padding+" "+style} onClick={
        onClick
    }>
        <div className="flex flex-row w-full justify-center items-center">{children}</div>
    </button>;
}

function IconButton(props: {
    onClick?: () => void,
    icon: React.ReactNode,
    text?: string
    type: ButtonType,
    small?: boolean,
    invert ?: boolean
}) {
    if (props.small) {
        return (<Button onClick={props.onClick} type={props.type} small>
            <div className="border-0">{props.icon}</div>
        </Button>)
    }
    if (!props.text) {
        return (<Button onClick={props.onClick} type={props.type}>
            <div className="border-0">{props.icon}</div>
        </Button>)
    }
    if (props.invert) {
        return <Button onClick={props.onClick} type={props.type}>
            <div className="border-0">{props.text} </div>
            <p className="pl-3 truncate">{props.icon}</p>
        </Button>
    }
    return <Button onClick={props.onClick} type={props.type}>
        <div className="border-0">{props.icon} </div>
        <p className="pl-3 truncate">{props.text}</p>
    </Button>


}

function WarningButton(props: {
    onClick: () => void,
    text: string
}) {
    return <Button onClick={props.onClick} type="warning"> {props.text != "" && <p className="pl-3">{props.text}</p>} </Button>
}

export default Button;
export { IconButton, WarningButton };
