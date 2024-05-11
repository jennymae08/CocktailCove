document.querySelector('.item-logout').addEventListener('click', function() {
    var confirmation = confirm("Are you sure you want to log out?");
    if (confirmation) {
        window.location.href = "index.html";
    } else {
        
    }
    
});