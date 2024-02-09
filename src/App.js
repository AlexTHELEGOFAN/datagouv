import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [data, setData] = useState(null);

    const getData = async () => {
        try {
            const response = await axios.get('https://www.data.gouv.fr/api/1/organizations/?page=1&page_size=20');
            console.log(response.data.data);
            setData(response.data.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des données: ", error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <p className={'title'}>Data gouvernment</p>
            </header>
            <content>
                <p>Membres par organisations :</p>
            {data && data.map((item, index) => (
                <div key={index}>
                    <div  className={'bold underline'}>{item.name}</div>
                    {item.members && item.members.map((member, memberIndex) => (
                        <div key={memberIndex}>
                            <p className={'bold'}>Membre {memberIndex + 1} :</p>
                            <p>Prénom: {member.user.first_name}</p>
                            <p>Nom: {member.user.last_name}</p>
                            <p>Role: {member.role}</p>
                        </div>
                    ))}
                    <br />
                    <br />
                </div>
            ))}
            </content>
        </div>
    );
}

export default App;

