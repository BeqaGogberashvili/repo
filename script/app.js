// Variables

const steps = document.querySelectorAll(".step")
const nextButtons = document.querySelectorAll(".next")
const backButtons = document.querySelectorAll(".back")

const errors = document.querySelectorAll(".error");
const nameInput = document.querySelector(".name")
const email = document.querySelector(".email")
const phone = document.querySelector(".phone")
const date = document.querySelector(".date-input")

const nameError = document.querySelector(".name-error")
const nameErrorText = document.querySelector(".name-error-text")
const emailError = document.querySelector(".email-error")
const phoneError = document.querySelector(".phone-error")
const dateError = document.querySelector(".date-error")
const chessExperienceError = document.querySelector(".chess-experience-error")

const progress = document.querySelector(".first-square-personal-inside")
const secondBox = document.querySelector(".second-box")
const secondSquare = document.querySelector(".second-square-chess")

const x = document.querySelectorAll(".x")

let currentStep = 2
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

        switch (index) {

            case 0: // Landing Page
                currentStep++
                break;

            case 1: // Personal Information page

                // Name
                if (nameInput.value.length > 2) {
                    nameError.style.display = "none"
                    nameInput.classList.add("success-input")
                } else {
                    nameError.style.display = "block"
                    nameInput.classList.add("error-input")
                    if (nameInput.value == "") {
                        nameErrorText.innerText = "Name can not be empty"
                    } else {
                        nameErrorText.innerText = "Name must have more than 2 characters"
                    }
                }

                // Email
                if (email.value.split('@')[1] === 'redberry.ge') {
                    emailError.style.display = "none"
                    email.classList.add("success-input")
                } else {
                    emailError.style.display = "block"
                    email.classList.add("error-input")
                }

                // Phone
                if (phone.value.length === 9) {
                    phoneError.style.display = "none"
                    phone.classList.add("success-input")
                } else {
                    phoneError.style.display = "block"
                    phone.classList.add("error-input")
                }

                // Date
                if (date.value !== "") {
                    dateError.style.display = "none"
                    date.classList.add("success-input")
                } else {
                    dateError.style.display = "block"
                    date.classList.add("error-input")
                }


                // If errors are hidden, inputs are valid
                let valid = true;
                let errorCounter = 0;
                errors.forEach(error => {
                    if (error.style.display == "block") {
                        valid = false;
                        errorCounter++
                    }
                    if (errorCounter < 4) {
                        progress.style.backgroundColor = "#E9FAF1"
                    } else {
                        progress.style.backgroundColor = "white"
                    }
                })

                if (valid === true) {
                    currentStep++
                }
                break;

            case 2: // Chess Experience Page

                const boxInputFirst = document.querySelectorAll(".box-input-first")
                const boxInputSecond = document.querySelectorAll(".box-input-second")
                const participatedQuestion = document.querySelectorAll(".participated-question")

                // Since custom select actualy has radios in it, it's last value serves as placeholder. 
                // First 2 variables look if the last radio is checked, which means user didn't choose option.
                const knowledge = boxInputFirst[boxInputFirst.length - 1].checked
                const character = boxInputSecond[boxInputSecond.length - 1].checked
                const participated = (participatedQuestion[0].checked === false && participatedQuestion[1].checked === false)

                // If ture (User left them unchecked) display error
                if (knowledge || character || participated) {
                    chessExperienceError.style.display = "block"
                } else { // Otherwise submit form
                    chessExperienceError.style.display = "none"
                    currentStep++
                }

                // Light progress bar green
                // If any of them are false (Some have been checked) give Chess Experience progress bar green background
                if (!knowledge || !character || !participated) {
                    secondSquare.style.backgroundColor = "#E9FAF1";
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

// Remove error styling oninput
function removeErrorClass(element, elementError) {
    element.classList.remove("error-input")
    element.classList.remove("success-input")
    elementError.style.display = "none"
}

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
            boxOption.innerHTML = record.name + `<img
            src=".`+ record.image + `">`

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


