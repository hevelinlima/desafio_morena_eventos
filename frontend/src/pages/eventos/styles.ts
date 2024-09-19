import styled from "styled-components";

export const EventContainer = styled.section`
  margin: 3rem 10rem;
  display: flex;
  justify-content: first baseline; 
  align-items: left; 
  flex-direction: column; 
  min-height: 100vh; 
`

export const EventTitle = styled.h1`
  color: #171717;
  padding-bottom: 2rem;
  font-size: 2rem;

  display: flex;
  justify-content: left;
`

export const EventSubtitle = styled.h1`
  color: #131313;
  padding: 1.5rem 0;
  font-size: 1.5rem;

  display: flex;
  justify-content: left;
`

export const AddressInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

export const GroupInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const ContentAddress = styled.div`
  p{
    font-weight: 600;
  }
`

export const SubscriptionButton = styled.button`
  border: none;
  color: #fff;
  max-width: 20rem;
  background-color: #000;
  padding: 1rem 5rem;

  font-size: 1rem;
  border-radius: 35px;
  margin-top: 2rem;

  &:hover{
    opacity: 0.9;
  }
`