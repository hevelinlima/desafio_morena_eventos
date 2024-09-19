import styled from "styled-components";

export const HeaderContainer = styled.header`
  background-color: #fff;
  padding: 2rem 4rem;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Nav = styled.nav`
  display: flex;
`;

export const NavList = styled.ul`
  list-style-type: none;
  display: flex;
  gap: 0.3rem;
  margin: 0;
  padding: 0;
`;

export const NavItem = styled.li`
  color: #333;
  text-decoration: none;
  font-size: 1.125rem;
  font-weight: 700;
`;

export const NavLink = styled.a`
  color: #333;
  text-decoration: none;
  font-size: 1.125rem;
  font-weight: 700;

  &:hover {
    opacity: 0.8;
  }
`

export const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #333;
  text-decoration: none;
  font-size: 1.125rem;
  font-weight: 700;

  &:hover {
    opacity: 0.8;
  }
`

export const Username = styled.span`
  font-weight: bold;
`
