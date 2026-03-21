'use client'
import { Button } from "@/src/components/button";
import { Select, Input } from "@/src/components/input";
import { Title } from "@/src/components/title";
import {Motorbike} from 'lucide-react'
import { useState } from "react";
import {useForm, type SubmitHandler, Controller} from 'react-hook-form'

interface CreateRideDTO{
    origin:string
    destination: string
}
export default function Page(){
    const [loading, setLoading] = useState<boolean>(false)
    const {control, register, handleSubmit} = useForm<CreateRideDTO>()
    const onSubimit: SubmitHandler<CreateRideDTO> = async(data) =>{
        console.log(data)
    }
   return (
     <div className="py-6 px-4 flex flex-col gap-4">
       <Title>Para onde Vamos ?</Title>
       <p className="text-[#ddd]">
         Nos diga para onde deseja ir, que levaremos você. 
       </p>

       <form className="bg-container py-8 px-4 rounded-md shadow-black/50 shadow-md flex flex-col gap-10" onSubmit={handleSubmit(onSubimit)} action="">
         <Input label="Nome" type="text" />
         <Input label="Telefone" type="text" />
         <Controller
           name="origin"
           control={control}
           render={({ field }) => {
             return <Select data={data} label="Ponto de origem" onChange={field.onChange} value={field.value} id="origin" />;
           }}
         />
         <Controller
           name="destination"
           control={control}
           render={({ field }) => {
             return <Select data={data} label="Ponto de destino" onChange={field.onChange} value={field.value} id="destination" />;
           }}
         />
         <Input label="Ponto de referência" type="text" />
         <Input label="Data da corrida" type="date" />
         <span className="flex justify-between text-xl">
           <p>Valor:</p> <p className="text-amber-500 font-semibold">R$7,00</p>
         </span>
         <Button loadingState={loading}>Criar Corrida</Button>
       </form>
     </div>
   );
}

const data = ['freitas', 'centro', 'pq_mariana']