import React, { useState } from 'react';
import { useUserContext } from "../app/Provider";
import { createUserWithEmailAndPassword, auth } from "../app/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [, setUsuario] = useUserContext();
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setUsuario(userCredential.user);
            navigate('/perfilusuario');
        } catch (error) {
            console.error("Error registering: ", error);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Register;
