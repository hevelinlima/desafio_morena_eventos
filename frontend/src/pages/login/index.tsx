import React from 'react';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input, LoginButton, LoginContainer, LoginForm, Title } from './styles';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

type FormValues = {
  email: string;
  password: string;
};

function Login() {
  const { register, handleSubmit } = useForm<FormValues>();
  const { signIn } = useContext(AuthContext);
  const router = useRouter();

  const handleSignIn: SubmitHandler<FormValues> = async (data) => {
    try {
      await signIn(data.email, data.password);
      router.push('/meus_eventos');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };      

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit(handleSignIn)}>
        <Title>Login</Title>
        <Input
          {...register('email')}
          type="email"
          placeholder="Email"
          required
        />
        <Input
          {...register('password')}
          type="password"
          placeholder="Senha"
          required
        />
        <LoginButton type="submit">Entrar</LoginButton>
      </LoginForm>
    </LoginContainer>
  );
}

export default Login;
