(function () {
  const global = {
    currentPage: window.location.pathname,
    basePath: '/section-12/',
    API_KEY: '4e5d6b9c93a4351d3a6125dc38e3a5a6',
    API_URL: 'https://api.themoviedb.org/3/',

    search: {
      type: '',
      term: '',
      page: 1,
      totalPages: 1,
      totalResults: 0,
    },

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

  //Content
  const displayPopularMovies = async () => {
    const { results } = await fetchData('movie/popular', 'GET');

    results.forEach((movie) => {
      const div = document.createElement('div');
      div.setAttribute('class', 'card');
      div.innerHTML = `
        <a href="movie-details.html?${movie.id}">
          ${imageHandler(movie)}
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
  };

  const displayPopularShows = async () => {
    const { results } = await fetchData('tv/popular', 'GET');

    results.forEach((show) => {
      const div = document.createElement('div');
      div.setAttribute('class', 'card');
      div.innerHTML = `
        <a href="tv-details.html?${show.id}">
        ${imageHandler(show)}
        </a>
        <div class="card-body">
          <h5 class="card-title">${show.name}</h5>
          <p class="card-text">
            <small class="text-muted">Air Date: ${show.first_air_date}</small>
          </p>
        </div>
      `;
      document.getElementById('popular-shows').appendChild(div);
    });
  };

  const displayMovieDetails = async () => {
    const movieId = window.location.search.split('=')[1];
    const movieDetails = await fetchData(`movie/${movieId}`, 'GET');

    displayBackdropImage('movie', movieDetails.backdrop_path);

    const div = document.createElement('div');
    const template = `
      <div class="details-top">
        <div>
        ${imageHandler(movieDetails)}
        </div>
        <div>
          <h2>${movieDetails.title}</h2>
          <p>
            <i class="fas fa-star text-primary"></i>
            ${movieDetails.vote_average.toFixed(1)} / 10
          </p>
          <p class="text-muted">Release Date: ${movieDetails.release_date}</p>
          <p>
            ${movieDetails.overview}
          </p>
          <h5>Genres</h5>
          <ul class="list-group">
            ${movieDetails.genres
              .map((genre) => `<li>${genre.name}</li>`)
              .join('')}
          </ul>
          <a href="${
            movieDetails.homepage
          }" target="_blank" class="btn">Visit Movie Homepage</a>
        </div>
      </div>
      <div class="details-bottom">
        <h2>Movie Info</h2>
        <ul>
          <li><span class="text-secondary">Budget:</span> $${addCommasToNumbers(
            movieDetails.budget
          )}</li>
          <li><span class="text-secondary">Revenue:</span> $${addCommasToNumbers(
            movieDetails.revenue
          )}</li>
          <li><span class="text-secondary">Runtime:</span> ${
            movieDetails.runtime
          }</li>
          <li><span class="text-secondary">Status:</span> ${
            movieDetails.status
          }</li>
        </ul>
        <h4>Production Companies</h4>
        <div class="list-group">${movieDetails.production_companies
          .map((company) => `<span>${company.name}</span>`)
          .join(', ')}</div>
      </div>`;
    div.innerHTML = template;
    document.querySelector('#movie-details').append(div);
  };

  const displayShowDetails = async () => {
    const showId = window.location.search.slice(1);
    const showDetails = await fetchData(`tv/${showId}`, 'GET');

    displayBackdropImage('show', showDetails.backdrop_path);

    const div = document.createElement('div');
    const template = `
      <div class="details-top">
        <div>
        ${imageHandler(showDetails)}
        </div>
        <div>
          <h2>${showDetails.name}</h2>
          <p>
            <i class="fas fa-star text-primary"></i>
            ${showDetails.vote_average.toFixed(1)} / 10
          </p>
          <p class="text-muted">Last Air  Date: ${
            showDetails.first_air_date
          }</p>
            ${showDetails.overview}
          </p>
          <h5>Genres</h5>
          <ul class="list-group">
            ${showDetails.genres
              .map((genre) => `<li>${genre.name}</li>`)
              .join('')}
          </ul>
          <a href="${
            showDetails.homepage
          }" target="_blank" class="btn">Visit Movie Homepage</a>
        </div>
      </div>
      <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${
              showDetails.number_of_episodes
            }</li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> ${
                showDetails.last_episode_to_air.name
              }
            </li>
            <li><span class="text-secondary">Status:</span> ${
              showDetails.status
            }</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${showDetails.production_companies
            .map((company) => `<span>${company.name}</span>`)
            .join(', ')}</div>
        </div>`;
    div.innerHTML = template;
    document.querySelector('#show-details').append(div);
  };

  const displayBackdropImage = (type, backdropPath) => {
    const overlayDiv = document.createElement('div');
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backdropPath})`;
    overlayDiv.classList.add('backdrop-container');

    if (type === 'movie') {
      document.querySelector('#movie-details').appendChild(overlayDiv);
    } else {
      document.querySelector('#show-details').appendChild(overlayDiv);
    }
  };

  const search = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    global.search.term = urlParams.get('search-term');
    global.search.type = urlParams.get('type');

    if (global.search.term !== '' && global.search.term !== null) {
      const { results, page, total_pages, total_results } =
        await searchFetchData();

      global.search.page = page;
      global.search.totalPages = total_pages;
      global.search.totalResults = total_results;

      if (results.length === 0) {
        showAlert(`${global.search.term} not found.`, 'error');
        return;
      } else {
        displaySearchResults(results);
      }

      document.querySelector('#search-term').value = '';
    } else {
      showAlert('Please enter some text.', 'error');
    }
  };

  const displaySearchResults = async (results) => {
    document.querySelector('#search-results').innerHTML = '';
    document.querySelector('#search-results-heading').innerHTML = '';
    document.querySelector('#pagination').innerHTML = '';

    results.forEach((result) => {
      const div = document.createElement('div');
      let template = '';

      if (global.search.type === 'movie') {
        template = `
          <a href="movie-details.html?id=${result.id}">
            ${imageHandler(result)}
          </a>
          <div class="card-body">
            <h5 class="card-title">${result.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${result.release_date}</small>
            </p>
          </div>
      `;
      } else {
        template = `
          <a href="tv-details.html?id=${result.id}">
            ${imageHandler(result)}
          </a>
          <div class="card-body">
            <h5 class="card-title">${result.name}</h5>
            <p class="card-text">
              <small class="text-muted">First Air Date: ${
                result.first_air_date
              }</small>
            </p>
          </div>
        `;
      }

      div.setAttribute('class', 'card');
      div.innerHTML = template;
      document.querySelector('#seach-results-heading');
      document.querySelector('#search-results').appendChild(div);
      document.querySelector('#search-results-heading').innerHTML = `<h2>${
        results.length * global.search.page
      } of ${global.search.totalResults} </h2>`;
    });
    displayPagination();
  };

  const displayPagination = () => {
    const div = document.createElement('div');
    div.classList.add('pagination');
    div.innerHTML = `
      <button class="btn btn-primary" id="prev">Prev</button>
      <button class="btn btn-primary" id="next">Next</button>
      <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>`;
    document.querySelector('#pagination').appendChild(div);

    if (global.search.page === 1) {
      document.querySelector('#prev').disabled = true;
    }
    if (global.search.page === global.search.totalPages) {
      document.querySelector('#next').disabled = true;
    }

    document.querySelector('#next').addEventListener('click', async () => {
      global.search.page++;
      const { results: res, total_pages } = await searchFetchData();

      displaySearchResults(res);
    });

    document.querySelector('#prev').addEventListener('click', async () => {
      global.search.page--;
      const { results: res, total_pages } = await searchFetchData();

      displaySearchResults(res);
    });
  };

  //Utilities
  const fetchData = async (endpoint, httpVerb) => {
    toggleSpinner();

    const API_KEY = global.API_KEY;
    const API_URL = global.API_URL;
    const res = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}`, {
      method: `${httpVerb}`,
    });
    const data = await res.json();

    toggleSpinner();
    return data;
  };

  const searchFetchData = async () => {
    toggleSpinner();

    const res = await fetch(
      `${global.API_URL}search/${global.search.type}?api_key=${global.API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`
    );
    const data = await res.json();

    toggleSpinner();
    return data;
  };

  const toggleSpinner = () => {
    document.querySelector('.spinner').classList.toggle('show');
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

  const addCommasToNumbers = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const displaySwiper = async () => {
    const { results: actualMovies } = await fetchData(
      'movie/now_playing',
      'GET'
    );

    actualMovies.forEach((actualMovie) => {
      const div = document.createElement('div');
      div.classList.add('swiper-slide');

      div.innerHTML = `
        <div class="swiper-slide">
          <a href="movie-details.html?id=${actualMovie.id}">
            ${imageHandler(actualMovie)}
          </a>
          <h4 class="swiper-rating">
            <i class="fas fa-star text-secondary"></i> ${actualMovie.vote_average.toFixed(
              1
            )} / 10
          </h4>
        </div>`;

      document.querySelector('.swiper-wrapper').appendChild(div);
    });

    initSwiper();
  };

  const imageHandler = (mediaItem) => {
    let imgTemplate;
    if (mediaItem.poster_path) {
      imgTemplate = `<img
        src="https://image.tmdb.org/t/p/w500/${mediaItem.poster_path}"
        class="card-img-top"
        alt="${mediaItem.name ? mediaItem.name : mediaItem.title} poster"
      />`;
    } else {
      imgTemplate = `<img
        src="images/no-image.jpg"
        class="card-img-top"
        alt="${mediaItem.name ? mediaItem.name : mediaItem.title} poster"
      />`;
    }
    return imgTemplate;
  };

  const showAlert = (msg, className) => {
    const alertEl = document.createElement('div');
    alertEl.classList.add('alert', className);
    alertEl.appendChild(document.createTextNode(msg));
    document.querySelector('#alert').appendChild(alertEl);

    setTimeout(() => {
      alertEl.remove();
    }, 4000);
  };

  //3rd-party
  const initSwiper = () => {
    const swiper = new Swiper('.swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      freeMode: true,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      breakpoints: {
        500: {
          slidesPerView: 2,
        },
        700: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
      },
    });
  };

  //Router
  const init = () => {
    //Router - exec diffetent js in each page
    switch (global.currentPage) {
      case global.basePath:
      case '/index.html':
        displaySwiper();
        displayPopularMovies();
        break;

      case global.showsPath:
        displayPopularShows();
        break;

      case global.showDetailPath:
        displayShowDetails();
        break;

      case global.movieDetailPath:
        displayMovieDetails();
        break;

      case global.searchPath:
        search();
        break;
    }

    highlightActiveLink();
  };

  document.addEventListener('DOMContentLoaded', init);
})();
