export default class Movie{
    constructor(data){
        Object.assign(this, data)
    }

    save(){
        JSON.stringify(localStorage.setItem(`${this.title}`,`${this.html}`)) 
    }

}