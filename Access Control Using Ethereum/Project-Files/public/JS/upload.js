let hash = document.getElementById("hash");
let description = document.getElementById("description");
let button = document.getElementById("sign-up-button");

let valHash = false;
let valDesc = false;

// alert("QmfGetFuPL9mCzw1g4wH82WXw5kTnwr8UyEpLcD5mwEe4J".length)


function handleInput(event)
{

   if(event.target.id === "hash")
   {
        if(event.target.value.length !== 46)
        {
            document.getElementById("hash-error").innerHTML = "Hash cannot be empty!";
            valHash = false;
        }else{
            document.getElementById("hash-error").innerHTML = "";
            valHash = true;
        }
   }

   if(event.target.id == "description")
   {
        if(!event.target.value.length)
        {
            document.getElementById("description-error").innerHTML = "Description cannot be empty!";
            valDesc = false;
        }else{
            document.getElementById("description-error").innerHTML = "";
            valDesc = true;
        }
   }

   if(valHash && valDesc )
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

hash.addEventListener("input",handleInput);
description.addEventListener("input",handleInput);