import { cn } from "@/lib/utils"

interface SocialButtonProps {
    logo: string
    alt: string
    bgColor?: string
    onClick?: () => void
    className?: string
}

const SocialButton = ({
    logo,
    alt,
    bgColor = "bg-black",
    onClick,
    className,
}: SocialButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                "w-full",
                "h-14",
                "flex items-center justify-center",
                "rounded-full",
                "transition-all duration-200",
                "hover:scale-[1.02] active:scale-[0.98]",
                bgColor,
                className
            )}
        >
            <img
                src={logo}
                alt={alt}
                className="h-6 w-auto object-contain"
            />
        </button>
    )
}

export default SocialButton