/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import './FeaturedMovie.css';

export default ({ item }) => {
    console.log(item);

    let firstDate = new Date(item.first_air_date);
    // pega a data e coloca no parametro da api
    let genres = [];
    // variavel de array vazio
    for (let i in item.genres) {
        // loop em items.genres
        genres.push(item.genres[i].name);
        // add no array, antes vazio, os generos da posição i com nome
    }

    let description = item.overview;
    if (description.length > 200) {
        description = description.substring(0, 200) + '...'
    }

    return (
        <section className="featured" style={{
            // estiliza o tamanho da imagem e coloca a imagem de 'banner' com tamanho original
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>
            {/* <div>{item.original_name}</div> */}
            <div className="featured--vertical">
                {/* tela preta 'esfumaçada' de cima para baixo */}
                <div className="featured-horizontal">
                    {/* tela preta 'esfumaçada' da direita para a esquerda  */}
                    <div className="featured--name">{item.original_name}</div>
                    {/* nome do item */}
                    <div className="featured--info">
                        {/* info do item */}
                        <div className="featured--points">{item.vote_average} pontos</div>
                        {/* pontos que o item tem */}
                        <div className="featured--year">{firstDate.getFullYear()}</div>
                        {/* ano do item. Pega pela variavel em cima */}
                        <div className="featured--seasons">{item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''}</div>
                        {/* numero de temporadas com condicional que se tiver diferente de 1, add 's' */}
                    </div>
                    <div className="featured--description">{description}</div>
                    {/* descrição do item */}
                    <div className="featured--buttons">
                        {/* botoes aqui dentro */}
                        <a href={`/watch/${item.id}`} className="featured--watchbutton">▶ Assistir </a>
                        {/* pega o id e mostra na info canto inferior esquerdo */}
                        <a href={`/list/add/${item.id}`} className="featured--mylistbutton">+ Minha Lista</a>
                        {/* pega o id e mostra na info canto inferior esquerdo */}
                    </div>
                    <div className="featured--genres"><strong>Gêneros: </strong>{genres.join(', ')}</div>
                    {/* genero do item. Pega da var em cima e juntao genero e se tiver masi que um, separa por virgula */}
                </div>
            </div>
        </section>
    );

}