import { supabase, successNotification, errorNotification } from "../main";

// Load data
getDatas();

// Load data functionality
async function getDatas() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

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
            <div class="info">
                <div class="user">
                    <img src="assets/imgs/zoe.jpg" alt="User Profile Image">
                    <span class="username">Reonest</span>
                </div>
                <div class="recipe">
                    <img src="${cocktail.image_path}" alt="${cocktail.cocktail_name}">
                    <div class="card-info">
                        <h3>${cocktail.cocktail_name}</h3>
                    </div>
                </div>
            </div>

            <section class="ingredients" id="ingredients">
                <div class="container">
                    <div class="top-heading">Ingredients</div>
                    <ul>
                        ${cocktail.ingredients.split('\n').map(ingredient => `<li>${ingredient.trim()}</li>`).join('')}
                    </ul>
                </div>
            </section>

            <section class="procedure" id="procedure">
                <div class="container">
                    <div class="top-heading">Procedures</div>
                    <ol>
                        ${cocktail.procedures.split('\n').map(step => `<li>${step.trim()}</li>`).join('')}
                    </ol>
                </div>
            </section>`;

        // Assign container to the element
        document.getElementById("detail").innerHTML = container;
    } catch (error) {
        console.error(error);
    }
};

// In recipe.js
// const favoriteIcon = document.getElementById("favorite");

// favoriteIcon.addEventListener("click", async () => {
//     // Identify the cocktail
//     const cocktailId = cocktail_id; // Replace with the actual ID of the cocktail
//     const cocktailName = cocktail_name; // Replace with the actual name of the cocktail

//     // Store favorite in database
//     const { data, error } = await supabase
//         .from('favorites')
//         .insert([{ cocktail_id: cocktail_id, cocktail_name: cocktail_name }]);
    
//     if (error) {
//         console.error("Error favoriting cocktail:", error);
//         return;
//     }

//     console.log("Cocktail favorited successfully!");
// });


