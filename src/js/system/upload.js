import {supabase, successNotification, errorNotification } from "../main";


const cocktailImageUrl = "https://hiyluoiecwditapzngvr.supabase.co/storage/v1/object/public/Cocktail/";

// Load data
getDatas();

// search functionality
// const form_search = document.getElementById("form_search");

// form_search.onsubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData(form_search);
    
//     getDatas(formData.get("search"));

//     // alert("hehe");
// };

const form_item = document.getElementById("form_item");


form_item.onsubmit = async (e) => {
    e.preventDefault();

    //get all values
    const formData = new FormData(form_item);

    
    const image = formData.get("image_path");
    const { data, error } = await supabase
    .storage
    .from('Cocktail')
    .upload("public/" + image.name , image, {
        cacheControl: '3600',
        upsert: true,
    });

    const image_data = data;

    // console.log(data);

    if(error){
        errorNotification("Something wrong happened. Cannot upload image, image size might be too big. You may update the cocktail's image.",15);
        console.log(error);
    }

    //input data supabase
        const {data: postData, error: postError} = await supabase
        .from('post')
        .insert([
        { 
            image_path:formData.get("image_path"),
            cocktail_name:formData.get("cocktail_name"), 
            ingredients:formData.get("ingredients"), 
            procedures:formData.get("procedures"),
        },
        ])
        .select();

        if(error == null){
            successNotification("Cocktail Successfully Added!",10);
            //reload data
            getDatas();
            form_item.reset(); // Reset the form again before reloading
            setTimeout(() => {
                window.location.href = "upload.html"; // Replace with the URL of your upload page
            }, 3000);
        } else {
            errorNotification("Something wrong happened. Cannot add cocktail!",10);
            console.log(error);
            setTimeout(() => {
                getDatas();
                // Reset the form after reloading data
                form_item.reset();
            }, 3000); // Adjust the delay time as needed
        }

        form_item.reset();
        console.log(data);
        // alert("upload na!");
};



// Load data functionality
async function getDatas() {
    // Get all rows
    let { data: posts, error } = await supabase
        .from('post')
        .select('*')
        // .ilike("cocktail_name", "%" + search + "%");
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