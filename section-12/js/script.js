(function () {
  const global = {
    currentPage: window.location.pathname,
    basePath: '/section-12/',
    get showsPath() {
      //Using get to auto-reference properties with 'this'
      return this.basePath + 'shows.html';
    },
    get movieDetailPath() {
      return this.basePath + 'movie-details.html';
    },

    get showDetailPath() {
      return this.basePath + 'tv-details.html';
    },
    get searchPath() {
      return this.basePath + 'search.html';
    },
  };

  const displayPopularMovies = async () => {
    const { results } = await fetchData('movie/popular', 'GET');

    results.forEach((movie) => {
      const div = document.createElement('div');
      div.setAttribute('class', 'card');
      div.innerHTML = `
        <a href="movie-details.html?${movie.id}">
          ${
            movie.poster_path
              ? `<img
            src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title} poster"
          />`
              : `<img
            src="images/no-image.jpg"
            class="card-img-top"
            alt="${movie.title} poster"
          />`
          }
        </a>
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${movie.release_date}</small>
          </p>
        </div>
      `;
      document.getElementById('popular-movies').appendChild(div);
    });
    console.log(results);
  };

  const fetchData = async (endpoint, httpVerb) => {
    const API_KEY = '4e5d6b9c93a4351d3a6125dc38e3a5a6';
    const API_URL = 'https://api.themoviedb.org/3/';
    const res = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}`, {
      method: `${httpVerb}`,
    });
    const data = await res.json();
    return data;
  };

  const highlightActiveLink = () => {
    const headerLinks = document.querySelectorAll('.nav-link');
    headerLinks.forEach((link) => {
      const linkHref = link.getAttribute('href');
      if (linkHref === global.currentPage) {
        link.classList.toggle('active');
      }
    });
  };

  const init = () => {
    //Router - exec diffetent js in each page
    switch (global.currentPage) {
      case global.basePath:
      case '/index.html':
        console.log('basepath');
        displayPopularMovies();
        break;

      case global.showsPath:
        console.log('shows');
        break;

      case global.showDetailPath:
        console.log('tv-det');
        break;

      case global.movieDetailPath:
        console.log('movie-det');
        break;

      case global.searchPath:
        console.log('search');
        break;
    }

    highlightActiveLink();
  };

  document.addEventListener('DOMContentLoaded', init);
})();
