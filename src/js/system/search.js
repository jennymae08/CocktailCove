import { supabase, successNotification, errorNotification } from "../main";

const cocktailImageUrl = "https://hiyluoiecwditapzngvr.supabase.co/storage/v1/object/public/Cocktail/";
const profileImageUrl = "https://hiyluoiecwditapzngvr.supabase.co/storage/v1/object/public/profile/";
const defaultProfileImage = "https://hiyluoiecwditapzngvr.supabase.co/storage/v1/object/public/profile/public/DP1.jpg"; // Replace with your default profile image path
const userId = localStorage.getItem("user_id");

// Load data
getDatas();

// Search functionality
const form_search = document.getElementById("form_search");
const input_search = document.getElementById("input_search");

input_search.addEventListener("input", async () => {
    const searchValue = input_search.value.trim(); // Get the trimmed search value
    if (searchValue === "") {
        getDatas(); // If search value is empty, fetch all cocktails
    } else {
        const formData = new FormData(form_search);
        getDatas(formData.get("search")); // Otherwise, perform search with the input value
    }
});

// Load data functionality
async function getDatas(search = "") {
    try {
        // Get all rows
        let { data: posts, error } = await supabase
            .from('post')
            .select("*, user_info(*)")
            .ilike("cocktail_name", "%" + search + "%");

        if (error) {
            console.error("Error fetching cocktail data:", error);
            return;
        }

        // Temporary store for the HTML structure
        let container = "";
        // Get each item
        posts.forEach((cocktail) => {
            const userProfile = cocktail.user_info;
            const userProfileImage = userProfile && userProfile.image_path 
                ? profileImageUrl + userProfile.image_path 
                : defaultProfileImage;

            container += `
              <div class="col-6 col-md-3 py-3" data-id="${cocktail.id}">
                <div class="user-profile">
                  <img src="${userProfileImage}" alt="User Profile Image">
                  <p class="text-light col-sm-4" style="line-height: 1.8;">${userProfile ? userProfile.username : 'Unknown User'}</p>
                </div>
                <div class="card">
                  <img src="${cocktailImageUrl + cocktail.image_path}" alt="">
                  <div class="card-info">
                    <h3>${cocktail.cocktail_name}</h3>
                    <div class="star-rating">
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="far fa-star"></i>
                    </div>
                    <a href="recipe.html?id=${cocktail.id}" class="btn view-button">View Recipe</a>
                  </div>
                </div>
              </div>`;
        });
        
        // Assign container to the element
        document.getElementById("get_data").innerHTML = container;
    } catch (error) {
        console.error("Error fetching cocktail data:", error);
    }
};

console.log(userId);
