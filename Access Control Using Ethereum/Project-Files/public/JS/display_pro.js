const form = document.getElementById("display-validity-form");

form.addEventListener("submit",(event)=>{
    event.preventDefault();
    let id = form.childNodes[1].id;
    id = id.split("-")[1];
    
    $.ajax({
        type: "POST",
        url: `/action/validate/hash/${id}`
    }).then((data)=>{
        console.log(data.message);
        if(data.message){
            alert("The hash is not changed!");
        }else{
            alert("Hash has been changed!")
        }
    })
    .catch((err)=>{
        console.log(err)
    })

})