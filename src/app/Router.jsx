import { BrowserRouter, Route, Routes } from "react-router-dom"
import ListadoDeEventos from "../components/ListadoDeEventos"
import NuevoEvento from "../components/NuevoEvento"
import Profile from "../components/PerfilUsario"
import Register from "../components/Register"
import EventContribution from "../components/EventContribution"


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route index element={<ListadoDeEventos />} />
                <Route path="/nuevoevento" element={<NuevoEvento />} />
                <Route path="/perfilusario" element={<Profile />} />
                <Route path="/register" element={<Register />} />
                <Route path="/eventcontribution" element={<EventContribution />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router