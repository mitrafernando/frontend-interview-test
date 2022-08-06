//Selectors
const generateTextContainer = document.querySelector("#generated-text-container");
const generateText = document.querySelector("#generated-text");
const textColor = document.querySelector("#text-colors");
const textInput = document.querySelector("#text-input");
const progressIcon = document.querySelector("#progress-icon");
const sizeInput = document.querySelector("#size-input");
const sizeText = document.querySelector("#size-text");
const btnSave = document.querySelector("#btn-save");
const saveModal = document.querySelector("#save-modal");
const charsContainer = document.querySelector(".chars-container");
const modalContent = document.querySelector(".modal__content");
const modalClose = document.querySelector(".modal__close_button");

//Event Listeners
textInput.addEventListener("input", changeText);
textColor.addEventListener("click", changeTextColor);
sizeInput.addEventListener("input", changeSizeText);
btnSave.addEventListener("click", save);
modalClose.addEventListener("click", closeModal);

//functions
function changeText(event = null) {
    let text = "MetaPals Awesome".split("");
    if (event) {
        text = event.target.value.split("");
    }
    progressIcon.children[0].classList.add("animate-ping");
    charsContainer.innerHTML = "";
    let reverse = true;
    text.forEach(t => {
        const char = document.createElement("span");
        char.style = "display: inline-block; touch-action: none; cursor: grab; user-select: none; opacity: 1; transform: translate3d(0px, 40px, 0px);";
        Draggable.create(char, {type:"x,y", edgeResistance:0.65, bounds:"body", inertia:true});
        if (t == " ") {
            char.innerHTML = "&nbsp;";
        } else {
            char.innerHTML = t;
        }
        charsContainer.appendChild(char);
        if (reverse) {
            anime({
                targets: char,
                translateY: [60, 0],
            });
        } else {
            anime({
                targets: char,
                translateY: [-60, 0],
            });
        }
        reverse = !reverse;
    });
    setTimeout(function() {
        progressIcon.children[0].classList.remove("animate-ping");
    }, 1000);
}

function changeTextColor(event) {
    const backgroundColor = event.target.style.backgroundColor;
    for (let i=0; i<textColor.children.length; i++){
        textColor.children[i].style.borderColor = "white";
    }
    event.target.style.borderColor = "olivedrab";
    generateTextContainer.style.color = backgroundColor;
}

function changeSizeText(event) {
    sizeText.innerHTML = event.target.value+"px";
    generateText.style.fontSize = event.target.value+"px";
}

function save() {
    saveModal.style.top = "10%";
    modalContent.innerHTML = "";
    html2canvas(generateText).then(canvas => {
        modalContent.appendChild(canvas);
    });
}

function closeModal() {
    saveModal.style.top = "-100%"; 
}

changeText();