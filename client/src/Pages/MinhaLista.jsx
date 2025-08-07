import { useFavoritos } from "../Context/FavoritosContext";
import CarrosselGenero from "../Components/CarrosselGenero";
import "../Styles/Catalogo.css";
import { useAuth } from "../Context/AuthContext";

export default function MinhaLista() {
  const { favoritos } = useFavoritos();
  const { IsLoggedIn } = useAuth();

  return (
    <div className="pagina-lista">
      {IsLoggedIn ? (
        <>
          <h1 className="Title">Minha Lista</h1>
          {favoritos.length > 0 ? (
            <CarrosselGenero titulo="Filmes Favoritos" filmes={favoritos} />
          ) : (
            <p>Você ainda não adicionou filmes à sua lista.</p>
          )}
        </>
      ) : (
        <h1 className="Title">Log-in para criar sua lista</h1>
      )}
    </div>
  );
}
