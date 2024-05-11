document.addEventListener('DOMContentLoaded', function() {
    const shareProfileBtn = document.getElementById('shareProfileBtn');

    shareProfileBtn.addEventListener('click', function() {
        // Get the URL of the current page
        const url = window.location.href;

        // Copy the URL to the clipboard
        navigator.clipboard.writeText(url)
            .then(function() {
                
                alert('Profile link copied to clipboard!');
            })
            .catch(function(error) {
                
                console.error('Failed to copy profile link: ', error);
                alert('Failed to copy profile link. Please try again.');
            });
    });
});
