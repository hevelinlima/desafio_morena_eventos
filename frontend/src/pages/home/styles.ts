import styled from "styled-components";

export const HomeContainer = styled.main`
  margin: 2rem;
  display: flex;
  justify-content: center; 
  align-items: center; 
  flex-direction: column; 
  min-height: 100vh; 
`;

export const HomeTitle = styled.h1`
  color: #505153;
  padding-bottom: 3rem;

  display: flex;
  justify-content: center;
`

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr); 
  gap: 2rem; 
  width: 100%;
  max-width: 1200px; 
  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr); 
  }
`;
