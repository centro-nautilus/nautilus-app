interface SectionTitleProps {
    title: string,
    description: string
}

export const SectionTitle = ({ title, description }: SectionTitleProps) => {
    return <div className="
        flex flex-col gap-4 md:items-center md:gap-8
    ">
        <h2 className="
            text-2xl md:text-5xl font-bold text-[#172A45] md:text-center
        ">{title}</h2>
        <p className="
            text-xl text-gray-600 md:text-2xl max-w-6xl mx-auto leading-relaxed md:text-center
        ">{description}</p>
    </div>
}