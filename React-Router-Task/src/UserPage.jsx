import logo from './assets/logo.svg';
import defaultImage from './assets/banner.png';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import AuthContext from './AuthContext';

const UserPage = () => {
    const navigate = useNavigate();
    const { logout, personas, setSelectedPersona } = useContext(AuthContext);

    const navigateToUpdatePersona = () => {
        setSelectedPersona(null);
        navigate('/UpdatePersona');
    };

    const handleCardClick = (persona, index) => {
        setSelectedPersona({ ...persona, key: index });
        navigate('/UpdatePersona');
    };

    useEffect(() => {
        console.log("Updated personas:", personas);
    }, [personas]);

    return (
        <div className='userPage'>
            <header className='header'>
                <img src={logo} alt="" />
                {/* console.log({logo}); */}
                <button className='addActivity' onClick={logout}>Logout</button>
            </header>

            <div className='persona'>
                <div className='persona-btn'>
                    <p>Personas</p>
                    <button className='addPersona' onClick={navigateToUpdatePersona}>+ Add Persona</button>
                </div>
                <div className="cards">
                    {personas.map((persona, key) => (
                        <div className="card" key={key} onClick={() => handleCardClick(persona, key)}>
                            <img src={persona.image ? persona.image : defaultImage} alt="Persona" />
                            <h1>{persona.name}</h1>
                            {persona.quote && <p>{persona.quote}</p>}
                        </div>
                    ))}
                    <div className='card' onClick={navigateToUpdatePersona}>
                        <h1>+</h1>
                        <p>Add a Persona</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPage;
