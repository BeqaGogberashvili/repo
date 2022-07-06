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

const progress = document.querySelector(".first-square-personal-inside")

const x = document.querySelectorAll(".x")


x.forEach(element => {
    element.addEventListener("click", (e) => {
        e.target.parentElement.parentElement.style.display = "none"
    })
});



let currentStep = 0;
displayCurrentStep(currentStep);


function displayCurrentStep(currentStep) {
    steps.forEach(step => {
        step.style.display = "none"
    });
    steps[currentStep].style.display = "block"
}


nextButtons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
        e.preventDefault()

        switch (index) {

            case 0:
                currentStep++
                break;

            case 1:

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
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
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
                let valid
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
                    currentStep++;
                }
                break;

            case 2:
                currentStep++
                break;
        }

        displayCurrentStep(currentStep)
    })
})

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

function removeErrorClass(element, elementError) {
    element.classList.remove("error-input")
    element.classList.remove("success-input")
    elementError.style.display = "none"
}