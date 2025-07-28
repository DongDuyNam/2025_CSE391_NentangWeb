// console.log("Hello World")

var form1 = document.getElementById('Form1')
var name = document.getElementById('Name')
var output1 = document.getElementById('Output1')

form1.addEventListener('submit', function(event){
    event.preventDefault();

    var username = Name.value.trim()
    if(username){
        output1.textContent = `Hello ${username}`;
    }
    else{
        output1.textContent='Vui Long nhap ten'
    }
})
Name.addEventListener('input', function() {
    output1.style.color = "#28a745"; 
});

var form2 = document.getElementById('Form2')
var so1 = document.getElementById("So1")
var so2 = document.getElementById("So2")
var output2 = document.getElementById("Output2")

form2.addEventListener('submit', function(event){
    event.preventDefault();

    var inputso1 = parseInt(so1.value.trim())
    var inputso2 = parseInt(so2.value.trim())
    if(!isNaN(inputso1) && !isNaN(inputso2)){
        output2.textContent = inputso1 + inputso2
    }
    else if(!isNaN(inputso1)){
        output2.textContent= inputso1 + 0
    }
    else if(!isNaN(inputso2)){
        output2.textContent= inputso2 + 0
    }
    else{
        output2.textContent = 'Hay nhap it nhat 1 so'
    }
})