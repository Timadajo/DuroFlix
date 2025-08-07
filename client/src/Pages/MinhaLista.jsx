// import { useFavoritos } from "../Context/FavoritosContext";
// import CarrosselFilmes from "../Components/CarrosselFilmes";
// import "../Styles/App.css";

// export default function MinhaLista() {
//   const { favoritos } = useFavoritos();

//   if (!favoritos || favoritos.length === 0) {
//     return (
//       <div className="pagina-vazia">
//         <h2>Você ainda não adicionou nenhum filme à sua lista.</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="pagina-carrossel">
//       <CarrosselFilmes titulo="Minha Lista de Favoritos" filmes={favoritos} />
//     </div>
//   );
// }
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
