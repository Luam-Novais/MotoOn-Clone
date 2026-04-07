'use client';
import { Title } from '@/src/components/title';
import { Input, InputPassword } from '@/src/components/input';
import { Button } from '@/src/components/button';
import { LockKeyhole, User, ChevronsRight } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const { register } = useForm();

  return (
    <div className="z-50 relative before-dot after-dot backdrop-blur-2xl ">
      <div className="relative bg-container py-10 px-4 rounded-xl shadow-xl shadow-black/50 flex flex-col gap-20">
        <span className="flex flex-col gap-4">
          <Title>Entrar</Title>
          <p className="text-gray-300 text-sm">Entre com suas credenciais para acesso total a plataforma.</p>
        </span>
        <form action="" className="flex flex-col gap-20">
          <div className="flex flex-col gap-10">
            <Input icon={User} placeholder="username" label="Nome de usuário" type="text" register={register('username')} />
            <InputPassword icon={LockKeyhole} label="Senha" type="password" register={register('password')} />
          </div>
          <Button type="submit" loadingState={loading} className='uppercase'>
            Entrar
            <ChevronsRight/>
          </Button>
        </form>
      </div>
    </div>
  );
}
