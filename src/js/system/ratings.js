import { supabase, successNotification, errorNotification } from "../main";

// Function to calculate the overall rating of a cocktail
function calculateOverallRating(ratings) {
    if (ratings.length === 0) {
        return 0; // Return 0 if no ratings yet
    }

    // Calculate the sum of all ratings
    const sum = ratings.reduce((total, rating) => total + rating, 0);

    // Calculate the average rating
    const average = sum / ratings.length;

    // Round the average rating to 1 decimal place
    return Math.round(average * 10) / 10;
}

// Function to display the overall rating in HTML
function displayOverallRating(cocktailId, overallRating) {
    const cocktailElement = document.querySelector(`[data-id="${cocktailId}"]`);
    const starRatingElement = cocktailElement.querySelector('.star-rating');
    starRatingElement.innerHTML = ''; // Clear existing stars

    // Generate star icons based on the overall rating
    for (let i = 1; i <= 5; i++) {
        if (i <= overallRating) {
            starRatingElement.innerHTML += '<i class="fas fa-star"></i>';
        } else {
            starRatingElement.innerHTML += '<i class="far fa-star"></i>';
        }
    }
}

// Function to fetch ratings for all cocktails and display overall ratings
async function fetchAndDisplayOverallRatings() {
    try {
        // Fetch all cocktails from the database
        const { data: cocktails, error } = await supabase
        .from('comments')
        .select('*');

        if (error) {
            throw error;
        }

        // Loop through each cocktail
        for (const cocktail of cocktails) {
            // Fetch ratings for the current cocktail
            const { data: ratings, error: ratingError } = await supabase
                .from('comments')
                .select('ratings')
                .eq('post_id', cocktail.id);

            if (ratingError) {
                throw ratingError;
            }

            // Calculate the overall rating for the current cocktail
            const overallRating = calculateOverallRating(ratings.map(rating => rating.ratings));

            // Display the overall rating in the HTML
            displayOverallRating(cocktail.id, overallRating);
        }
    } catch (error) {
        console.error('Error fetching and displaying overall ratings:', error.message);
    }
}

// Call the function to fetch and display overall ratings when the page loads
window.addEventListener('load', fetchAndDisplayOverallRatings);
