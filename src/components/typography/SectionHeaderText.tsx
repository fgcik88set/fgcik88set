interface SectionHeaderTextProps {
    text: string;
}

export default function SectionHeaderText({text}:SectionHeaderTextProps) {
    return (
        <p className="font-chewy text-[3rem] lg:text-[4rem] text-center">
            {text}
        </p>
    )
}