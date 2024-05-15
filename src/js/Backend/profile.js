import { supabase } from "../main";

const userId = localStorage.getItem("user_id");
const profileimage = "https://hiyluoiecwditapzngvr.supabase.co/storage/v1/object/public/profile/";
const defaultProfileImage = "https://hiyluoiecwditapzngvr.supabase.co/storage/v1/object/public/profile/public/DP1.jpg"; 

console.log(userId);
getDatas();

async function getDatas() {
  try {
    let { data: profiles, error: userError } = await supabase
      .from("user_info")
      .select("*")
      .eq("id", userId);

    if (userError) {
      throw userError;
    }

    let container = "";
    let container2 = "";
    let container3 = "";

    profiles.forEach((user_info) => {
      const imagePath = user_info.image_path ? user_info.image_path : defaultProfileImage;

      container += `
        <div class="name" id="photoName">${user_info.username}</div> 
        <div class="id">${user_info.id}</div>`;

      container2 += `<div class="item">
        <i class="fa-solid fa-user"></i>
        <span id="name" onclick="edit('name')">${user_info.username}</span> <!-- Click to edit the name -->
        <div class="icon" onclick="edit('name')">
            <i class="fa-solid fa-chevron-right"></i>
        </div>
      </div>`;

      container3 += `<img data-id="${imagePath}" src="${profileimage + imagePath}" alt="" id="photo">`;
    });

    document.getElementById("container1").innerHTML = container;
    document.getElementById("container2").innerHTML = container2;
    document.getElementById("profileContainer").innerHTML = container3;
  } catch (error) {
    console.error(error);
  }
}

document.getElementById("file").addEventListener("change", async (event) => {
  const file = event.target.files[0];

  if (file) {
    try {
      const { data, error } = await supabase.storage
        .from('profile')
        .upload(`public/${file.name}`, file);

      if (error) {
        throw error;
      }

      const imagePath = data.path;
      const { data: updateData, error: updateError } = await supabase
        .from('user_info')
        .update({ image_path: imagePath })
        .eq('id', userId);

      if (updateError) {
        throw updateError;
      }

      getDatas();
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload image.');
    }
  } else {
    alert('Please select a file to upload.');
  }
});
