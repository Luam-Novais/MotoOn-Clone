import { ArrowLeft } from "lucide-react";
import { Title } from "@/src/components/title";
import Link from "next/link";
import { CardMotoboy } from "@/src/components/cards";

export default function Page(){
   
 return (
   <section className="p-4 flex flex-col gap-8">
     <span className="flex gap-2 items-center">
       <Link href={'/ride'}>
         <ArrowLeft size={30} />
       </Link>
       <Title>Suas Corridas</Title>
     </span>
     <section>
      <CardMotoboy/>
      <div>

      </div>
     </section>
   </section>
 );
}