import {dataGhibli} from "../data/film.js";
import Catalogue from "./Catalogue.mjs";
import Filtre from "./Filtre.mjs";
import Recherche from "./Recherche.mjs";
import Tri from "./Tri.mjs";



export default class Application{
    #oFiltre;
    #oCatalogue;
    #oTri;
    #oRecherche;
    constructor(){
        const domCatalogue = document.querySelector(".catalogue");
        const domListeCategorie = document.querySelector(".liste-categorie");
        const domTri = document.querySelector(".triage");
        const domRecherche = document.querySelector(".btn-recherche");

        domListeCategorie.addEventListener("click", this.appliquerFiltre.bind(this))
        domTri.addEventListener("click", this.appliquerTri.bind(this))
        domRecherche.addEventListener("click", this.appliquerRecherche.bind(this));
        domCatalogue.addEventListener("click", this.afficherInfo);

        this.#oCatalogue = new Catalogue(domCatalogue);
        
        this.#oFiltre = new Filtre;

        this.#oTri = new Tri;

        this.#oRecherche = new Recherche;


        /*let data = dataGhibli.filter((unFilm)=>{
            return (unFilm.release_date >= 1980 && unFilm.release_date <= 1989 );
        })*/
        this.#oCatalogue.setFilms(dataGhibli);
        this.#oCatalogue.rendu();


    }

    afficherInfo(e){
        const cible = e.target;

        if(cible.classList.contains("action")){
            const parent = cible.parentNode;
            const modal = parent.querySelector(".modal");
            modal.classList.remove("invisible");
            const fermer = parent.querySelector(".close");
            fermer.addEventListener("click", function(){
                modal.classList.add("invisible");
            });
        }
    }

    appliquerRecherche(e){
        let dataFilms;
        if(this.#oRecherche.getFilms() && this.#oCatalogue.getData()){
            dataFilms = this.#oCatalogue.getData();
            dataFilms = this.#oFiltre.appliquerFiltre(dataFilms);
        }else if(this.#oFiltre.getFiltres() && !this.#oCatalogue.getData()){
            dataFilms = this.#oFiltre.appliquerFiltre(dataGhibli);
        }else {
            dataFilms = dataGhibli;
        }
        const recherche = document.querySelector("input[name='champ-recherche']").value;
        const dataRecherche = this.#oRecherche.appliquerRecherche(recherche, dataFilms);
        this.#oCatalogue.setFilms(dataRecherche);
        this.#oCatalogue.rendu();
    }

    appliquerTri(e){
        let data = dataGhibli;
        if(this.#oRecherche.getFilms()){
            data = this.#oRecherche.getFilms();
        }
        const cible = e.target;
        let dataTri = this.#oCatalogue.getFilms();
        if(cible.classList.contains("choixTri")){
            if(cible.dataset.jsTriActif == 1){   
                cible.dataset.jsTriActif = 0;
                cible.classList.remove("triActif");
            }
            else{
                const tri = cible.dataset.jsTri;
                const ordre = cible.dataset.jsTriValeur;
                document.querySelectorAll("[data-js-tri-actif='1']").forEach((unElement)=>{
                    unElement.dataset.jsTriActif = 0;
                    unElement.classList.remove("triActif");
                })
                cible.dataset.jsTriActif = 1;
                cible.classList.add("triActif");
                dataTri = this.#oTri.appliquerTri(tri, ordre, data);
                this.#oCatalogue.setData(dataTri);
            }
            //je sauve les données triées dans une seconde variable pour pouvoir reutiliser les données quand je veux enlever les filtres sur les données triées
            dataTri = this.#oFiltre.appliquerFiltre(dataTri);
            this.#oCatalogue.setFilms(dataTri);
            this.#oCatalogue.rendu();
        }

    }

    appliquerFiltre(e){
        let data;
        if(this.#oCatalogue.getData()){
            data = this.#oCatalogue.getData();
        }else if(this.#oRecherche.getFilms() && !(this.#oCatalogue.getData())){
            data = this.#oRecherche.getFilms();
        }else {
            //je remets le films à 0, puisque je veux reappliquer les filtres qui sont actifs à chaque fois qu'il y a changement
            this.#oCatalogue.setFilms(dataGhibli);
            //aller chercher la liste de films
            data = this.#oCatalogue.getFilms();
        }
        //filtre selectionne (declencheur de l'evenement)
        const cible = e.target;
        //categorie du filtre, pour pouvoir avoir un par categorie actif
        const parent = cible.parentNode;
        //aller chercher les filtres qui sont selectionnés au moment
        let filtresActifs = document.querySelectorAll("[data-js-actif='1']");
        this.#oFiltre.setFiltres(filtresActifs);
        let dataFiltre;
        //confirmer que l'element est un filtre et non le titre de la categorie
        if(cible.classList.contains("choixFiltre")){
            //si le filtre est deja active, on le remte a 0 et enleve la classe css qui nous indique visuellement quelle est active
            if(cible.dataset.jsActif == 1){   
                cible.dataset.jsActif = 0;
                cible.classList.remove("filtreActif");
                filtresActifs = document.querySelectorAll("[data-js-actif='1']");
                this.#oFiltre.setFiltres(filtresActifs);
                //je soumet les titres a travers les filtres pour avoir le resultat des autres filtres qui sont toujours actifs, sans celui qu'on viens de desactiver
                dataFiltre = this.#oFiltre.appliquerFiltre(data);
            }
            else{
                //on enleve le statut actif si on choisit un deuxieme filtre dans la meme categorie, seulement 1 filtre actif dans chaque categorie
                parent.querySelectorAll("[data-js-actif='1']").forEach((unElement)=>{
                    unElement.dataset.jsActif = 0;
                    unElement.classList.remove("filtreActif");
                })
                //on ajoute le statut actif au filtre qui a ete selectionné
                cible.dataset.jsActif = 1;
                cible.classList.add("filtreActif");
                //on reverifie tous les filtres actifs + celui qui viens de s'ajouter et on les applique
                filtresActifs = document.querySelectorAll("[data-js-actif='1']");
                this.#oFiltre.setFiltres(filtresActifs);
                dataFiltre = this.#oFiltre.appliquerFiltre(data);
            }
            //on affiche les films filtrés
            this.#oCatalogue.setFilms(dataFiltre);
            this.#oCatalogue.rendu();
            

        }
    }
}