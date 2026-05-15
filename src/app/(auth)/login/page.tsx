'use client';
import { Title } from '@/src/components/title';
import { Input, InputPassword } from '@/src/components/input';
import { Button } from '@/src/components/button';
import { LockKeyhole, User, ChevronsRight } from 'lucide-react';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Credentials } from '@/src/types/auth';
import { loginService } from '@/src/service/auth.services';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export default function Page() {
  const router = useRouter();
  const [errorResponse, setErrorResponse] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: Credentials) => loginService(data),
    mutationKey: ['auth'],
    onSuccess: (data) => {
      setErrorResponse(null);
      localStorage.setItem('access_token', data.accessToken);
      router.push('/home');
    },
    onError: (data) => {
      setErrorResponse(data.message);

      toast.error(data.message);
      if (data instanceof TypeError) {
        setErrorResponse('Ocorreu um erro inesperado em nosso servidor, estamos trabalhando nisso.');
      }
    },
  });

  const onSubmit: SubmitHandler<Credentials> = async (data) => {
    mutate(data);
  };
  return (
    <div className="z-50 relative before-dot after-dot backdrop-blur-2xl ">
      <div className="relative bg-container py-10 px-4 rounded-xl shadow-xl shadow-black/50 flex flex-col">
        <span className="flex flex-col gap-4">
          <Title>Entrar</Title>
          <p className="text-gray-300 text-sm">Entre com suas credenciais para acesso total a plataforma.</p>
        </span>
        <form onSubmit={handleSubmit(onSubmit)} action="" className="flex flex-col gap-4 mt-14">
          {errorResponse && <p className="text-sm text-red-500">{errorResponse}</p>}
          <div className="flex flex-col gap-10 mb-10">
            <Input
              icon={User}
              placeholder="username"
              error={errors.username?.message}
              label="Nome de usuário"
              type="text"
              register={register('username', {
                required: 'Nome de usuário é obrigatório.',
              })}
            />
            <InputPassword
              error={errors.password?.message}
              icon={LockKeyhole}
              label="Senha"
              type="password"
              register={register('password', {
                required: 'A senha é obrigatória.',
              })}
            />
          </div>
          <Button type="submit" loadingState={isPending} className="uppercase" disabled={isPending}>
            Entrar
            <ChevronsRight />
          </Button>
        </form>
      </div>
    </div>
  );
}
