import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./app/firebase"
import Router from "./app/Router";
import { loginWithGoogle } from "./app/api";
import { useUserContext } from "./app/Provider";

function App() {
  const [isLogged, setIsLogged] = useState(false)
  const [, setUsuario] = useUserContext()

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUsuario(user);
        setIsLogged(true);
      } else {
        console.log("No user logged");
        setIsLogged(false);
      }
    });
  }, []);

  return (
    <>
      {isLogged ? <Router /> :
        <>
          <h2>Bienvenido a la aplicación, por favor inicia sesión regístrate para acceder al listado de eventos</h2>
          <button onClick={() => loginWithGoogle()}>Iniciar sesión/Registrarse con Google</button>
        </>
      }
    </>
  )
}

export default App