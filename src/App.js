import React, { useEffect, useState } from 'react'; /*pega do modulo gigante (useEffect= função, useState=salva a lista de filmes)*/
import './App.css'
import Tmdb from './Tmdb' /*pega a info da função do Tmdb.js com as listas*/
import MovieRow from './components/MovieRow' /* importa aqui o componente feito no lugar da <div>{item.title}</div>*/
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header/Header';

function App() {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  // vai definir se o background fica ou nao preto usando o state
  const [blackHeader, setBlackHeader] = useState(false);
  // false fica sem black e true fica com black

  /*qnd carregar a pag, executa a função dentro*/
  useEffect(() => {
    const loadAll = async () => {
      // pegando a lista total
      let list = await Tmdb.getHomeList();
      console.log(list);
      setMovieList(list);

      // pegando o featured
      let originals = list.filter(i => i.slug === 'originals'); /*filtra tudo do slug originals*/
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1)); /*escolhe um filme aleatorio na quantidade de filmes */
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      setFeaturedData(chosenInfo);

      console.log(chosen);
      console.log(chosenInfo);

    }

    loadAll();
  }, []);

  // add um evento de monitoramento da propria pagina 
  useEffect(() => {
    const scrollListener = () => {
      // scroll vertical Y
      if (window.scrollY > 20) {
        // valor que começou a dar scroll
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }
    window.addEventListener('scroll', scrollListener)
    // quando houver scroll da pagina
    return () => {
      window.removeEventListener('scroll', scrollListener)
      // remove quando nao houver scroll da pagina
    }
  }, []);

  return (
    <div className="page">
      {/* Header
      Destaque
      As listas
      Rodapé basico */}

      <Header black={blackHeader} />
      {/* recebe o nome de black e dentro o blackHeader*/}

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {/* map para loop nesse array */}
        {movieList.map((item, key) => (
          // qnd utiliza map precisa do key={key} (boas praticas)
          // no componente MovieRow é colocada as listas(ul>li) de filmes do Tmdb.js 
          <MovieRow key={key} title={item.title} items={item.items} /> /* por causa do map(item, key) */
          // <div>
          //   {item.title}
          // </div>
        ))}
      </section>

      <footer>
        Feito com muito esforço<span role="img" aria-label="smile">😬</span>
        <br />Aula de Bonieky Lacerda B7WEB
        <br />Direitos de imagens para Netflix
        <br />Dados pegos do site Themoviedb.org
      </footer>

      {movieList.length <= 0 &&
        <div className="loading">
          <img src="https://media1.tenor.com/images/f6b11bd53411d94338117381cf9a9b9b/tenor.gif?itemid=18131525" alt="Carregando" />
        </div>}

    </div>
  );
}

export default App;