function CrossIcon({ width, height }: { width: number, height: number }) {
    return (
        <svg width={width} height={height} viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 3.25L3 9.75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 3.25L9 9.75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>)
}

export default CrossIcon;