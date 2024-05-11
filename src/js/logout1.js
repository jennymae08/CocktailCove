
  document.getElementById('.item-logout').addEventListener('click', function(event) {
    event.preventDefault(); 
    
    if (confirm('Are you sure you want to log out?')) {
        window.location.href = 'index.html'; 
    } else {
        
    }
});