window.addEventListener("load", function() {
    var loader = document.getElementById("loader");
    var navbar = document.querySelector(".navbar");
    var carousel = document.querySelector(".carousel");
    var menu = document.querySelector(".menu");
    var bottomNav = document.querySelector(".bot-nav");

    
    setTimeout(function() {
        loader.classList.add("hidden");
        loader.style.display = "none"; 
        navbar.style.display = "block"; 
        carousel.style.display = "block"; 
        menu.style.display = "block"; 
        bottomNav.style.display = "block"; 
    },1000); 
});