import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

function MeusEventos() {
  const { getUser, isAuthenticated, user } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      getUser().then(() => {
      });
    }
  }, [isAuthenticated]);
  

  if (!isAuthenticated) {
    return <p>Você precisa estar logado para ver seus eventos.</p>;
  }

  return (
    <div>
      <h1>Meus Eventos</h1>
      {user ? (
        <div>
          <p>Bem-vindo, {user.name}!</p>
        </div>
      ) : (
        <p>Carregando informações do usuário...</p>
      )}
    </div>
  );
}

export default MeusEventos;
