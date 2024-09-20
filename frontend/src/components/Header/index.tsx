import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { HeaderContainer, LogoutButton, Nav, NavItem, NavLink, NavList, Username } from "./styles";

import logoImage from '../../../public/logo.svg'
import Image from "next/image";
import Link from "next/link";
import { UserCircle } from "phosphor-react";

export function Header() {
  const { isAuthenticated, user, signOut } = useContext(AuthContext);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <HeaderContainer>
      <Link href={'/'}>
        <Image 
          src={logoImage} 
          alt="Logo da Morena Eventos" 
          width={156}
          height={56}
        />
      </Link>
      <Nav>
        <NavList>
          {isAuthenticated ? (
            <>
              <NavItem>
                <NavLink href="/criar_eventos">Criar Evento |</NavLink>
              </NavItem>
              <NavItem>
                <Username>Olá, {user?.name || "Usuário"} |</Username>
              </NavItem>
              <NavItem>
                <LogoutButton onClick={handleSignOut}>Sair</LogoutButton>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem>
                <NavLink href="/meus_eventos">Criar Evento |</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/login">Entrar</NavLink>
              </NavItem>
            </>
          )}
        </NavList>
      </Nav>
    </HeaderContainer>
  );
};