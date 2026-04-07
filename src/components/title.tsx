export function Title({children, className}: {children: React.ReactNode, className?: string}){
    return <h1 className={`relative text-3xl z-50 font-medium ${className} `}>{children}</h1>;
}