let updatedList = []
const get = document.getElementById('get')
let html = ''
let watchList ={}
watchList = JSON.parse(localStorage.getItem("watchlist")) //-----------gets watchlist data from local storage

const checkDupliWatchList = watchList.reduce((accumulator, currentValue) => {
  if (!accumulator.includes(currentValue)) {
    return [...accumulator, currentValue];  //------------------------------------ removes duplicated items and puts it back to watchlist array
  }
  return accumulator;
}, [])

watchList = checkDupliWatchList

       
      for (let i=0; i < watchList.length; i++ ){  //      ----------------------  adds html string for all items from watchlist
       updatedList.unshift(watchList[i])  //  ------------------- updates items from watchlist
    html += `<div class="cell"><button class="del" data-del="${watchList[i]}">remove</button>${localStorage.getItem(watchList[i])}</div>`
      }

    document.addEventListener('click',(e) => {
        if (e.target.attributes[0].value === "del"){
        updatedList = updatedList.filter(item => item !== e.target.dataset.del)  // ----------------------- if button remove clicked, removes chossen title from updatedList
        localStorage.removeItem(`${e.target.dataset.del}`)  // ----------- removes html string of chossen title and entire watchlist
        localStorage.removeItem("watchlist")
        localStorage.setItem( "watchlist",`${JSON.stringify(updatedList)}`)  //  ---------------  saves updatedList as new watchlist and refresh
        window.location.reload()
        }
    })
    get.innerHTML = html