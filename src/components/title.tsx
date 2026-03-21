export function Title({children, className}: {children: React.ReactNode, className?: string}){
    return <h1 className={`relative text-4xl z-50 font-medium before-badge `}>{children}</h1>;
}