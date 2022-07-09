// Variables

const steps = document.querySelectorAll(".step")
const nextButtons = document.querySelectorAll(".next")
const backButtons = document.querySelectorAll(".back")
const errors = document.querySelectorAll(".error");
const nameInput = document.querySelector(".name")
const email = document.querySelector(".email")
const phone = document.querySelector(".phone")
const date = document.querySelector(".date-input")
const x = document.querySelectorAll(".x")
const nameError = document.querySelector(".name-error")
const nameErrorText = document.querySelector(".name-error-text")
const emailError = document.querySelector(".email-error")
const phoneError = document.querySelector(".phone-error")
const dateError = document.querySelector(".date-error")
const chessExperienceError = document.querySelector(".chess-experience-error")
const successInput = document.querySelectorAll(".success-input")
const dateStar = document.querySelector(".date-star")
const progressPersonal = document.querySelector(".first-square-personal-inside")
const progressChess = document.querySelector(".second-square-personal-inside")
const participatedQuestion = document.querySelectorAll(".participated-question")
const secondBox = document.querySelector(".second-box")
const secondSquare = document.querySelector(".second-square-chess")
const boxInputFirst = document.querySelectorAll(".box-input-first")
let boxInputSecond; // 'Choose your character selector' is generated from API and creating variable requires delay
setTimeout(createBoxInputSecond, 150)
function createBoxInputSecond() {
    boxInputSecond = document.querySelectorAll(".box-input-second")
}


let currentStep = 0
displayCurrentStep(currentStep)

// Functions

// Display
function displayCurrentStep(currentStep) {
    steps.forEach(step => {
        step.style.display = "none"
    });
    steps[currentStep].style.display = "block"
}


// Next button
nextButtons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
        e.preventDefault()
        const data = JSON.parse(localStorage.getItem("data"))
        switch (index) {

            case 0: // Landing Page
                currentStep++
                break;

            case 1: // Personal Information page
                //Validating

                // Name
                if (data.name.length > 2) {
                    nameError.style.display = "none"
                } else {
                    nameError.style.display = "block"
                    nameInput.classList.add("error-input")
                    if (data.name == "") {
                        nameErrorText.innerText = "Name can not be empty"
                    } else {
                        nameErrorText.innerText = "Name must have more than 2 characters"
                    }
                }
                // Email
                if (data.email.split('@')[1] === 'redberry.ge') {
                    emailError.style.display = "none"
                } else {
                    emailError.style.display = "block"
                    email.classList.add("error-input")
                }
                // Phone
                if (data.phone.length === 9) {
                    phoneError.style.display = "none"
                } else {
                    phoneError.style.display = "block"
                    phone.classList.add("error-input")
                }
                // Date
                if (data.date_of_birth !== "") {
                    dateError.style.display = "none"
                } else {
                    dateError.style.display = "block"
                    date.classList.add("error-input")
                }
                // If errors are hidden, inputs are valid
                let valid = true;
                errors.forEach(error => {
                    if (error.style.display == "block") {
                        valid = false;
                    }
                })
                if (valid) {
                    currentStep++
                }
                break;

            case 2: // Chess Experience Page

                if (data.experience_level !== "" && data.already_participated !== "" & data.character_id !== "") {

                    data.character_id = parseInt(data.character_id)
                    if (data.already_participated === "true") {
                        data.already_participated = true
                    } else {
                        data.already_participated = false
                    }

                    fetch("https://chess-tournament-api.devtest.ge/api/register", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                    currentStep++
                }

                break;
        }

        displayCurrentStep(currentStep)
    })
})


// Back button
backButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        // Hiding errors
        errors.forEach(error => {
            error.style.display = "none";
        });

        currentStep--
        displayCurrentStep(currentStep)
    })
})



// Popup X button
x.forEach(element => {
    element.addEventListener("click", (e) => {
        e.target.parentElement.parentElement.style.display = "none"
    })
});

// Custom date picker
flatpickr(".date-input", {});

// Getting data from API & Generating select

const current = document.createElement("div")
current.classList.add("current")
current.setAttribute("tabindex", "1")

const boxList = document.createElement("ul")
boxList.classList.add("box-list", "box-list-second")

fetch("https://chess-tournament-api.devtest.ge/api/grandmasters")
    .then(result => result.json())
    .then(data => {
        data.forEach((record, index) => {
            const boxValue = document.createElement("div")
            boxValue.classList.add("box-value")

            const boxInput = document.createElement("input")
            boxInput.classList.add("box-input", "box-input-second")
            boxInput.setAttribute("type", "radio")
            boxInput.setAttribute("id", index)
            boxInput.setAttribute("name", "second-box")
            boxInput.setAttribute("value", index + 1)
            boxInput.setAttribute("checked", "checked")

            const boxInputText = document.createElement("p")
            boxInputText.classList.add("box-input-text")
            boxInputText.innerHTML = record.name

            // Total
            if (index === 0) {
                const totalLi = document.createElement("li")
                const totalLiText = document.createElement("h5")
                totalLiText.innerText = `(Total ` + data.length + `)`
                totalLi.appendChild(totalLiText)
                boxList.appendChild(totalLi)
            }

            const boxOptionLi = document.createElement("li")
            const boxOption = document.createElement("label")
            boxOption.classList.add("box-option", "second-box-option")
            boxOption.setAttribute("for", index)
            boxOption.setAttribute("value", index)
            boxOption.innerHTML = record.name + `<img
            src="https://chess-tournament-api.devtest.ge/`+ record.image + `">`

            boxOptionLi.appendChild(boxOption)
            boxList.appendChild(boxOptionLi)

            boxValue.appendChild(boxInput)
            boxValue.appendChild(boxInputText)

            current.appendChild(boxValue)
            // Adding placeholder
            if (index + 1 === data.length) {
                const chooseYourCharacter = document.createElement("div")
                chooseYourCharacter.innerHTML = `<div class="box-value">
<input class="box-input box-input-second" type="radio" name="second-box" checked="checked" />
<p class="box-input-text">Choose your character<span class="star">
        *</span></p>
</div>`
                current.appendChild(chooseYourCharacter)
            }
        })
    })

const arrow = document.createElement("img")
arrow.setAttribute("src", "./images/Select-arrow.svg")
arrow.classList.add("box-icon")

current.appendChild(arrow)

secondBox.appendChild(current)
secondBox.appendChild(boxList)


// Oninput Validation

function validation(input) {

    switch (input.name) {

        case "name":
            setLocal(input, 0, input.value.length > 2)
            break;

        case "email":
            setLocal(input, 1, input.value.split('@')[1] === 'redberry.ge')
            break;

        case "phone":
            setLocal(input, 2, phone.value.length === 9)
            break;
    }

}


function setLocal(input, index, condition,) {
    if (condition) {
        successInput[index].style.display = "block"
        progressPersonal.style.backgroundColor = "#E9FAF1"

    } else {
        successInput[index].style.display = "none"
    }
    updateDataLocaly(input.name, input.value)
    input.classList.remove("error-input")
}

// Date input needs special treatment since it's not default date type
date.addEventListener('change', () => {
    if (date.value !== "") {
        date.value = convertDateToDefault(date.value)

        updateDataLocaly("date_of_birth", date.value)

        dateStar.style.display = "none"
        successInput[3].style.display = "block"
        progressPersonal.style.backgroundColor = "#E9FAF1"
    }
})



// Converting date to match API
function convertDateToDefault(date) {
    return date.slice(5, 7) + '/' + date.slice(8) + '/' + date.slice(0, 4)
}


// On Page Load

// Create empty object in localStorage or parse data from already created one
if (localStorage.getItem("data") === null) {
    const data = {
        "name": "",
        "email": "",
        "phone": "",
        "date_of_birth": "",
        "experience_level": "",
        "already_participated": "",
        "character_id": ""
    }
    localStorage.setItem("data", JSON.stringify(data))
}

const data = JSON.parse(localStorage.getItem("data"))
//      Personal Information
nameInput.value = data.name
email.value = data.email
phone.value = data.phone
date.value = data.date_of_birth

const validArray = [nameInput.value.length > 2, email.value.split('@')[1] === 'redberry.ge', phone.value.length === 9, date.value !== ""]

for (let i = 0; i < 4; i++) {
    if (validArray[i]) {
        progressPersonal.style.backgroundColor = "#E9FAF1"
        successInput[i].style.display = "block"
    }
}

if (date.value !== "") {
    dateStar.style.display = "none"
}

//      Chess Experience

// Level of knowledge
boxInputFirst.forEach(element => {
    element.addEventListener('change', () => {
        updateDataLocaly("experience_level", element.value)
    })
    if (element.value == data.experience_level) {
        element.checked = true;
        progressChess.style.backgroundColor = "#E9FAF1"
    }
})
// Choose your character
setTimeout(boxInputSecondDelay, 150)
function boxInputSecondDelay() {
    boxInputSecond.forEach(element => {
        element.addEventListener('change', () => {
            updateDataLocaly("character_id", element.value)
        })
        if (element.value == data.character_id) {
            element.checked = true;
            progressChess.style.backgroundColor = "#E9FAF1"
        }
    });
}
// Participated question
participatedQuestion.forEach(element => {
    element.addEventListener('change', () => {
        updateDataLocaly("already_participated", element.value)
    })
})
if (data.already_participated === "true") {
    document.querySelector(".answer-yes").checked = true
}
if (data.already_participated === "false") {
    document.querySelector(".answer-no").checked = true
}


// Make changes in localStorage object
function updateDataLocaly(key, value) {
    const data = JSON.parse(localStorage.getItem("data"))
    data[key] = value
    localStorage.setItem("data", JSON.stringify(data))
}