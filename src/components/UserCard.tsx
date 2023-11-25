export function UserCard({ name, url }: { name: string, url: string }) {
    return (
        <div className="flex flex-col items-center">
            <img className="w-11 rounded-full " src={url} alt="Profile picture" />
            <p className="text-sm truncate">{name}</p>
        </div>
    )
}