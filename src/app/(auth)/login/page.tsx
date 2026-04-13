'use client';
import { Title } from '@/src/components/title';
import { Input, InputPassword } from '@/src/components/input';
import { Button } from '@/src/components/button';
import { LockKeyhole, User, ChevronsRight } from 'lucide-react';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Credentials } from '@/src/types/auth';
import { loginService } from '@/src/service/auth.services';

export default function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorResponse, setErrorResponse] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>();

  const onSubmit: SubmitHandler<Credentials> = async (data) => {
    try {
      setLoading(true);
      const { response, json } = await loginService(data);
      if (response.ok) {
        setErrorResponse(null);
        localStorage.setItem('access_token', json.accessToken);
      } else {
        throw new Error(json.messageError);
      }
    } catch (error: any) {
      console.error(error.message);
      setErrorResponse(error.message);
    } finally {
      setLoading(false);
    }
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
          <Button type="submit" loadingState={loading} className="uppercase" disabled={loading}>
            Entrar
            <ChevronsRight />
          </Button>
        </form>
      </div>
    </div>
  );
}
