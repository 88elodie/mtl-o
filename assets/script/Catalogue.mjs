export default class Catalogue{
    #aFilms
    #destination;
    #aData;

    constructor(destination){
        this.#destination = destination;
    }

    setFilms(data){
        this.#aFilms = data;

    }

    getFilms(){
        return this.#aFilms;
    }

    setData(data){
        this.#aData = data;
    }

    getData(){
        return this.#aData;
    }

    rendu(){
        let chaineHtml = "";
        this.#aFilms.forEach(unFilm=> {
            chaineHtml += `<article class="carte">
                                <header>
                                    <h2>${unFilm.title} (${unFilm.release_date})</h2>
                                    <h3>${unFilm.original_title}</h3>
                                </header>
                                <img src="${unFilm.image}">
                                <div class="contenu">
                                    <p>${unFilm.description}</p>
                                </div>
                                <footer class="action">plus d'info >>></footer>
                                <div class="modal invisible">
                                <div class="modal-content">
                                <span class="close">&times;</span>
        <header>
            <h2>${unFilm.title} (${unFilm.release_date})</h2>
            <h3>${unFilm.original_title}</h3>
            <h3>${unFilm.original_title_romanised}</h3>
        </header>
        <img src="${unFilm.image}">
            <p>${unFilm.description}</p>
            <p><b>note du film :</b> ${unFilm.rt_score}</p>
            <p><b>directeur :</b> ${unFilm.director}</p>
            <p><b>producteur :</b> ${unFilm.producer}</p>
            <p><b>durée du film :</b> ${unFilm.running_time} minutes</p>
            <img src="${unFilm.movie_banner}">
            <a href="${unFilm.url}">encore plus d'info</a>
        </div>
    </div>
                                
                            </article>`;

        });
        this.#destination.innerHTML = chaineHtml;
        
    }

    
}