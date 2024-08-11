import React from 'react';
import '../assets/styles/Home.css'; 

const Home = () => {
    return (
        <div className="home-container">
            <h1>Welcome to the Library Online Public Access Catalog (OPAC)</h1>
            <p>Your gateway to accessing and managing library resources online.</p>
            <div className="home-buttons">
                <button onClick={() => window.location.href = '/login'}>Login</button>
                <button onClick={() => window.location.href = '/signup'}>Sign Up</button>
                <button onClick={() => window.location.href = '/catalog'}>Explore as Guest</button>
            </div>
        </div>
    );
};

export default Home;
