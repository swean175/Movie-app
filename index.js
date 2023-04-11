import Movie  from './class.js'

const inp = document.querySelector('input')
const searchBtn = document.getElementById('search-btn')
const bgIcon = document.querySelector(".background")
let searchHistory = []
let searchDisplay = []
let titleIndex =[]
let film = ''
let searchedFilm = {}
let watchList = JSON.parse(localStorage.getItem("watchlist")) //  -------------------getting watchlist data from local storage
if (watchList === null){
    watchList = []
}


searchBtn.addEventListener('click', () => {    //------------------------getting data from API and running searchResult()
fetch (`https://www.omdbapi.com/?t=${inp.value}&page=2&apikey=f882b954&`)
.then (res => res.json())
.then (data => searchResult(data.Title,data.Year,data.imdbRating,data.Runtime,data.Genre,data.Plot,data.Poster))
.catch (noResult())
bgIcon.classList.add('hide')
})

function noResult(){
    film = ''
}

function searchResult(title,year,rate,min,genre,describsion,poster){ 

film = `<section><img class="poster" src="${poster}" alt="poster ${title}"><div class="spec">
<div class="top"><h3>${title}</h3><h5>⭐ ${rate} </h5><h5> ${year}</h5></div>
<div class="bottom"><h5>${min}</h5><h5>  ${genre} </h5> <div class="add-section"><h5>Watchlist</h5><button type="button" id="${title}Btn" class="add" data-add="${title}">❌</button></div> </div></div> 
<article class="describsion">${describsion}<hr></article></section>`
//-------------------Store data in string to display it as html

searchedFilm = {title: title, // --------------- object witch searched title and string(html) data
    html: film}

titleIndex.unshift(searchedFilm.title)  //------------ ads title to title index

searchHistory.unshift(searchedFilm) //------------ ads object to search history

searchDisplay.unshift(searchedFilm.html) //------------ ads html to search Display

render()
}


function render(){
    document.getElementById('result').innerHTML = searchDisplay
}


document.addEventListener('click', (e)=>{  //-------------------- click watchlist button event

    if ( e.target.attributes[0].value === "button"){
        if (searchedFilm.title !== undefined){
            let ind = titleIndex.indexOf(`${e.target.dataset.add}`)
     
             watchList.unshift(e.target.dataset.add)
       localStorage.setItem( "watchlist",`${JSON.stringify(watchList)}`) //  -------------  if event is equal type "button" ads this title to watchlist and saves in local storage
       let store = new Movie(searchHistory[ind])
       console.log(store)
    store.save()} // ----------------  saves string (html) into local storage using class property function exported from class.js
}})

