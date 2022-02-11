console.log("test");

document.getElementById('name').focus();


const otherJob = document.getElementById('other-job-role')
otherJob.style.display='none';

const jobRole = document.getElementById('title');

jobRole.addEventListener('input', e => {
event.target.value === 'other' ? otherJob.style.display = '' : otherJob.style.display = 'none';
});

color.disabled = true;

const designOptions = document.querySelectorAll('.shirt-designs option');
const colorOptions = document.querySelectorAll('#color option');

// Program the "Design" <select> element to listen for user changes.
design.addEventListener('input', () => { 
// When a change is detected:
// - The "Color" <select> element should be enabled.
    color.disabled = false;
    const selected = event.target.value;
// - The "Color" <select> element should display an available color.
    for (let i = 0; i < colorOptions.length; i++) {
        const ColorOptionTheme = colorOptions[i].getAttribute('data-theme');
        const availableColors = () => {            
           if (selected === ColorOptionTheme) {
            colorOptions[i].style.display = ''
            colorOptions[i].selected = true;
           } else {
            colorOptions[i].style.display = 'none';
           }
        }
        availableColors()          
    }
    colorOptions[0].style.display = 'none';
});

//"Register for Activities" section
const activities = document.getElementById('activities');
const total = document.getElementById('activities-cost');
let totalCost = 0;
activities.addEventListener('input', () => {
    const selectedCost = +event.target.getAttribute('data-cost');
    if (event.target.checked) {
        totalCost += selectedCost;
    } else {
        totalCost -= selectedCost
    }
    console.log(totalCost)
    total.innerHTML = `Total: ${totalCost}`;
});

// "Payment Info" section
const paymentSelection = document.getElementById('payment');
const paymentOptions = document.querySelectorAll('#payment option');
paymentSelection[1].selected = true;

paymentSelection.addEventListener('input',() => {
    const expirationBox = document.querySelector('.expiration-box')
    const CreditCardBox = document.querySelector('.credit-card-box')
    if (paymentSelection[1].selected == false) {
        expirationBox.style.display = 'none';
        CreditCardBox.style.display = 'none';        
    } else {
        expirationBox.style.display = '';
        CreditCardBox.style.display = '';
    }
});

/***  Form Validation ***/

//Helper function for name validation.
const nameValidation = () => {
    const nameField = document.getElementById('name');
    const nameValidator = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameField);    
    return nameValidator
}

//Helper function for email validation.
const emailvalidation = () => {
    const email = document.querySelector("#email");
    const emailValue = email.value;
    const emailValidator = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue)    
    return emailValidator
}

//Helper function for activities validation
const actValidation = () => {
    const actValidator = totalCost > 0;
    return actValidator
}

//Helper function for CC validation
const ccValidation = () => {
    const CreditCardBox = document.querySelector('.credit-card-box')
    const ccValue = CreditCardBox.value;
    const ccValidator = /^\d{13,16}$/.test(ccValue);
    return ccValidator
}

document.querySelector('form').addEventListener('submit', () => {
    if (!nameValidation()) {
        event.preventDefault();
        console.log('Name field cannot be empty');
    }

    if (!emailvalidation()) {
        event.preventDefault();
        console.log('Please enter the username, followed by “@”, followed by a few more characters and a “.com” for the domain name.');
    }

    if (!actValidation()) {
        event.preventDefault();
        console.log('Select at least one activity')
    }

    if (paymentSelection[1].selected = true) {
        if (!ccValidation()) {
            event.preventDefault()
            console.log('Must contain a 13 - 16 digit credit card number with no dashes or spaces.');
        }
    }
});