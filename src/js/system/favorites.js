// Import necessary functions and variables from main.js
import { supabase, successNotification, errorNotification } from "../main";

// Load data
getDatas();

// Load data functionality
async function getDatas() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        if (!id) {
            console.error('Invalid or missing ID parameter');
            // Handle the case where the ID parameter is missing or invalid, such as displaying an error message to the user
            return;
        }

        // Get specific cocktail by id
        let { data: cocktail, error } = await supabase
            .from('post')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error(error);
            return;
        }

        let container = "";
        // Generate HTML for cocktail details
        container += `
        <div class="col-6 col-md-3 py-3">
              
        <div class="card">
          <img src="${cocktail.image_path}" alt="">
          <div class="card-info">
            <h3>${cocktail.cocktail_name}</h3>
            <div class="star-rating">
              <i class="fas fa-star" id="star-icon"></i> <!-- Add an ID to the star icon for event handling -->
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="far fa-star"></i>
            </div>
            <a href="recipe.html?id=${cocktail.id}" class="btn view-button">View Recipe</a>
          </div>
        </div>
      </div>`;

        // Assign container to the element
        document.getElementById("favoriteItems").innerHTML = container;

        // Add event listener to the star icon for favoriting
        const starIcon = document.getElementById('star-icon');
        starIcon.addEventListener('click', async () => {
            try {
                // Call the favoriteCocktail function to favorite the cocktail
                await favoriteCocktail(cocktail.id, userId); // Assuming you have userId available
                // Optionally, update the UI to reflect that the cocktail has been favorited
                starIcon.classList.add('favorited');
                // Optionally, display a success notification
                successNotification('Cocktail favorited successfully!');
            } catch (error) {
                console.error('Error favoriting cocktail:', error);
                // Optionally, display an error notification
                errorNotification('Failed to favorite cocktail. Please try again.');
            }
        });
    } catch (error) {
        console.error(error);
    }
};

// Function to handle favoriting a cocktail
async function favoriteCocktail(cocktail_id, userId) {
    try {
        // Insert a new record into the favorites table
        const { data, error } = await supabase
            .from('favorites')
            .insert([{ user_id: userId, post_id: cocktail_id }]);
        
        if (error) {
            console.error('Error favoriting cocktail:', error.message);
            return null;
        }
        
        if (data) {
            console.log('Cocktail favorited successfully!');
            return data;
        }
    } catch (error) {
        console.error('Error favoriting cocktail:', error.message);
        return null;
    }
}
