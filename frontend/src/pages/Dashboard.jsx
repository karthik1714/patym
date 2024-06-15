import { useState, useEffect } from 'react';
import axios from 'axios';
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export const Dashboard = () => {
    const [balance, setBalance] = useState(0);
    const [error, setError] = useState('');
    const [firstName, setFirstName] = useState('');


    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                const formattedBalance = parseFloat(response.data.balance).toFixed(2);
                setBalance(formattedBalance);

            } catch (err) {
                console.error('Error fetching balance:', err);
                setError('Failed to fetch balance');
            }
        };

        fetchBalance();
    }, []);


    return (
        <div>
            <Appbar firstName={firstName} />
            <div className="m-8">
                {error ? <div className="text-red-500">{error}</div> : <Balance value={balance} />}
                <Users />
            </div>
        </div>
    );
};
