export default class Tri {
    appliquerTri(tri, ordre, data){
        let res = data;
        //ordre croissant par date
        if(tri == "release_date" && ordre == "asc") {
            res.sort((a, b)=> {
                return a.release_date - b.release_date;
            })
        //ordre decroissant par date
        }else if(tri == "release_date" && ordre == "desc"){
            res.sort((a, b)=> {
                return b.release_date - a.release_date;
            })
        //ordre alphabetique a-z
        }else if(tri == "title" && ordre == "asc"){
            res.sort(function(a, b) {
                var nameA = a.title.toUpperCase();
                var nameB = b.title.toUpperCase();
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
                return 0; 
              });
        //ordre alphabetique z-a
        }else if(tri == "title" && ordre == "desc"){
            res.sort(function(a, b) {
                var nameA = a.title.toUpperCase();
                var nameB = b.title.toUpperCase(); 
                if (nameA > nameB) {
                  return -1;
                }
                if (nameA < nameB) {
                  return 1;
                }
                return 0;
              });
        }

        return res;
    }
}