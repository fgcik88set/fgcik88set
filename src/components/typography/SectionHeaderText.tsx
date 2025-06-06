interface SectionHeaderTextProps {
    text: string;
    className?: string;
}

export default function SectionHeaderText({text, className}:SectionHeaderTextProps) {
    return (
        <p className={`font-chewy text-[2rem] lg:text-[3rem] text-center ${className || ""}`}>
            {text}
        </p>
    )
}