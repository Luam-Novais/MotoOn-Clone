'use client'
import { Title } from "@/src/components/title";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Page(){
    return (
      <section className="grid gap-4 p-4">
        <span className="flex gap-2 items-center">
          <Link href={'/ride'}>
            <ArrowLeft />
          </Link>
          <Title>Histórico de corridas</Title>
        </span>
        <div>
          <div className="bg-container ">
                
          </div>
        </div>
      </section>
    );
}