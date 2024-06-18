import { BrowserRouter, Route, Routes } from "react-router-dom"
import ListadoDeEventos from "../components/ListadoDeEventos"
import NuevoEvento from "../components/NuevoEvento"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<ListadoDeEventos />} />
                <Route path="/nuevoevento" element={<NuevoEvento />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router