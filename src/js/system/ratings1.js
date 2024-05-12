// Importing the Supabase client initialization assumed to be configured in "name.js"
import { supabase, doLogout } from "./name";

const itemsImageUrl = "https://hiyluoiecwditapzngvr.supabase.co/storage/v1/object/public/Cocktail/";

document.addEventListener('DOMContentLoaded', async function () {
    const laptopInfoString = localStorage.getItem("laptop_info");
    const laptopInfo = laptopInfoString ? JSON.parse(laptopInfoString) : null;

    if (laptopInfo) {
        displayLaptopDetails(laptopInfo);

        if (laptopInfo.userinformation_id) {
            const { data: userDetails, error } = await supabase
                .from("userinformation")
                .select("*")
                .eq("id", laptopInfo.userinformation_id)
                .single();

            if (error) {
                console.error('Failed to fetch user details:', error);
                return;
            }

            if (userDetails) {
                document.getElementById("first_name").textContent = "Name: " + userDetails.first_name + " " + userDetails.last_name;
                document.getElementById("contact_number").textContent = "Contact #: " + userDetails.contact_number;
                document.getElementById("college_name").textContent = "College: " + userDetails.college_name;
                document.getElementById("fb_link").href = userDetails.fb_link;
                document.getElementById("fb_link").children[1].textContent = userDetails.first_name + " " + userDetails.last_name;
            } else {
                console.log("No user details found for the provided user ID.");
            }
        } else {
            console.log("No userinformation_id found in laptop data.");
        }
    } else {
        console.log("No laptop information found in local storage.");
    }

    setupRatingSubmission();
});

function displayLaptopDetails(laptopInfo) {
    document.getElementById("model").textContent = "Model: " + laptopInfo.model || "Not available";
    document.getElementById("price").textContent = "Price: " + laptopInfo.price || "Not available";
    document.getElementById("specs").textContent = "Specification: " + laptopInfo.specs || "Not available";
    document.getElementById("condition").textContent = "Condition: " + laptopInfo.condition || "Not available";

    let imgElement = document.getElementById("image_path");
    if (laptopInfo.image_path) {
        imgElement.src = itemsImageUrl + laptopInfo.image_path;
    } else {
        imgElement.src = itemsImageUrl + "default_image.png"; // Fallback to a default image if none is available
        imgElement.alt = "Not available";
    }

    // Store laptop ID for later reference
    localStorage.setItem("laptopId", laptopInfo.id);
}

function setupRatingSubmission() {
    const submitBtn = document.getElementById('feedbtn');
    if (!submitBtn) {
        console.error('Submit button not found');
        return;
    }

    submitBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the form from submitting which would refresh the page

        const ratings = document.getElementsByName('rate');
        let selectedRating = null;
        for (let i = 0; i < ratings.length; i++) {
            if (ratings[i].checked) {
                selectedRating = parseInt(ratings[i].value, 10); // Ensure the rating is stored as an integer
                break;
            }
        }

        if (selectedRating) {
            const laptopId = localStorage.getItem("laptopId");
            console.log('Laptop ID:', laptopId);
            console.log('Rating to be saved:', selectedRating);
            if (!laptopId) {
                console.error('No laptop ID found for updating rating.');
                return;
            }

            saveRatingToSupabase(laptopId, selectedRating); // Update rating in Supabase
            window.location.href = 'feed.html'; // Redirect to the feed page
        } else {
            alert('Please select a rating.');
        }
    });
}

async function saveRatingToSupabase(laptopId, rating) {
    const { data, error } = await supabase
        .from('laptops')
        .update({ ratings: rating })
        .match({ id: laptopId });

    if (error) {
        console.error('Error updating rating in Supabase:', error);
    } else {
        console.log('Rating successfully updated in Supabase:', data);
    }
}