//Initial References
let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");
let loader = document.getElementById("loading");

let displayLoading = () => {
  loader.classList.add("display");
    setTimeout(() => {
        loader.classList.remove("display");
    }, 5000);
}

let hideLoading = () => {
  loader.classList.remove("display");
}

let getMovie = () => {
  displayLoading();
  let movieName = movieNameRef.value;
  let url = `https://www.omdbapi.com/?t=${movieName}&apikey=11531d44&plot=full`;
  if (movieName.length <= 0) {
    hideLoading();
    result.innerHTML = `<h3 class="msg">Please enter a movie name</h3>`;
  }
  else {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        if (data.Response == "True") {
          result.innerHTML = `
            <div class="info">
                <img src=${data.Poster} class="poster">
                <div>
                    <h2>${data.Title}</h2>
                    <div class="rating">
                        <img src="./star-icon.svg">Ratings:
                        <h4>${data.imdbRating}</h4>
                        <img src="./imdb-3.png">Votes:
                        <h4>${data.imdbVotes}</h4>
                    </div>
                    <div class="details">
                        <span>${data.Rated}</span>
                        <span>${data.Year}</span>
                        <span>${data.Runtime}</span>
                    </div>
                    <div class="genre">
                        <div style="cursor: pointer;">${data.Genre.split(",").join("</div><div style='cursor: pointer;'>")}</div>
                    </div>
                </div>
            </div>
            <h3>Plot:</h3>
            <p>${data.Plot}</p>
            <h3>Cast:</h3>
            <p>${data.Actors}</p>
            <h3>Awards:</h3>
            <p>${data.Awards}</p>
            <h3>BoxOffice: <span style="font-size: 0.9em;
            font-weight: 300;
            line-height: 1.8em;
            text-align: justify;
            color: #a0a0a0;">${data.BoxOffice == null ?"Not Found":data.BoxOffice}</span></h3>
            <h3>Writer:</h3>
            <p>${data.Writer}</p>                 
        `;
        hideLoading();
       }
        else {
          hideLoading();
          result.innerHTML = `<h3 class='msg'>${data.Error}</h3>`;
        }
      })
      .catch(() => {
        hideLoading();
        result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
      });
  }
};
movieNameRef.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    getMovie();
  }
});

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);

