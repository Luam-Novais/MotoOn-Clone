'use client';
import Link from 'next/link';
import { User, LockKeyhole, ChevronsRight, AtSign } from 'lucide-react';
import { useState } from 'react';
import { Title } from '@/src/components/title';
import { Input, InputPassword } from '@/src/components/input';
import { Button } from '@/src/components/button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CreateUserDTO } from '@/src/types/auth';
import { useMutation } from '@tanstack/react-query';
import { createAccountService } from '@/src/service/auth.services';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserDTO>();
  const [errorResponse, setErrorResponse] = useState<string | null>(null);
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateUserDTO) => createAccountService(data),
    onSuccess: (data) => {
      setErrorResponse(null);
      localStorage.setItem('access_token', data.accessToken);
      toast.success(data.message);
      router.push('/home');
    },
    onError: (data) => setErrorResponse(data.message),
  });

  const onSubmit: SubmitHandler<CreateUserDTO> = (data) => {
    mutate(data);
  };
  return (
    <div className="relative z-50 before-dot after-dot backdrop-blur-2xl">
      <div className="relative flex flex-col rounded-2xl bg-container px-4 py-10 shadow-xl shadow-black/50">
        <span className="flex flex-col gap-4">
          <Title>Criar conta</Title>

          <p className="text-sm text-gray-300">Crie sua conta para acessar a plataforma e começar a gerenciar suas corridas.</p>
        </span>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-14 flex flex-col gap-4">
          {errorResponse && <p className="text-sm text-red-500">{errorResponse}</p>}

          <div className="mb-10 flex flex-col gap-10">
            <Input
              icon={User}
              placeholder="Seu nome"
              label="Nome"
              type="text"
              error={errors.name?.message}
              register={register('name', {
                required: 'O nome é obrigatório.',
              })}
            />

            <Input
              icon={AtSign}
              placeholder="username"
              label="Nome de usuário"
              type="text"
              error={errors.username?.message}
              register={register('username', {
                required: 'O nome de usuário é obrigatório.',
                minLength: {
                  value: 3,
                  message: 'Mínimo de 3 caracteres.',
                },
              })}
            />

            <InputPassword
              icon={LockKeyhole}
              label="Senha"
              type="password"
              error={errors.password?.message}
              register={register('password', {
                required: 'A senha é obrigatória.',
                minLength: {
                  value: 6,
                  message: 'Mínimo de 6 caracteres.',
                },
              })}
            />
          </div>

          <Button type="submit" loadingState={isPending} disabled={isPending} className="uppercase">
            Criar conta
            <ChevronsRight />
          </Button>

          <div className="mt-6 flex items-center justify-center">
            <p className="text-sm text-zinc-400">
              Já possui uma conta?{' '}
              <Link href="/login" className="font-medium text-amber-500 transition-colors hover:text-amber-400">
                Entrar
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
