export default class Recherche{
    #aFilms;

    getFilms(){
        return this.#aFilms;
    }

    appliquerRecherche(recherche, films){
        //convertir en lowercase pour pouvoir connecter les données ensemble
        recherche = recherche.toLowerCase();
        //mettre tous les mots de la recherche dans un array
        const motsRecherche = recherche.split(" ");
        let res = [];
        //aller a travers tous les films, en tenant compte du titre, description et annee de sortie. on les combine en une longue 'phrase' et ensuite je verifie si elle contient TOUS les mots de ma recherche et je l'ajoute a l'array de mon resultat si oui.
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
        //je sauvegrade la donnée dans une variable accessible a l'exterieur de la fonction, pour m'aider a combiner avec les filtres et la tri
        this.#aFilms = res;
        return res;
    }
}