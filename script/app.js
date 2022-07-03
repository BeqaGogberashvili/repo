
const contentLeft = document.querySelector(".content-left")







const steps = document.querySelectorAll(".step")

const nextButtons = document.querySelectorAll(".next")
const backButtons = document.querySelectorAll(".back")


let currentStep = 0;
displayCurrentStep(currentStep);




function displayCurrentStep(currentStep) {
    // Removing active class from any other step
    steps.forEach(step => {
        step.style.display = "none"
    });
    // Adding to current one
    steps[currentStep].style.display = "block"
}



// Next button

nextButtons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
        // Preventing form from submitting
        e.preventDefault()

        switch (index) {

            case 0:
                currentStep++
                break;

            case 1:
                currentStep++
                break;
        }

        displayCurrentStep(currentStep)
    })
})


backButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        currentStep--
        displayCurrentStep(currentStep)
    })
})







// window.onclick = function (event) {


//     if (event.target === firstInput) {

//         window.onclick = () => {

//             if (firstInput.value === "") {
//                 error.style.display = "block";
//             } else {
//                 error.style.display = "none";
//             }

//         }
//     }

// }


