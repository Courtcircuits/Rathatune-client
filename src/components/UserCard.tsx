import Rat from "../assets/rat.png";

export function UserCard({ name, url, king }: { name: string, url: string, king?: boolean }) {
    if (name === "Rat"){
        return (
            <img className="w-11 rounded-full " src={Rat} alt="Profile picture" />
        )
    }
    if (king) {
        return (
            <div title={name} className="flex flex-col relative items-center after:content-[attr(title)] after:text-sm after:truncate">
                <img className="w-11 rounded-full " src={url} alt="Profile picture" />
                <p className="absolute bottom-4 right-[-2px] text-xl">👑</p>
            </div>
        )
    }
    return (
        <div title={name} className="flex flex-col items-center after:content-[attr(title)] after:text-sm after:truncate">
            <img className="w-11 rounded-full " src={url} alt="Profile picture" />
        </div>
    )
}