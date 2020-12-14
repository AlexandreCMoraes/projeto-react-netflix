/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';
import './MovieRow.css'; /* importa o css aqui,  pois vai ser feito o componente da lista */
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default ({ title, items }) => {
    // armazenar o scroll horizontal (numero), fazer ficar dinamico e joga no style de <div className="movieRow--list"
    const [scrollX, setScrollX] = useState(0);

    // função para mover as listas para os lados (esquerdo)
    const handleLeftArrow = () => {
        // a cada clique roda para o lado metade(+) da tela do ususario
        let x = scrollX + Math.round(window.innerWidth / 2)
        // se for maior que 0, ou seja, ja é maior que 0, volta para 0
        if (x > 0) {
            x = 0
        }
        setScrollX(x)
    }
    // função para mover as listas para os lados (direito)
    const handleRighttArrow = () => {
        // a cada clique roda para o lado metade(-) da tela do ususario
        let x = scrollX - Math.round(window.innerWidth / 2);
        // largura total da lista completa
        let listW = items.results.length * 150
        // verificação do tamanho da tela - tamanho da lista e se for maior do que x, ou seja, >
        // o total do let acima
        if ((window.innerWidth - listW) > x) {
            // x recebe o tamanho da tela - lista - padding left (30) e right (30) para os nao ficar um buraco >
            // ao rolar a pagina para direita
            x = (window.innerWidth - listW) - 60
        }
        setScrollX(x)
    }

    // pega title e items do Tmdb.js e recebe aqui
    return (
        <div className="movieRow">
            <h2>{title}</h2>

            {/* foi feito a import dos botoes acima e estilizados no css */}
            <div className="movieRow--left" onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{ fontSize: 50 }} />
            </div>
            {/* foi feito a import dos botoes acima e estilizados no css */}
            <div className="movieRow--right" onClick={handleRighttArrow}>
                <NavigateNextIcon style={{ fontSize: 50 }} />
            </div>

            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                    // qnt de filmes que tem na lista * 150 que é o tamanho em pixels de cada item
                    width: items.results.length * 150
                }}>
                    {/* se tiver algum filme para mostrar */}
                    {items.results.length > 0 && items.results.map((item, key) => (
                        <div key={key} className="movieRow--item">
                            {/* traz a img poster do filme num loop do loop
                                e tbm o nome original do filme ou serie no alt caso nao carregue */}
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} />
                        </div>
                    ))}
                </div>
            </div>
        </div >

    );
} 