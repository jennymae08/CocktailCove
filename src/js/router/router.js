function setRouter(){


  const isLoggedIn = localStorage.getItem("access_token") !== null;
  /* const userRole = localStorage.getItem("Role"); */

    switch (window.location.pathname) {
        case "/":
        case "/login.html":
        case "/register.html":
        case "/index.html":
            if (isLoggedIn) {
                window.location.pathname = "/collection.html";
            }
            break;

        case "/collection.html":
        case "/barbieDrink.html":
        case "/ginBilog.html":
        case "/collection.html":
        case "/ginUniverse.html":
        case "/gsmMargarita.html":
        case "/tiaMaria.html":
        case "/zombieCocktail.html":
        case "/favorites.html":
        case "/upload.html":
        case "/profile.html":
        case "/profile1.html":
        case "/more.html":
            
            if(!isLoggedIn){
                window.location.pathname = "/login.html";
            }
            break;
        //for admin user only:redirect to /collection
        case "/upload.html": //change this to a page where admin has access and add more case for more pages
            if(localStorage.getItem("role") != "Admin") {
                window.location.pathname = "/collection.html";
            }
            break;

        default:
            break;
    }
}

export {setRouter};