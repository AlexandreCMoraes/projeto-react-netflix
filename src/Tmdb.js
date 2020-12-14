/* eslint-disable no-fallthrough */
/* eslint-disable import/no-anonymous-default-export */
const API_KEY = 'ec04f6c63b7b688f8049c7fd14fb545a'
const API_BASE = 'https://api.themoviedb.org/3'

/*
- originais da netflx
- recomendados
- em alta(top rated)
- ação
- comédia
- terror
- romance
- documentarios
*/

// FUNÇÃO PARA PEGAR AS INFOS DA URL E TRAZER O RESULTADO
const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`); /*requisição para serviço externo (esperar a resposta)*/
    const json = await req.json(); /*qnd receber a resposta vai para o próximo*/
    return json; /*retorna*/
}

// LISTA PARA EXIBIR NO SITE


export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originais do Netflix',
                items: await basicFetch(`/discover/tv?api_key=${API_KEY}&with_network=213&language=pt-BR`) /*filtra a Netflix(pega seriados originais)*/
            },
            {
                slug: 'trending',
                title: 'Recomendados para Você',
                items: await basicFetch(`/trending/all/week?api_key=${API_KEY}&language=pt-BR`) /*filmes da semana em destaque*/
            },
            {
                slug: 'toprated',
                title: 'Em Alta',
                items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`) /* filmes em alta*/
            },
            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`) /* pega generos dos filmes*/
            },
            {
                slug: 'Comedy',
                title: 'Comédia',
                items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)/* pega generos dos filmes*/
            },
            {
                slug: 'Horror',
                title: 'Horror',
                items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`) /* pega generos dos filmes*/
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`) /* pega generos dos filmes*/
            },
            {
                slug: 'documentary',
                title: 'Documentários',
                items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`) /* pega generos dos filmes*/
            }
        ];
    },
    getMovieInfo: async (movieId, type) => {
        let info = {};

        if (movieId) {
            switch (type) {
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                    break;
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                    break;
                default:
                    info = null;
                    break;
            }
        }
        return info;
    }
}

