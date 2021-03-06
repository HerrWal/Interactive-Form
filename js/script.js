// Name fiel focus
document.getElementById("name").focus();

/***Job Role section***/

// When the user selects "Other" on the job role dropdown a text field should appear.
const otherJob = document.getElementById("other-job-role");
otherJob.style.display = "none";
const jobRole = document.getElementById("title");
jobRole.addEventListener("input", (e) => {
  event.target.value === "other"
    ? (otherJob.style.display = "")
    : (otherJob.style.display = "none");
});

/***T-Shirt section***/

// Color selection disabled
color.disabled = true;

const designOptions = document.querySelectorAll(".shirt-designs option");
const colorOptions = document.querySelectorAll("#color option");

//  "Design" Listener to listen for user changes.
//  The Color dropdown shows selected design options only.
design.addEventListener("input", () => {
  color.disabled = false;
  const selected = event.target.value;
  for (let i = 0; i < colorOptions.length; i++) {
    const ColorOptionTheme = colorOptions[i].getAttribute("data-theme");
    const availableColors = () => {
      if (selected === ColorOptionTheme) {
        colorOptions[i].style.display = "";
        colorOptions[i].selected = true;
      } else {
        colorOptions[i].style.display = "none";
      }
    };
    availableColors();
  }
  colorOptions[0].style.display = "none";
});

/***Register for Activities section***/

// The total amount reflects sum of selected activities
const activities = document.getElementById("activities");
const total = document.getElementById("activities-cost");
let totalCost = 0;
activities.addEventListener("input", () => {
  const selectedCost = +event.target.getAttribute("data-cost");
  if (event.target.checked) {
    totalCost += selectedCost;
  } else {
    totalCost -= selectedCost;
  }
  total.innerHTML = `Total: $${totalCost}`;
});

/***Payment Info section***/

const paymentSelection = document.getElementById("payment");
const paymentOptions = document.querySelectorAll("#payment option");
const expirationBox = document.querySelector(".expiration-box");
const CreditCardBox = document.querySelector(".credit-card-box");
const paypal = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");
// Credit card payment selected and all other methods are not displayed
paymentSelection[1].selected = true;
paypal.style.display = "none";
bitcoin.style.display = "none";
// Listener to listen for changes in payment methods
// When a method is selected, all other payment sections are hidden
paymentSelection.addEventListener("input", () => {
  let paymentValue = event.target.value;
  switch (paymentValue) {
    case "credit-card":
      expirationBox.style.display = "";
      CreditCardBox.style.display = "";
      paypal.style.display = "none";
      bitcoin.style.display = "none";
      break;
    case "paypal":
      expirationBox.style.display = "none";
      CreditCardBox.style.display = "none";
      paypal.style.display = "";
      bitcoin.style.display = "none";
      break;
    case "bitcoin":
      expirationBox.style.display = "none";
      CreditCardBox.style.display = "none";
      paypal.style.display = "none";
      bitcoin.style.display = "";
      break;
  }
});

/***Form Validation***/

/*Helper functions*/

//The following functions evaluate the input and return a boolean

const nameField = document.getElementById("name");
const email = document.querySelector("#email");
const cc = document.getElementById("cc-num");
const zip = document.getElementById("zip");
const cvv = document.getElementById("cvv");

//Name validation helper
const nameValidation = () => {
  const nameFieldValue = nameField.value;
  const nameValidator = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/i.test(
    nameFieldValue
  );
  return nameValidator;
};

//Email validation helper
const emailvalidation = () => {
  const emailValue = email.value;
  const emailValidator = /^[^@]+@[^@.]+\.com+$/i.test(emailValue);
  return emailValidator;
};

//Activities validation helper
const actValidation = () => {
  const actValidator = /^\d\d\d$/.test(totalCost);
  return actValidator;
};

//CC validation helper
const ccValidation = () => {
  const ccValue = cc.value;
  const ccValidator = /^\d{13,16}$/.test(ccValue);
  return ccValidator;
};

//zip validation helper
const zipValidation = () => {
  const zipValue = zip.value;
  const zipValidator = /^\d{5}$/.test(zipValue);
  return zipValidator;
};

//CVV validation helper
const cvvValidation = () => {
  const cvv = document.getElementById("cvv").value;
  const cvvValidator = /^\d{3}$/.test(cvv);
  return cvvValidator;
};

/*** Accessibility ***/

// The following are web experiences programmed to make the form accessible

// Checkboxes are highlighted when focused while the rest are blurred.
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
for (let i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener("focus", () => {
    checkboxes[i].parentElement.classList.add("focus");
  });
  checkboxes[i].addEventListener("blur", () => {
    checkboxes[i].parentElement.classList.add("blur");
    checkboxes[i].parentElement.classList.remove("focus");
  });
}

// valid or not valid function. This adds indicators to the required elements input validations
// and display helpful hints to the user.
function validOrNot(field, valid1, valid2) {
  const label = field.parentElement;
  const hint = label.lastElementChild;
  label.classList.add(valid1);
  label.classList.remove(valid2);
  if ((hint.style.display = "none")) {
    hint.style.display = "inline";
  }
  if (valid1 === "valid") {
    hint.style.display = "none";
  }
}

/***Submit Listener***/

//This function contains all required fields validations
const allValidations = () => {
  if (!nameValidation()) {
    event.preventDefault();
    validOrNot(nameField, "not-valid", "valid");
  } else {
    validOrNot(nameField, "valid", "not-valid");
  }

  if (!emailvalidation()) {
    event.preventDefault();
    validOrNot(email, "not-valid", "valid");
  } else {
    validOrNot(email, "valid", "not-valid");
  }

  if (!actValidation()) {
    event.preventDefault();
    activities.classList.add("not-valid");
    activities.classList.remove("valid");
    document.getElementById("activities-hint").style.display = "inline";
    console.log("Not valid de la **** madre!");
  } else {
    activities.classList.add("valid");
    activities.classList.remove("not-valid");
    document.getElementById("activities-hint").style.display = "none";
    console.log("Deberia estar valid c***!");
  }

  if (paymentSelection[1].selected == true) {
    if (!ccValidation()) {
      event.preventDefault();
      validOrNot(cc, "not-valid", "valid");
    } else {
      validOrNot(cc, "valid", "not-valid");
    }

    if (!zipValidation()) {
      event.preventDefault();
      validOrNot(zip, "not-valid", "valid");
    } else {
      validOrNot(zip, "valid", "not-valid");
    }

    if (!cvvValidation()) {
      event.preventDefault();
      validOrNot(cvv, "not-valid", "valid");
    } else {
      validOrNot(cvv, "valid", "not-valid");
    }
  }
};

document.querySelector("form").addEventListener("submit", allValidations);

/***Extra Credit section***/

// Prevent users from registering for conflicting activities
activities.addEventListener("change", () => {
  const activitiesCheckboxes = document.querySelectorAll(
    'input[type="checkbox"]'
  );
  const checked = event.target;
  const checkdDayAndTime = checked.getAttribute("data-day-and-time");

  for (let i = 1; i < activitiesCheckboxes.length; i++) {
    const actDayAndTime =
      activitiesCheckboxes[i].getAttribute("data-day-and-time");
    if (
      checkdDayAndTime === actDayAndTime &&
      checked !== activitiesCheckboxes[i]
    ) {
      if (checked.checked) {
        activitiesCheckboxes[i].disabled = true;
      } else {
        activitiesCheckboxes[i].disabled = false;
      }
    }
  }
});

// Real-time error message. I chose the email validation.
// Conditional error message. I chose the email validation once again.
email.addEventListener("keyup", () => {
  if (!emailvalidation()) {
    event.preventDefault();
    validOrNot(email, "not-valid", "valid");
  } else {
    validOrNot(email, "valid", "not-valid");
  }

  if (email.value === "") {
    document.querySelector("#email-hint").innerHTML =
      "Please provide an Email Address";
  } else
    document.querySelector("#email-hint").innerHTML =
      "Email address must be formatted correctly";
});
