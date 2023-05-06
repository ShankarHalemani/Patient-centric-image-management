let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let button = document.getElementById("sign-up-button");

let valUser = false;
let valEmail = false;
let valPass = false;

let regX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


function handleInput(event)
{
   if(event.target.id == "username")
   {
        if(event.target.value.length <= 2)
        {
            document.getElementById("username-error").innerHTML = "username must contain atleast three charecters!";
            valUser = false;
        }else{
            document.getElementById("username-error").innerHTML = "";
            valUser = true;
        }
   }

   if(event.target.id === "password")
   {
        if(event.target.value.length <= 7)
        {
            document.getElementById("password-error").innerHTML = "Password must contain atleast eight charecters!";
            valPass = false;
        }else{
            document.getElementById("password-error").innerHTML = "";
            valPass = true;
        }
   }

   if(event.target.id == "email")
   {
        if(!regX.test(event.target.value))
        {
            document.getElementById("email-error").innerHTML = "Email is not valid!";
            valEmail = false;
        }else{
            document.getElementById("email-error").innerHTML = "";
            valEmail = true;
        }
   }

   if(valEmail && valPass && valUser)
   {
        button.disabled = false;
        button.style.background = "rgba(13,77,117,1)";
        button.style.cursor = "pointer";
   }else{
        button.disabled = true;
        button.style.background = "silver";
        button.style.cursor = "not-allowed";
   }
}

username.addEventListener("input",handleInput);
email.addEventListener("input",handleInput);
password.addEventListener("input",handleInput);