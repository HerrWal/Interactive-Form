document.getElementById("name").focus();

const otherJob = document.getElementById("other-job-role");
otherJob.style.display = "none";

const jobRole = document.getElementById("title");

jobRole.addEventListener("input", (e) => {
  event.target.value === "other"
    ? (otherJob.style.display = "")
    : (otherJob.style.display = "none");
});

color.disabled = true;

const designOptions = document.querySelectorAll(".shirt-designs option");
const colorOptions = document.querySelectorAll("#color option");

// Program the "Design" <select> element to listen for user changes.
design.addEventListener("input", () => {
  // When a change is detected:
  // - The "Color" <select> element should be enabled.
  color.disabled = false;
  const selected = event.target.value;
  // - The "Color" <select> element should display an available color.
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

//"Register for Activities" section
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
  total.innerHTML = `Total:$${totalCost}`;
});

// "Payment Info" section
const paymentSelection = document.getElementById("payment");
const paymentOptions = document.querySelectorAll("#payment option");
paymentSelection[1].selected = true;

paymentSelection.addEventListener("input", () => {
  const expirationBox = document.querySelector(".expiration-box");
  const CreditCardBox = document.querySelector(".credit-card-box");
  if (paymentSelection[1].selected == false) {
    expirationBox.style.display = "none";
    CreditCardBox.style.display = "none";
  } else if (paymentSelection[1].selected == true) {
    expirationBox.style.display = "";
    CreditCardBox.style.display = "";
  }
});

/***Form Validation***/

//Helper functions

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
  const emailValidator = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
  return emailValidator;
};

//Activities validation helper
const actValidation = () => {
  const actValidator = totalCost > 0;
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

//Checkboxes
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

/***Submit Listener***/
document.querySelector("form").addEventListener("submit", () => {
  // valid or not valid function
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
});
