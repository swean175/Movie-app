import Movie  from './class.js'

const inp = document.querySelector('input')
const searchBtn = document.getElementById('search')
let searchHistory = []
let film = ''
let searchedFilm = {}
let watchList = JSON.parse(localStorage.getItem("watchlist")) //  -------------------getting watchlist data from local storage
if (watchList === null){
    watchList = []
}


searchBtn.addEventListener('click', () => {    //------------------------getting data from API and running searchResult()
fetch (`http://www.omdbapi.com/?t=${inp.value}&page=2&apikey=f882b954&`)
.then (res => res.json())
.then (data => searchResult(data.Title,data.Year,data.imdbRating,data.Runtime,data.Genre,data.Plot,data.Poster))
})

function searchResult(title,year,rate,min,genre,describsion,poster){ 

film = `<section><img class="poster" src="${poster}" alt="poster ${title}"><div class="spec">
<div class="top"><h3>${title}</h3><h4>⭐ ${rate} </h4><h4> ${year}</h4></div>
<div class="bottom"><h4>${min}  ${genre} </h4> <div class="add-section"><button type="button" id="${title}Btn" class="add" data-add="${title}">❌</button></div> </div></div> 
<article class="describsion">${describsion}</article></section>`
//-------------------Store data in string to display it as html

searchedFilm = {title: title, // --------------- object witch searched title and string(html) data
    html: film}

searchHistory.unshift(searchedFilm.html) //------------ ads object to search history
render()
}

function render(){
    document.getElementById('result').innerHTML = searchHistory
}

document.addEventListener('click', (e)=>{  //-------------------- click watchlist button event

    if ( e.target.attributes[0].value === "button"){
       watchList.unshift(searchedFilm.title)
       localStorage.setItem( "watchlist",`${JSON.stringify(watchList)}`) //  -------------  if event is equal type "button" ads this title to watchlist and saves in local storage
       let store = new Movie(searchedFilm)
    store.save()} // ----------------  saves string (html) into local storage using class property function exported from class.js
})

