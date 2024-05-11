document.addEventListener('DOMContentLoaded', function() {
   
    var favoriteIcon = document.getElementById('favorite');

    
    favoriteIcon.addEventListener('click', function() {
        // Get the current color of the star icon
        var currentColor = favoriteIcon.querySelector('i').style.color;

        
        if (currentColor === 'yellow') {
            favoriteIcon.querySelector('i').style.color = '#ffffff'; // Change color to white
        } else {
            favoriteIcon.querySelector('i').style.color = 'yellow'; // Change color to yellow
        }
    });
});