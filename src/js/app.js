$(function () {
  getAllTrending();

  getTrendingMovies();
  getNowPlayingMovies();
  getUpcomingMovies();

  getTrendingTvs();
  getTopRatedTvs();
  getPopularTvs();
});

function getAllTrending() {
  $.ajax({
    url: "https://api.themoviedb.org/3/trending/all/day?language=en-US",
    type: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjcyMjVjMWQ1ZDNhZThhOTc3ZjEyMjVhM2QxMjVlMiIsIm5iZiI6MTc1NDg1NzA2MS4yODEsInN1YiI6IjY4OThmZTY1ZTcxMjgyMTg3MjhlYWVmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2yiwM-1ckJWpClBnBSihiYnWjz3wpmoGztIywSdrivk",
    },
    success: function (res) {
      const data = res.results;
      buildAllTrending(data);
    },
    error: function (err) {
      console.error(err);
    },
  });
}

function buildAllTrending(arr) {
  const allTrendCon = $("#all-trending");
  const mainImg = $(".trend-img");
  const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

  let index = 0;
  const trendTitle = $("<h1></h1>");
  trendTitle.addClass("trend-title");
  allTrendCon.append(trendTitle);

  mainImg.attr("src", IMAGE_BASE + arr[index].backdrop_path);

  const firstTitleName = arr[index].title || arr[index].name;
  trendTitle.text(firstTitleName);
  index++;

  setInterval(() => {
    const ele = arr[index];
    console.log(ele);
    console.log(ele.backdrop_path);
    console.log(ele.name);

    mainImg.attr("src", IMAGE_BASE + ele.backdrop_path);
    const titleName = ele.title || ele.name;
    trendTitle.text(titleName);

    index = (index + 1) % arr.length;
  }, 5000);
}

function getTrendingMovies() {
  $.ajax({
    url: "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    type: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjcyMjVjMWQ1ZDNhZThhOTc3ZjEyMjVhM2QxMjVlMiIsIm5iZiI6MTc1NDg1NzA2MS4yODEsInN1YiI6IjY4OThmZTY1ZTcxMjgyMTg3MjhlYWVmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2yiwM-1ckJWpClBnBSihiYnWjz3wpmoGztIywSdrivk",
    },
    success: function (res) {
      const data = res.results;
      console.log(data);
      buildMovieContents(data, "trending-movies");
    },
    error: function (err) {
      console.error(err);
    },
  });
}

function getNowPlayingMovies() {
  $.ajax({
    url: "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    type: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjcyMjVjMWQ1ZDNhZThhOTc3ZjEyMjVhM2QxMjVlMiIsIm5iZiI6MTc1NDg1NzA2MS4yODEsInN1YiI6IjY4OThmZTY1ZTcxMjgyMTg3MjhlYWVmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2yiwM-1ckJWpClBnBSihiYnWjz3wpmoGztIywSdrivk",
    },
    success: function (res) {
      const data = res.results;
      console.log(data);
      buildMovieContents(data, "now-playing");
    },
    error: function (err) {
      console.error(err);
    },
  });
}

function getUpcomingMovies() {
  $.ajax({
    url: "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
    type: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjcyMjVjMWQ1ZDNhZThhOTc3ZjEyMjVhM2QxMjVlMiIsIm5iZiI6MTc1NDg1NzA2MS4yODEsInN1YiI6IjY4OThmZTY1ZTcxMjgyMTg3MjhlYWVmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2yiwM-1ckJWpClBnBSihiYnWjz3wpmoGztIywSdrivk",
    },
    success: function (res) {
      const data = res.results;
      console.log(data);
      buildMovieContents(data, "upcoming");
    },
    error: function (err) {
      console.error(err);
    },
  });
}

function getTrendingTvs() {
  $.ajax({
    url: "https://api.themoviedb.org/3/trending/tv/day?language=en-US",
    type: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjcyMjVjMWQ1ZDNhZThhOTc3ZjEyMjVhM2QxMjVlMiIsIm5iZiI6MTc1NDg1NzA2MS4yODEsInN1YiI6IjY4OThmZTY1ZTcxMjgyMTg3MjhlYWVmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2yiwM-1ckJWpClBnBSihiYnWjz3wpmoGztIywSdrivk",
    },
    success: function (res) {
      const data = res.results;
      console.log(data);
      buildTvContents(data, "trending-tvs");
    },
    error: function (err) {
      console.error(err);
    },
  });
}

function getTopRatedTvs() {
  $.ajax({
    url: "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
    type: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjcyMjVjMWQ1ZDNhZThhOTc3ZjEyMjVhM2QxMjVlMiIsIm5iZiI6MTc1NDg1NzA2MS4yODEsInN1YiI6IjY4OThmZTY1ZTcxMjgyMTg3MjhlYWVmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2yiwM-1ckJWpClBnBSihiYnWjz3wpmoGztIywSdrivk",
    },
    success: function (res) {
      const data = res.results;
      console.log(data);
      buildTvContents(data, "top-rated");
    },
    error: function (err) {
      console.error(err);
    },
  });
}

function getPopularTvs() {
  $.ajax({
    url: "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
    type: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjcyMjVjMWQ1ZDNhZThhOTc3ZjEyMjVhM2QxMjVlMiIsIm5iZiI6MTc1NDg1NzA2MS4yODEsInN1YiI6IjY4OThmZTY1ZTcxMjgyMTg3MjhlYWVmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2yiwM-1ckJWpClBnBSihiYnWjz3wpmoGztIywSdrivk",
    },
    success: function (res) {
      const data = res.results;
      console.log(data);
      buildTvContents(data, "popular");
    },
    error: function (err) {
      console.error(err);
    },
  });
}

// Modal Effect
$(document).on("click", ".img-container-movie", function () {
  const imgContainer = $(this);
  const path = imgContainer.data("path");
  const title = imgContainer.data("title");
  const overview = imgContainer.data("overview");
  const genre = imgContainer.data("genre_names");
  const rating = imgContainer.data("rating");
  const release = imgContainer.data("release");
  const runtime = imgContainer.data("runtime");

  const modalContent = $(".modal-content");

  let modalHtml = `<div class='img-con'><img src=${path}></div> <h1>${title}</h1> 
  <div class="modal-info">
   <h3>${overview}</h3> 
   <p>Genres: ${genre}</p>
   <p>Rating: ${rating}</p>
   <p>Runtime: ${runtime}</p>
   <p>Release Date: ${release}</p>
  </div>`;
  modalContent.html(modalHtml);
  $(".modal").show();

  const overlay = $("<div class='overlay'> </div>");
  $("body").append(overlay);

  $(".overlay").on("click", function () {
    $(".modal").hide();
    $(".overlay").hide();
  });
});

$(document).on("click", ".img-container-tv", function () {
  const imgContainer = $(this);
  const path = imgContainer.data("path");
  const title = imgContainer.data("title");
  const overview = imgContainer.data("overview");
  const genre = imgContainer.data("genre_names");
  const rating = imgContainer.data("rating");
  const release = imgContainer.data("release");
  const ep = imgContainer.data("ep");

  const modalContent = $(".modal-content");

  let modalHtml = `<div class='img-con'><img src=${path}></div> <h1>${title}</h1> 
  <div class="modal-info">
   <h3>${overview}</h3> 
   <p>Genres: ${genre}</p>
   <p>Rating: ${rating}</p>
   <p>Episode: ${ep}</p>
   <p>Releases Date: ${release}</p>
  </div>`;
  modalContent.html(modalHtml);
  $(".modal").show();

  const overlay = $("<div class='overlay'> </div>");
  $("body").append(overlay);

  $(".overlay").on("click", function () {
    $(".modal").hide();
    $(".overlay").hide();
  });
});

function buildMovieContents(arr, section) {
  const trendingCon = $(`.${section}`);
  const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

  arr.forEach((ele) => {
    const imgTrendDiv = $(`<div class='img-container-movie' ></div>`);

    //Save data
    imgTrendDiv.data("id", ele.id);
    imgTrendDiv.data("path", IMAGE_BASE + ele.backdrop_path);
    imgTrendDiv.data("title", ele.title);
    imgTrendDiv.data("overview", ele.overview);
    //imgTrendDiv.data("genre", ele.genre_ids);
    imgTrendDiv.data("release", ele.release_date);
    imgTrendDiv.data("rating", ele.vote_average);

    const imgTrend = $("<img class='imgs-trend'>");
    imgTrend.attr("src", IMAGE_BASE + ele.poster_path);
    imgTrendDiv.append(imgTrend);

    // getRuntime
    getDetailsMovies(ele.id, function (runtime) {
      // create info
      const moreInfo = $("<div class='more-info'></div>");
      const infoContent = $(
        `<div class='info-content'> <i class="fa-solid fa-star"></i> <p>${Number(
          ele.vote_average.toFixed(1),
        )}</p></div> <div class='info-content'><i class="fa-solid fa-tv"></i> <p>${runtime}mins</p></div>`,
      );

      imgTrendDiv.data("runtime", runtime);

      moreInfo.append(infoContent);
      imgTrendDiv.append(moreInfo);

      trendingCon.append(imgTrendDiv);
    });

    getGenreMovieList(ele.genre_ids, function (res) {
      const genreNames = [];
      ele.genre_ids.forEach((genre_id) => {
        res.forEach((ele) => {
          if (genre_id === ele.id) {
            genreNames.push(ele.name);
          }
        });
      });

      imgTrendDiv.data("genre_names", genreNames);
      console.log(`genreNames: ${genreNames}`);
    });
  });
}

function buildTvContents(arr, section) {
  const trendingCon = $(`.${section}`);
  const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

  arr.forEach((ele) => {
    const imgTrendDiv = $("<div class='img-container-tv'></div>");

    //Save Data
    imgTrendDiv.data("id", ele.id);
    imgTrendDiv.data("path", IMAGE_BASE + ele.backdrop_path);
    imgTrendDiv.data("title", ele.name);
    imgTrendDiv.data("overview", ele.overview);
    imgTrendDiv.data("genre", ele.genre_ids);
    imgTrendDiv.data("release", ele.first_air_date);
    imgTrendDiv.data("rating", ele.vote_average);

    const imgTrend = $("<img>");
    imgTrend.addClass("imgs-trend");
    imgTrend.attr("src", IMAGE_BASE + ele.poster_path);
    imgTrendDiv.append(imgTrend);

    //get Episode Num
    getDetailsTvs(ele.id, function (epiNum) {
      // create info
      const moreInfo = $("<div class='more-info'></div>");
      const infoContent = $(
        `<div class='info-content'> <i class="fa-solid fa-star"></i> <p>${Number(
          ele.vote_average.toFixed(1),
        )}</p></div> <div class='info-content'> <i class="fa-solid fa-video"></i> <p>Ep. ${epiNum} </p></div>`,
      );

      imgTrendDiv.data("ep", epiNum);

      moreInfo.append(infoContent);
      imgTrendDiv.append(moreInfo);
      trendingCon.append(imgTrendDiv);
    });

    getGenreMovieList(ele.genre_ids, function (res) {
      const genreNames = [];
      ele.genre_ids.forEach((genre_id) => {
        res.forEach((ele) => {
          if (genre_id === ele.id) {
            genreNames.push(ele.name);
          }
        });
      });

      imgTrendDiv.data("genre_names", genreNames);
      console.log(`genreNames: ${genreNames}`);
    });
  });
}

function getDetailsMovies(id, callback) {
  $.ajax({
    url: `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    type: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjcyMjVjMWQ1ZDNhZThhOTc3ZjEyMjVhM2QxMjVlMiIsIm5iZiI6MTc1NDg1NzA2MS4yODEsInN1YiI6IjY4OThmZTY1ZTcxMjgyMTg3MjhlYWVmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2yiwM-1ckJWpClBnBSihiYnWjz3wpmoGztIywSdrivk",
    },
    success: function (res) {
      callback(res.runtime);
    },
    error: function (err) {
      console.error(err);
    },
  });
}

function getDetailsTvs(id, callback) {
  $.ajax({
    url: `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
    type: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjcyMjVjMWQ1ZDNhZThhOTc3ZjEyMjVhM2QxMjVlMiIsIm5iZiI6MTc1NDg1NzA2MS4yODEsInN1YiI6IjY4OThmZTY1ZTcxMjgyMTg3MjhlYWVmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2yiwM-1ckJWpClBnBSihiYnWjz3wpmoGztIywSdrivk",
    },
    success: function (res) {
      const epiNum = res.last_episode_to_air.episode_number;
      callback(epiNum);
    },
    error: function (err) {
      console.error(err);
    },
  });
}

function getGenreMovieList(id, callback) {
  $.ajax({
    url: `https://api.themoviedb.org/3/genre/movie/list?language=en`,
    type: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjcyMjVjMWQ1ZDNhZThhOTc3ZjEyMjVhM2QxMjVlMiIsIm5iZiI6MTc1NDg1NzA2MS4yODEsInN1YiI6IjY4OThmZTY1ZTcxMjgyMTg3MjhlYWVmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2yiwM-1ckJWpClBnBSihiYnWjz3wpmoGztIywSdrivk",
    },
    success: function (res) {
      callback(res.genres);
    },
    error: function (err) {
      console.error(err);
    },
  });
}

function getGenreTvList(id, callback) {
  $.ajax({
    url: `https://api.themoviedb.org/3/genre/tv/list?language=en`,
    type: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjcyMjVjMWQ1ZDNhZThhOTc3ZjEyMjVhM2QxMjVlMiIsIm5iZiI6MTc1NDg1NzA2MS4yODEsInN1YiI6IjY4OThmZTY1ZTcxMjgyMTg3MjhlYWVmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2yiwM-1ckJWpClBnBSihiYnWjz3wpmoGztIywSdrivk",
    },
    success: function (res) {
      callback(res.genres);
    },
    error: function (err) {
      console.error(err);
    },
  });
}
