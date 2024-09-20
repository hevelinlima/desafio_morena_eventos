import styled from "styled-components";

export const EventForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: first baseline;
  align-items: center;
  height: 100vh;
  margin: 2rem;
  margin-bottom: 5rem;
`

export const MidContainer = styled.div`
  display: flex;

  @media only screen and (max-width: 862px)  {
    flex-direction: column;
  }
`

export const FormContainers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem;
  border-radius: 8px;
  width: 25rem;
  margin: 1.25rem; 

  @media only screen and (max-width: 862px)  {
    padding: 1rem;
    &:last-child{
      padding: 0;
      margin: 0 1.25rem;
    }
  }
`
export const RegisterEventButton = styled.button`
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
