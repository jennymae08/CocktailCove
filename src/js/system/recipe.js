import { supabase, successNotification, errorNotification } from "../main";

// Base URL for cocktail images
const cocktailImageUrl = "https://hiyluoiecwditapzngvr.supabase.co/storage/v1/object/public/Cocktail/";

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
            console.error("Error fetching cocktail details:", error);
            return;
        }

        // Generate HTML for cocktail details
        let container = `
            <div class="info" data-id="${cocktail.id}">
                <div class="user">
                    <img src="assets/imgs/zoe.jpg" alt="User Profile Image">
                    <span class="username">Reonest</span>
                </div>
                <div class="recipe">
                    <img src="${cocktailImageUrl}${cocktail.image_path}" alt="${cocktail.cocktail_name}">
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
        console.error("Error in getDatas function:", error);
    }
}

// Call the getDatas function to load data
getDatas();
