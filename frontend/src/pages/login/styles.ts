import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 25rem;
  margin: 0 1.25rem; 
`;

export const Title = styled.h1`
  margin-bottom: 24px;
  color: #333;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  color: #333;

  &:focus {
    border-color: #333;
    outline: none;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #005bb5;
  }
`;

export const Labels = styled.div`
  width: inherit;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

export const Subtitle = styled.p`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  text-align: center;
`
export const AccessButton = styled.button`
  border: none;
  color: #fff;
  width: inherit;
  background-color: #000;
  padding: 1rem 5rem;

  font-size: 1rem;
  border-radius: 35px;
  margin-top: 2rem;

  &:hover{
    opacity: 0.9;
  }
`