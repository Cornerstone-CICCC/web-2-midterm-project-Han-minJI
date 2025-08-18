$(function () {
  // Use search button
  $(".btn-search").on("click", function () {
    const searchCon = $(".search-container");
    const btnSearch = $(".btn-search");
    const searchBox = $(".search-box");

    if (searchCon.is(":visible")) {
      if (searchBox.val() === "") {
        searchCon.animate({ opacity: 0 }, 300, function () {
          searchCon.hide();
          btnSearch.show();
        });
      } else {
        const searchTitle = searchBox.val();
        console.log(searchTitle);

        $(".search-content").html("");
        searchContent(searchTitle);
        $(".main-content").hide();
      }
    } else {
      searchCon.show().css({ opacity: 0 }).animate({ opacity: 1 }, 300);
    }
  });

  // Press enter key to search
  $(".search-box").on("keyup", function (key) {
    const searchInput = $(".search-box");

    if (key.keyCode === 13) {
      console.log(`enter key press: ${searchInput.val()}`);
      $(".search-content").show();
      $(".search-content").html("");
      searchContent(searchInput.val());
      $(".main-content").hide();
    }
  });

  $(".btn-clear").on("click", function () {
    if ($(".search-box").val() !== "") {
      $(".search-box").val("");
    } else {
      $(".search-container").hide();
    }
    console.log("x 클릭");
  });

  $(".logo").on("click", function () {
    //$("main").show();
    $(".main-content").show();
    $(".search-content").html("");
    $(".search-box").val("");
    $(".search-container").hide();
    $(".about-container").hide();
  });

  // Header
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 50) {
      $("header").addClass("scrolled");
      $(".search-container").hide();
    } else {
      $("header").removeClass("scrolled");
    }
  });

  $("#about-btn").click(function () {
    console.log("btn-about 클릭");
    $(".main-content").hide();
    $(".search-content").hide();
    $(".about-container").show();
  });

  $(".btn-light").on("click", function () {
    $(".btn-dark").show();
    $(".btn-light").hide();
    $("body").addClass("light");
    $(".about-title").css("background-color", "#576ca8");
  });

  $(".btn-dark").on("click", function () {
    $(".btn-dark").hide();
    $(".btn-light").show();
    $("body").removeClass("light");
    $(".about-title").css("background-color", "#1b264f");
  });

  $("#movies-btn").click(function () {
    console.log("btn-movies 클릭");

    $(".about-container").hide();
    $(".main-content").show();
    $(".search-content").show();
  });

  $("#tvshows-btn").click(function () {
    console.log("btn-tvshows 클릭");

    $(".about-container").hide();
    $(".main-content").show();
    $(".search-content").show();
  });
});

function searchContent(enter) {
  $.ajax({
    url: `https://api.themoviedb.org/3/search/multi?query=${enter}&include_adult=false&language=en-US&page=1`,
    type: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjcyMjVjMWQ1ZDNhZThhOTc3ZjEyMjVhM2QxMjVlMiIsIm5iZiI6MTc1NDg1NzA2MS4yODEsInN1YiI6IjY4OThmZTY1ZTcxMjgyMTg3MjhlYWVmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2yiwM-1ckJWpClBnBSihiYnWjz3wpmoGztIywSdrivk",
    },
    success: function (res) {
      console.log(res.results);
      buildContents(res.results);
    },
    error: function (err) {
      console.error(err);
    },
  });
}

function buildContents(arr) {
  const searchCon = $(".search-content");
  const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

  if (arr.length === 0) {
    const searchResult = $("<p class='no-result'>No Results...</p>");
    searchCon.append(searchResult);
  } else {
    arr.forEach((ele) => {
      const searchConDiv = $(`<div class='img-container-search'></div>`);

      if (ele.poster_path === null) {
        return false;
      } else {
        const imgSearch = $(`<img class='imgs-search'>`);
        imgSearch.attr("src", IMAGE_BASE + ele.poster_path);
        searchConDiv.append(imgSearch);

        if (ele.media_type === "movie") {
          getDetailsMovies(ele.id, function (runtime) {
            // create info
            const moreInfo = $("<div class='more-info'></div>");
            const infoContent = $(
              `<div class='info-content'> <i class="fa-solid fa-star"></i> <p>${Number(
                ele.vote_average.toFixed(1),
              )}</p></div> <div class='info-content'><i class="fa-solid fa-tv"></i> <p>${runtime}mins</p></div>`,
            );

            moreInfo.append(infoContent);
            searchConDiv.append(moreInfo);

            searchCon.append(searchConDiv);
          });
        } else if (ele.media_type === "tv") {
          getDetailsTvs(ele.id, function (epiNum) {
            // create info
            const moreInfo = $("<div class='more-info'></div>");
            const infoContent = $(
              `<div class='info-content'> <i class="fa-solid fa-star"></i> <p>${Number(
                ele.vote_average.toFixed(1),
              )}</p></div> <div class='info-content'> <i class="fa-solid fa-video"></i> <p>Ep. ${epiNum} </p></div>`,
            );

            moreInfo.append(infoContent);
            searchConDiv.append(moreInfo);
            searchCon.append(searchConDiv);
          });
        }
      }
    });
  }
}
