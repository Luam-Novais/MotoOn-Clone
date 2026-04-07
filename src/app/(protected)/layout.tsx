'use client'
import{ Header} from "@/src/components/header";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname().split('/')[1]
  return (
    <main className="mb-40">
        {children}
        <Header href={pathname}/>
    </main>
  )
}
