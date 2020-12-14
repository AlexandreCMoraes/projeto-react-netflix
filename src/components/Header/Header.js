import React from 'react';
import '../Header/Header.css';

export default ({ black }) => {
    // recebe a prop black
    return (
        <header className={black ? 'black': ''}>
            {/* insere a classname aqui se black estiver true, senao fica vazio */}
            <div className="header--logo">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" alt="Netflix" />
                </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Usuario" />
                </a>
            </div>
        </header>
    )
}