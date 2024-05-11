import { supabase,successNotification, errorNotification } from "../main";

const form_register = document.getElementById("form_register");

form_register.onsubmit = async (e) => {
    e.preventDefault();


    //disable submit button
    document.querySelector("#form_register button").disabled = true;
    document.querySelector("#form_register button").innerHTML = '<div class = "spinner-border me-2" role="status"></div><span class="button-reload">Loading...</span>';

    //get all values 
    const formData = new FormData(form_register);

    if (formData.get("password") == formData.get("password_confirmation")){
        // alert("Password does match");

        const { data, error } = await supabase.auth.signUp({
            email: formData.get("email"),
            password: formData.get("password"),
          });

          let user_id = data.user.id;

          if (user_id != null){
            const {data, error} = await supabase
            .from("user_info")
            .insert([
                {
                    username: formData.get("username"),
                    contact: formData.get("contact"),
                    birthdate: formData.get("birthdate"),
                    user_id: user_id,
                },
            ])
            .select();

            if(error == null) successNotification("Registered Successfully!",10);
            else{
                errorNotification("Something wrong, try again.",10);
                console.log(error);

            }
            form_register.reset();

            //enable suubmit button
            document.querySelector("#form_register button").disabled = false;
            document.querySelector("#form_register button").innerHTML = 'Register';
        }
  

    }else{
        errorNotification("Password confirmation does not match!");
        
        // Reset form
        form_register.reset();

        // Enable submit button
        document.querySelector("#form_register button").disabled = false;
        document.querySelector("#form_register button").innerHTML = 'Register';
    }
    

    // alert("Registered Successfully!");

    
};

