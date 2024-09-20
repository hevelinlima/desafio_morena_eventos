import React from 'react';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input, Button, Container, Form, Title, Labels, Subtitle, AccessButton } from './styles';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

type LoginFormValues = {
  email: string;
  password: string;
};

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
};

function AuthPage() {
  const { register, handleSubmit } = useForm<LoginFormValues>();
  const { register: registerUser, handleSubmit: handleRegisterSubmit } = useForm<RegisterFormValues>();
  const { signIn, register: registerAuth } = useContext(AuthContext);
  const router = useRouter();

  const handleSignIn: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      await signIn(data.email, data.password);
      router.push('/meus_eventos');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  const handleRegister: SubmitHandler<RegisterFormValues> = async (data) => {
    try {
      await registerAuth(data.name, data.email, data.password);
      
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(handleSignIn)} style={{ flex: 1 }}>
        <Title>Entre com sua conta</Title>
        <Subtitle>Entre com sua conta para participar de um evento</Subtitle>
        <Labels>
          <label htmlFor="login-email">Email</label>
          <Input 
            id="login-email" 
            {...register('email')} 
            type="email" 
            placeholder="Digite seu email" 
            required 
          />
        </Labels>
        
        <Labels>
          <label htmlFor="login-password">Senha</label>
          <Input 
            id="login-password" 
            {...register('password')} 
            type="password" 
            placeholder="Digite sua senha" 
            required 
          />
        </Labels>
        <AccessButton type="submit">Acessar</AccessButton>
      </Form>
      
      <Form onSubmit={handleRegisterSubmit(handleRegister)} style={{ flex: 1 }}>
        <Title>Cadastre-se</Title>
        <Subtitle>Cadastre-se para participar ou criar um evento</Subtitle>
        <Labels>
          <label htmlFor="register-name">Nome</label>
          <Input 
            id="register-name"
            {...registerUser('name')} 
            type="text" 
            placeholder="Digite seu nome" 
            required 
          />
        </Labels>
        <Labels>
          <label htmlFor="register-email">Email</label>
          <Input 
            id="register-email"
            {...registerUser('email')}  
            type="email"  
            placeholder="Digite seu email" 
            required 
          />
        </Labels>
        <Labels>
          <label htmlFor="register-password">Senha</label>
          <Input 
            id="register-password"
            {...registerUser('password')}   
            type="password" 
            placeholder="Digite sua senha" 
            required 
          />
        </Labels>
        <AccessButton type="submit">Criar conta</AccessButton>
      </Form>
    </Container>
  );
}

export default AuthPage;
