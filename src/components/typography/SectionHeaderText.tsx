interface SectionHeaderTextProps {
    text: string;
    className?: string;
}

export default function SectionHeaderText({text, className}:SectionHeaderTextProps) {
    return (
        <p className={`text-[2rem] lg:text-[3rem] text-center font-bold ${className || ""}`}>
            {text}
        </p>
    )
}