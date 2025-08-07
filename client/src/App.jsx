import { FavoritosProvider } from "./Context/FavoritosContext";
import { AssistidosProvider } from "./Context/AssistidosContext";
import { AuthProvider } from "./Context/AuthContext";
import Rotas from "./Routes";
import "./Styles/App.css";

function App() {
  return (
    <AuthProvider>
      <FavoritosProvider>
        <AssistidosProvider>
          <div className="app">
            <Rotas />
          </div>
        </AssistidosProvider>
      </FavoritosProvider>
    </AuthProvider>
  );
}

export default App;
