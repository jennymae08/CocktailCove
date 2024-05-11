// Import our custom CSS
import '../scss/styles.scss';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

//import router
import { setRouter } from './router/router.js';

//import supabase
import { createClient } from '@supabase/supabase-js';

//set router
setRouter();

// Create a single supabase client for interacting with your database
const supabase = createClient('https://hiyluoiecwditapzngvr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpeWx1b2llY3dkaXRhcHpuZ3ZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5OTYyNDEsImV4cCI6MjAyODU3MjI0MX0.DzIc_se3R1JfqetsjaNc7AqW-Fdcb-xqtI-SU1lxAOs');

//notification
function successNotification(message,seconds = 0) {
    document.querySelector(".alert-success").classList.remove("d-none");
    document.querySelector(".alert-success").classList.add("d-block");
    document.querySelector(".alert-success").innerHTML = message;

    if(seconds != 0){
        setTimeout(function(){
            document.querySelector(".alert-success").classList.remove("d-block");
            document.querySelector(".alert-success").classList.add("d-none");
        },seconds * 1000);
    }
}

function errorNotification(message,seconds = 0) {
    document.querySelector(".alert-danger").classList.remove("d-none");
    document.querySelector(".alert-danger").classList.add("d-block");
    document.querySelector(".alert-danger").innerHTML = message;

    if(seconds != 0){
        setTimeout(function(){
            document.querySelector(".alert-danger").classList.remove("d-block");
            document.querySelector(".alert-danger").classList.add("d-none");
        },seconds * 1000);
    }

}

async function doLogout (){
    let { error } = await supabase.auth.signOut();

    if (error == null){
        successNotification("Logout Successfully!");
        localStorage.clear();

        //redirect to login page
        window.location.pathname = "/index.html";
    }else{
        errorNotification("Logout Failed!",15);
    }
}
export{supabase, successNotification, errorNotification,doLogout};