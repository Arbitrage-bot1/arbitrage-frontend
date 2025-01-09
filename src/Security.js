import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Security = () => {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const compare = async () => {
        try {
            const sendpassword = {
                password: password
            }

            const res = await axios.post("https://arbitrage-backend2.onrender.com/api/password", sendpassword);
            if (res.data === "success") {
                navigate('/price_monitor'); 
                alert("Welcome Arbitrage");
            } else if (res.data === "incorrect") {
                alert("Password is incorrect");
            }
        } catch (error) {
            console.error("Error fetching password:", error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            compare(); 
        }
    };

    useEffect(() => {
    }, []);

    return (
        <div className="security">
            <div className="security-main">
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown} 
                    placeholder="Enter Password"
                />
                <button onClick={compare}>Submit</button>
            </div>
        </div>
    );
};

export default Security;
