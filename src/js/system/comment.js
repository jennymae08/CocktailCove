import { supabase, successNotification, errorNotification } from "../main";

// Define userId, profileimage, and defaultProfileImage
const userId = localStorage.getItem("user_id");
const profileimage = "https://hiyluoiecwditapzngvr.supabase.co/storage/v1/object/public/profile/";
const defaultProfileImage = "https://hiyluoiecwditapzngvr.supabase.co/storage/v1/object/public/profile/public/DP1.jpg";

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
        // Fetch user info
        const { data: userInfo, error: userInfoError } = await supabase
            .from('user_info')
            .select('image_path')
            .eq('id', userId)
            .single();
        
        if (userInfoError) {
            errorNotification("Failed to fetch user info!", 5);
            console.error(userInfoError);
            return;
        }

        const image_path = userInfo ? userInfo.image_path : null;

        const { data: postData, error: postError } = await supabase
            .from('comments')
            .insert([{ 
                comment_text: comment,
                ratings: ratingValue,
                post_id: cocktailId, // Add the cocktailId
                user_info_id: userId, // Add the userId
                image_path: image_path // Use the fetched image_path
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
        await updateOverallRating(cocktailId); // Update overall rating

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

async function getDatas(cocktailId) {
    try {
        // Fetch comments data for a specific cocktail from Supabase
        let { data: comments, error } = await supabase
            .from('comments')
            .select('*, user_info(username, image_path)')
            .eq('post_id', cocktailId); // Use cocktailId for filtering
        
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
                            <img src="${comment.user_info ? profileimage + comment.user_info.image_path || defaultProfileImage : defaultProfileImage}">
                        </div>
                        <div class="user-name">
                            <strong>${comment.user_info ? comment.user_info.username || "Anonymous" : "Anonymous"}</strong>
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

// Function to update overall rating for a cocktail
async function updateOverallRating(cocktailId) {
    try {
        // Fetch all ratings for the cocktail from Supabase
        const { data: ratings, error } = await supabase
            .from('comments')
            .select('ratings')
            .eq('post_id', cocktailId);
        
        if (error) {
            throw error;
        }

        // Calculate average rating
        const totalRatings = ratings.reduce((acc, curr) => acc + curr.ratings, 0);
        const averageRating = totalRatings / ratings.length;

        // Update overall rating in the 'post' table
        const { data: updateData, error: updateError } = await supabase
            .from('post')
            .update({ overall_rating: averageRating })
            .eq('id', cocktailId);
        
        if (updateError) {
            throw updateError;
        }
    } catch (error) {
        console.error(error);
    }
}
