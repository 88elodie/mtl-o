export default class Recherche{
    #aFilms;

    getFilms(){
        return this.#aFilms;
    }

    appliquerRecherche(recherche, films){
        recherche = recherche.toLowerCase();
        const motsRecherche = recherche.split(" ");
        let res = [];
        films.forEach((unElement)=>{
            let texte = unElement.title+" "+unElement.description+" "+unElement.release_date;
            texte = texte.toLowerCase();
            let match = true;
            motsRecherche.forEach((mot)=>{
                if(!texte.includes(mot)){
                    match = false;
                }
            })
            if(match){
                res.push(unElement);
            }
            
        })
        this.#aFilms = res;
        return res;
    }
}


// films.forEach((unElement)=>{
//     let texte = unElement.title.concat(" ", unElement.description);
//     texte = texte.toLowerCase();
//     //texte = texte.split(" ");
//     if(texte.includes(recherche)){
//         res.push(unElement);
//     }
// })