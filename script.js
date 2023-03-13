//DOM REFERENCER
const sourceDiv = document.querySelector("#source") //mad container
const targetDiv = document.querySelectorAll(".animal") //alle dyr
const dragBoxes = document.querySelectorAll("#source div") //hver enkelt mad-ret
const pointNumber = document.querySelector("#point-number") //point tavle

//EVENTS
    //Vi looper over alle mad-retter og sætter en drag event på hver
dragBoxes.forEach(function(element){
    element.addEventListener("dragstart", startDrag)
})

    //Vi looper over alle dyr og sætter drop events på hver
targetDiv.forEach(function(element){
        //Bemærk vi må aflyse default dragover event fordi browsere er dumme
    element.addEventListener("dragover", cancelDefault)
    element.addEventListener("drop", dropped)
})

//FUNKTIONER

function cancelDefault (event){
    //Utility funktion til at aflyse events
    event.preventDefault();
}

function startDrag(event){
        //Drag og drop events har begge adgang til dataTransfer
        //på den måde kan vi overføre data fra drag event til
        //drop event
        //Vi hugger de data vi skal overføre fra HTML (id og data) attributerne:
    event.dataTransfer.setData("elmId", this.id)
    event.dataTransfer.setData("elmFood", this.dataset.food)
}

function dropped (event){
        //Se bare hvordan vi kan nappe data fra dataTransfer
    let sourceId = event.dataTransfer.getData("elmId")
    let sourceFood = event.dataTransfer.getData("elmFood")

        //Her er hele spillets logik
        //"this" peger i en eventlytter på
        //det element som eventen er sat på
        //da det er dropeventen vi har fat på er:
        // this.dataset.food altså dyrets data-food attribut
        //Så nu kan vi bare checke om de matcher de data der er i
        //dataTransfer
    if (sourceFood == this.dataset.food){
        let heart = document.createTextNode("❤")
        this.appendChild(heart)
        pointNumber.innerHTML = parseInt(pointNumber.innerHTML) + 100
        
    }
    else{
        alert("Bvadr!")
        pointNumber.innerHTML = parseInt(pointNumber.innerHTML) - 100
        sourceDiv.removeChild(document.getElementById(sourceId))
    }
}