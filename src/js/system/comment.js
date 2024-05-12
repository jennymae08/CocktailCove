import { supabase, successNotification, errorNotification } from "../main";

// Function to handle comment submission
const form_comment = document.getElementById("form-comment");

form_comment.onsubmit = async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form_comment);
    const comment = formData.get("comment");

    // Get the selected rating
    const rating = document.querySelector('input[name="rate"]:checked');
    if (!rating) {
        errorNotification("Please select a rating!", 5);
        return;
    }
    const ratingValue = rating.value;

    // Insert comment and rating into Supabase database
    try {
        const { data: postData, error: postError } = await supabase
            .from('comments')
            .insert([{ 
                comment_text: comment,
                ratings: ratingValue,
                post_id: cocktailId // Add the cocktailId
            }]);

        if (postError) {
            errorNotification("Something went wrong. Cannot add comment!", 5);
            console.error(postError);
            return;
        }

        // Success notification
        successNotification("Comment and rating submitted successfully!", 5);

        // Reload comments for the specific cocktail
        await getDatas(cocktailId); // Call getDatas to refresh comments

        // Reset the form
        form_comment.reset();
    } catch (error) {
        console.error(error);
        errorNotification("Something went wrong. Cannot add comment!", 5);
    }
};

// Load data
const urlParams = new URLSearchParams(window.location.search);
const cocktailId = urlParams.get('id');
getDatas(cocktailId);

async function getDatas(cocktailId) { // Gipasabot nimo ang parameter nga cocktailId
    try {
        // Fetch comments data for a specific cocktail from Supabase
        let { data: comments, error } = await supabase
            .from('comments')
            .select('*')
            .eq('post_id', cocktailId); // Gamita ang cocktailId alang sa pag-filter
        
        if (error) {
            throw error;
        }
        
        // Construct HTML for displaying comments
        let container = "";
        comments.forEach((comment) => {
            container += `
            <div class="comment-box" data-id="${comment.id}">
            <div class="box-top">
                <div class="profile" data-id="${comment.user_id}">
                    <div class="profile-img">
                        <img src="${comment.user_profile}">
                    </div>
                    <div class="user-name">
                        <strong>${comment.username}</strong>
                    </div>
                    <div class="reviews">
                        ${generateStarRating(comment.ratings)} <!-- Display star rating -->
                    </div>
                </div>
                <div class="user-comment">
                    <p>${comment.comment_text}</p> <!-- Change comment to comment_text -->
                </div>
            </div>
            </div>`;
        });

        // Display comments HTML
        document.getElementById("testimonial").innerHTML = container;
    } catch (error) {
        console.error(error);
    }
}

// Function to generate star rating HTML
function generateStarRating(rating) {
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
