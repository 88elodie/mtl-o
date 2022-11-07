export default class Tri {
    appliquerTri(tri, ordre, data){
        let res = data;
        if(tri == "release_date" && ordre == "asc") {
            res.sort((a, b)=> {
                return a.release_date - b.release_date;
            })
        }else if(tri == "release_date" && ordre == "desc"){
            res.sort((a, b)=> {
                return b.release_date - a.release_date;
            })
        }else if(tri == "title" && ordre == "asc"){
            res.sort(function(a, b) {
                var nameA = a.title.toUpperCase(); // ignore upper and lowercase
                var nameB = b.title.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                  return -1; //nameA comes first
                }
                if (nameA > nameB) {
                  return 1; // nameB comes first
                }
                return 0;  // names must be equal
              });
        }else if(tri == "title" && ordre == "desc"){
            res.sort(function(a, b) {
                var nameA = a.title.toUpperCase(); // ignore upper and lowercase
                var nameB = b.title.toUpperCase(); // ignore upper and lowercase
                if (nameA > nameB) {
                  return -1; //nameB comes first
                }
                if (nameA < nameB) {
                  return 1; // nameA comes first
                }
                return 0;  // names must be equal
              });
        }

        return res;
    }
}