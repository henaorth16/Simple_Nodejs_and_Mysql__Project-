var head = document.querySelector("h1")
var messages = document.querySelectorAll("#message")

var tbody = document.querySelector("tbody")


messages.forEach(message=>{
    var dialogue = document.querySelector(".dialogue")

    var sliced = message.innerHTML.slice(0, 15)+`...`;
    var unSlice = message.innerHTML.slice()
    message.innerHTML = sliced;

    message.addEventListener("click", ()=>{
        var sliced = message.innerHTML.slice()

        dialogue.style.display = "block"
        dialogue.innerHTML = unSlice + `<span id="close">X</span>`
        
        var close = document.querySelector("#close");
        close.addEventListener("click", () =>{
            dialogue.style.display="none"
        });
    })

    
}) 

