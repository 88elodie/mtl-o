export default class Filtre{
    #aFiltres;

    constructor() {
        this.#aFiltres = "";
    }

    setFiltres(data){
        this.#aFiltres = data;
    }

    getFiltres(){
        return this.#aFiltres;
    }

    appliquerFiltre(data){
        //je cree res comme un set pour me permettre de creer un objet qui contient des element uniques (pas de doubles)
        let res = new Set();

        //s'il n'y a aucuns filtres, j'affiche tout
        if(this.#aFiltres.length == 0){
            res = data;
        }
        else{
        //je passe a travers chaque filtre actif au moment
        this.#aFiltres.forEach((unFiltre)=>{
            //je definis la cetgorie et la valeur choisie
            let cat = unFiltre.dataset.jsCat;
            let valeur = unFiltre.dataset.jsCatValeur;
            //je passe a travers chaque film pour appliquer le filtre
            data.forEach((unElement)=>{
                //si le filtre s'applique j'ajoute le film a res
                if(unElement[cat] == valeur || (unElement[cat] > valeur && cat == "rt_score")){
                    res.add(unElement);
                    //je redefini data avec les element de res pour la prochaine boucle, pour pouvoir appliquer plusieurs filtres en meme temps
                    data = res;
                }else if (!(unElement[cat] == valeur) || !(unElement[cat] > valeur && cat == "rt_score")){
                    //si jamais le deuxieme ou troisieme(etc) ne s'applique pas aux films restants, je veux les effacer de ma selection. on reapllique data = res pour la prochaine boucle
                    res.delete(unElement);
                    data = res;
                }
            }) 
        })
        }
        // je reconvertis le set en array pour faciliter les autres procedures
        let newData = [];
            for(let element of res){
                newData.push(element);
            }
        res = newData;
        //j'envoie le resultat final des films qui correspondent a mes filtres actifs
        return res;
    }

}