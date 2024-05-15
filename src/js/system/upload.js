import { supabase, successNotification, errorNotification } from "../main";

const cocktailImageUrl = "https://hiyluoiecwditapzngvr.supabase.co/storage/v1/object/public/Cocktail/";
const profileImageUrl = "https://hiyluoiecwditapzngvr.supabase.co/storage/v1/object/public/profile/";
const defaultProfileImage = "https://hiyluoiecwditapzngvr.supabase.co/storage/v1/object/public/profile/public/DP1.jpg"; // Set your default profile image path
const userId = localStorage.getItem("user_id"); // Get the user ID from local storage

// Call the function to fetch and display cocktail data after DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    getDatas();
});

// Form submission handler
const form_item = document.getElementById("form_item");

form_item.onsubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(form_item);
    const image = formData.get("image_path");

    // Upload image to Supabase storage
    const { data: imageUploadData, error: imageUploadError } = await supabase
        .storage
        .from('Cocktail')
        .upload("public/" + image.name, image, {
            cacheControl: '3600',
            upsert: true,
        });

    if (imageUploadError) {
        errorNotification("Something wrong happened. Cannot upload image, image size might be too big. You may update the cocktail's image.", 15);
        console.log(imageUploadError);
        return;
    }

    // Input cocktail data to Supabase
    const { data: postData, error: postError } = await supabase
        .from('post')
        .insert([
            { 
                image_path: imageUploadData.path,
                cocktail_name: formData.get("cocktail_name"), 
                ingredients: formData.get("ingredients"), 
                procedures: formData.get("procedures"),
                user_info_id: userId, // Include the user ID
                overall_rating: 0 // Initialize overall_rating to 0
            },
        ]);

    if (postError) {
        errorNotification("Something wrong happened. Cannot add cocktail!", 10);
        console.log(postError);
        return;
    }

    successNotification("Cocktail Successfully Added!", 10);
    // Reload data
    getDatas();
    form_item.reset();
    setTimeout(() => {
        window.location.href = "upload.html";
    }, 3000);
};

// Load data functionality
async function getDatas() {
    try {
        const get_data_element = document.getElementById("get_data");
        if (!get_data_element) {
            console.error("Error: get_data element not found in the DOM.");
            return;
        }

        const { data: posts, error } = await supabase
            .from('post')
            .select(`
                *,
                user_info ( username, image_path ),
                overall_rating
            `);

        if (error) {
            console.error("Error fetching cocktail data:", error);
            return;
        }

        let container = "";
        posts.forEach((cocktail) => {
            const userProfile = cocktail.user_info;
            const userProfileImage = userProfile && userProfile.image_path 
                ? profileImageUrl + userProfile.image_path 
                : defaultProfileImage;

            const overallRating = cocktail.overall_rating || 0; // Get overall rating directly from the post

            container += `
                <div class="col-6 col-md-3 py-3" data-id="${cocktail.id}">
                    <div class="user-profile">
                        <img src="${userProfileImage}" alt="User Profile Image">
                        <span class="username">${userProfile ? userProfile.username : 'Unknown User'}</span>
                    </div>
                    <div class="card">
                        <img src="${cocktailImageUrl + cocktail.image_path}" alt="">
                        <div class="card-info">
                            <h3>${cocktail.cocktail_name}</h3>
                            <div class="star-rating">
                                ${generateStarRating(overallRating)}
                            </div>
                            <a href="recipe.html?id=${cocktail.id}" class="btn view-button">View Recipe</a>
                        </div>
                    </div>
                </div>`;
        });

        get_data_element.innerHTML = container;
    } catch (error) {
        console.error("Error fetching cocktail data:", error);
    }
};

// Function to generate star rating HTML
function generateStarRating(rating) {

    console.log('Rating:', rating);

    const maxRating = 5; // Maximum rating value
    let starsHTML = '';
    for (let i = 1; i <= maxRating; i++) {
        if (i <= rating) {
            // If current star is less than or equal to the rating, display a filled star
            starsHTML += '<i class="fas fa-star"></i>';
        } else {
            // Otherwise, display an empty star
            starsHTML += '<i class="far fa-star"></i>';
        }
    }
    return starsHTML;
}
