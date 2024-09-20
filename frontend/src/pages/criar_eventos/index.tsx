"use client"

import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { EventForm, FormContainers, MidContainer, RegisterEventButton } from "./styles";
import { Input, Labels, Subtitle, Title } from "../login/styles";

const EventRegistration = () => {
  const { isAuthenticated, getUser, user } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      getUser(); 
    }
  }, [isAuthenticated]);

  const { registerEvent } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    zipcode: "",
    number: "",
    city: "",
    state: "",
    starts_at: "",
    ends_at: "",
    complement: "",
    max_subscription: 0,
    is_active: false,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleZipcodeChange = async (e) => {
    const { value } = e.target;
    setFormData({ ...formData, zipcode: value });

    if (value.length === 8) { 
      try {
        const response = await fetch(`https://viacep.com.br/ws/${value}/json/`);
        const data = await response.json();

        if (!data.erro) {
          setFormData((prev) => ({
            ...prev,
            address: data.logradouro,
            city: data.localidade,
            state: data.uf,
          }));
        } else {
          setError("CEP inválido");
        }
      } catch (error) {

        console.error(error); 
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerEvent(formData);
      alert("Evento cadastrado com sucesso!");
      setFormData({
        name: "",
        description: "",
        address: "",
        zipcode: "",
        number: "",
        city: "",
        state: "",
        complement: "",
        starts_at: "",
        ends_at: "",
        max_subscription: 0,
        is_active: false,
      });
    } catch (error) {
      console.error("Erro ao cadastrar evento:", error);
    }
  };

  return (
    <EventForm onSubmit={handleSubmit}>
      <Title>Cadastrar evento</Title>
      <Subtitle>Cadastre o seu evento na plataforma</Subtitle>
      <MidContainer>
        <FormContainers>
          <Labels>
            <label>Ativo?</label>
            <input type="checkbox" name="is_active" checked={formData.is_active} onChange={() => setFormData(prev => ({ ...prev, is_active: !prev.is_active }))} />
          </Labels>
          <Labels>
            <label>Nome</label>
            <Input type="text" name="name" placeholder="Digite o nome do evento" value={formData.name} onChange={handleChange} required />
          </Labels>
          <Labels>
            <label>Descrição</label>
            <Input type="text" name="description" placeholder="SObre o evento"
            value={formData.description} onChange={handleChange} required />
          </Labels>
          <Labels>
            <label>Data/Hora do início do evento</label>
            <Input type="datetime-local" name="starts_at" value={formData.starts_at} onChange={handleChange} required />
          </Labels>
          <Labels>
            <label>Data/Hora do encerramento do evento</label>
            <Input type="datetime-local" name="ends_at" value={formData.ends_at} onChange={handleChange} required />
          </Labels>
          <Labels>
            <label>Vagas para o evento</label>
            <Input type="number" name="max_subscription"
            placeholder="Limite máximo de pessoas" value={formData.max_subscription} onChange={handleChange} required />
          </Labels>
        </FormContainers>
        <FormContainers>
          <Labels>
            <label>CEP</label>
            <Input type="text" name="zipcode" placeholder="Apenas números" value={formData.zipcode} onChange={handleZipcodeChange} required />
          </Labels>
          <Labels>
            <label>Endereço</label>
            <Input type="text" name="address" value={formData.address} onChange={handleChange} required />
          </Labels>
          <Labels>
            <label>Número</label>
            <Input type="text" name="number" value={formData.number} onChange={handleChange} required />
          </Labels>
          <Labels>
            <label>Complemento</label>
            <Input type="text" name="complement" value={formData.complement} onChange={handleChange} required />
          </Labels>
          
          <Labels>
            <label>Cidade</label>
            <Input type="text" name="city" value={formData.city} onChange={handleChange} required />
          </Labels>
          <Labels>
            <label>Estado</label>
            <Input type="text" name="state" value={formData.state} onChange={handleChange} required />
          </Labels>
        </FormContainers>
      </MidContainer>
      <RegisterEventButton type="submit">Cadastrar</RegisterEventButton>
      {error && <p>{error}</p>}
    </EventForm>
  );
};

export default EventRegistration;

