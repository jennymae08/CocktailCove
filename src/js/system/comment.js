import {supabase, successNotification, errorNotification } from "../main";


const cocktailImageUrl = "https://hiyluoiecwditapzngvr.supabase.co/storage/v1/object/public/Cocktail/";

// Load data
getDatas();

const comments = document.getElementById("comments");


comments.onsubmit = async (e) => {
    e.preventDefault();

    // Get the post ID; you should replace 'postId' with the actual ID of the post you're commenting on
    const postId = 'postId';

    // Get the comment text from the form
    const commentText = formData.get("your-comment");

    // Insert the comment into the 'comments' table with the appropriate _post_id
    const { data, error } = await supabase
        .from('comments')
        .insert([
            {
                comment_text: commentText,
                _post_id: postId
            }
        ]);

    if (error == null) {
        successNotification("You Commented on this cocktail!", 10);
        // Reload data
        getDatas();
        comments.reset(); // Reset the form after successful submission
    } else {
        errorNotification("Try again!", 10);
        console.log(error);
    }
};



// Load data functionality
async function getDatas() {
    // Get all rows
    
    let { data: comments, error } = await supabase
    .from('comments')
    .select('*')
            
    // Temporary store for the HTML structure
    let container = "";
    //get each item
    comments.forEach((cocktail) => {
        container += `
        <div class="box-top" data-id="${cocktail.id}">
          <!-- profile---------->
          <div class="profile" data-id="${cocktail.user_id}">
            <div class="profile-img">
              <img src="${cocktail.user_profile}">
            </div>
            <!-- username --------->
            <div class="user-name">
              <strong>${cocktail.username}</strong>
            </div>
            <!-- reviews---- -->
            <div class="reviews">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="far fa-star"></i>
            </div>

          </div>
          <!-- comments----------- -->
          <div class="user-comment">
            <p>${cocktail.comment_text}</p>
          </div>
        </div>
      </div>`;
    });

    
    
    //assign container to the element
    document.getElementById("testimonial").innerHTML = container;


};
