// Frontend Implementation
document.getElementById("star-widget").addEventListener("click", async (event) => {
    if (event.target.matches("input[type='radio']")) {
        const rating = event.target.value;
        const commentTextarea = document.querySelector(".textarea textarea");
        const comment = commentTextarea.value;
        const userId = getUserId(); // Implement a function to get the current user's ID

        try {
            // Send a request to Supabase to store the rating and comment
            const { data, error } = await supabase
                .from('ratings')
                .insert({
                    post_id: postId, // Assuming you have access to the post ID
                    rating_value: rating,
                    rating_date: new Date().toISOString(),
                    comment: comment,
                    user_id: userId
                });

            if (error) {
                throw error;
            }

            // Display success message or update UI
            console.log("Rating and comment submitted successfully!");
            // You can update the UI here, like showing a success message or refreshing the comments section
        } catch (error) {
            console.error("Error submitting rating and comment:", error.message);
        }
    }
});

// Backend Implementation (assuming you have a table named 'ratings' in your Supabase database)
async function getRatingsAndComments() {
    try {
        // Query Supabase to get ratings and comments for the current post
        const { data, error } = await supabase
            .from('ratings')
            .select('*')
            .eq('post_id', postId); // Assuming you have access to the post ID

        if (error) {
            throw error;
        }

        // Process the data and display ratings and comments in the UI
        displayRatingsAndComments(data);
    } catch (error) {
        console.error("Error fetching ratings and comments:", error.message);
    }
}

// Function to display ratings and comments in the UI
function displayRatingsAndComments(data) {
    const ratingsContainer = document.getElementById("ratings-container");

    // Clear previous ratings and comments
    ratingsContainer.innerHTML = "";

    // Iterate over each rating and comment and create HTML elements to display them
    data.forEach((item) => {
        const ratingElement = document.createElement("div");
        ratingElement.classList.add("rating");

        const ratingStars = document.createElement("div");
        ratingStars.classList.add("rating-stars");
        ratingStars.textContent = `Rating: ${item.rating_value}`;

        const commentElement = document.createElement("div");
        commentElement.classList.add("comment");
        commentElement.textContent = item.comment;

        ratingElement.appendChild(ratingStars);
        ratingElement.appendChild(commentElement);

        ratingsContainer.appendChild(ratingElement);
    });
}

// Call the function to load ratings and comments when the page loads
getRatingsAndComments();
