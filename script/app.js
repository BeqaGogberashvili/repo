const steps = document.querySelectorAll(".step")
const nextButtons = document.querySelectorAll(".next")
const backButtons = document.querySelectorAll(".back")


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
                currentStep++
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


