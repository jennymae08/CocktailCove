import { supabase, successNotification, errorNotification } from "../main";

// Load data
const urlParams = new URLSearchParams(window.location.search);
const cocktailId = urlParams.get('id');
getDatas(cocktailId);

async function getDatas(id) {
    try {
        // Fetch comments data for a specific cocktail from Supabase
        let { data: comments, error } = await supabase
            .from('post')
            .select('*')
            .eq('id',id);// Filter by cocktail_id
        
        if (error) {
            throw error;
        }
        
        // Construct HTML for displaying comments
        let container = "";
        comments.forEach((comment) => {
            container += `
            <div class="box-top" data-id="${comment.id}">
                <div class="profile" data-id="${comment.user_id}">
                    <div class="profile-img">
                        <img src="${comment.user_profile}">
                    </div>
                    <div class="user-name">
                        <strong>${comment.username}</strong>
                    </div>
                    <div class="reviews">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="far fa-star"></i>
                    </div>
                </div>
                <div class="user-comment">
                    <p>${comment.comment}</p>
                </div>
            </div>`;
        });

        // Display comments HTML
        document.getElementById("testimonial").innerHTML = container;
    } catch (error) {
        console.error(error);
    }
}

const form_comment = document.getElementById("form-comment");

form_comment.onsubmit = async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form_comment);
    const comment = formData.get("comment");

    // Insert comment into Supabase database
    const { data: postData, error: postError } = await supabase
    .from('post')
    .insert([{ 
        comment_text: comment,
        post_id: cocktailId // Gamiton ang retrieved cocktailId dinhi
    }]);

    // Handle success or error
    if (postError == null) {
        successNotification("Comment Successfully Added!", 10);
        // Reload data or update UI as needed
        getDatas(cocktailId);
    } else {
        errorNotification("Something went wrong. Cannot add comment!", 10);
        console.log(postError);
    }

    // Reset the form
    form_comment.reset();
};
