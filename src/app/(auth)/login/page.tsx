'use client'
import { Title } from "@/src/components/title";
import { Input, InputPassword } from "@/src/components/input";
import { Button } from "@/src/components/button";
import { useState } from "react";

export default function Page(){
    const [loading, setLoading] = useState<boolean>(false)


    return (
      <div className="z-50 relative before-dot after-dot backdrop-blur-2xl ">
        <div className="relative bg-darkgray py-10 px-4 rounded-md shadow-xl shadow-black/50 flex flex-col gap-20">
          <span className="flex flex-col gap-4">
            <Title>Entrar</Title>
            <p className="text-gray-300 text-sm">Entre com suas credenciais para acesso total a plataforma.</p>
          </span>
          <form action="" className="flex flex-col gap-20">
            <div className="flex flex-col gap-10">
              <Input label="Nome de usuário" type="text" />
              <InputPassword label="Senha" type="password" />
            </div>
            <Button loadingState={loading}>Entrar</Button>
          </form>
        </div>
      </div>
    );  
}