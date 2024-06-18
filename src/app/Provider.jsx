import { createContext, useContext, useState } from "react"

const AppContext = createContext();
export const useUserContext = () => useContext(AppContext);

const Provider = ({ children }) => {
    const [usuario, setUsuario] = useState()

    return (
        <AppContext.Provider value={[usuario, setUsuario]}>
            {children}
        </AppContext.Provider>
    )
}

// export const AppContext = createContext()

export default Provider