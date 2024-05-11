import {supabase, successNotification, errorNotification } from "../main";


const cocktailImageUrl = "https://hiyluoiecwditapzngvr.supabase.co/storage/v1/object/public/Cocktail/";

// Load data
getDatas();

// search functionality
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

const form_item = document.getElementById("form_item");


// Load data functionality
async function getDatas(search="") {
    // Get all rows
    let { data: posts, error } = await supabase
        .from('post')
        .select('*')
        .ilike("cocktail_name", "%" + search + "%");
    // Temporary store for the HTML structure
    let container = "";
    //get each item
    posts.forEach((cocktail) => {
        container += `
          <div class="col-6 col-md-3 py-3" data-id="${cocktail.id}">
            <div class="user-profile">
              <img src="/storage/${cocktail.image_path}" alt="User Profile Image">
              <span class="username">Reonest</span>
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

    
    
    //assign container to the element
    document.getElementById("get_data").innerHTML = container;

    //delete id
    // document.querySelector("#btn_delete").forEach((element) => {
    //   element.addEventListener("click", deleteAction);
    // });
};

// //delete functionality
// const deleteAction = async (e) => {
//   const id = e.target.getAttribute("data-id");

//   //background red the card you want to delete
//   document.querySelector(`.card[data-id="${id}"]`).style.backgroundColor = "red";

//   alert(id);

//   //supabase delete row
//   const {error} = await supabase
//   .from(post)
//   .delete()
//   .eq("id",id);

//   if(error == null){
//     successNotification("Item Successfully Deleted",15);

//     //reload datas
//     // getDatas();//this is slow
//     //remove the card
//     document.querySelector(`.card[data-id="${id}"]`).remove();
//   }else {
//     errorNotification("Cannot delete Item",15);
//     console.log(error);

//     //background white the card you want to delete
//   document.querySelector(`.card[data-id="${id}"]`).style.backgroundColor = "white";

//   }
// };

//${cocktailImageUrl + cocktail.image_path}