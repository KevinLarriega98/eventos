import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db, setDoc, doc } from '../firebase';
import { useUserContext } from '../context/Provider';

const Registro = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [apellido, setApellido] = useState('');
    const [edad, setEdad] = useState('');
    const [intereses, setIntereses] = useState('');
    const [, setUsuario] = useUserContext();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, 'usuarios', user.uid), {
                nombre: name,
                apellidos: apellido,
                edad,
                intereses
            });
            setUsuario(user);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" />
            <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} placeholder="Apellidos" />
            <input type="number" value={edad} onChange={(e) => setEdad(e.target.value)} placeholder="Edad" />
            <textarea value={intereses} onChange={(e) => setIntereses(e.target.value)} placeholder="Intereses"></textarea>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
            <button type="submit">Registrar</button>
        </form>
    );
};

export default Registro;
