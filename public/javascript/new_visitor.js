const dateInput = document.getElementById("dateOfVisit");
const ageInput = document.getElementById("age");
const nameInput = document.getElementById("firstName");
const assistedByInput = document.getElementById("assistedBy");

ageInput.addEventListener("blur", (event) => {
  const age = parseInt(event.target.value);

  if (age > 120) {
    const confirmAge = confirm("Are you sure your age is " + age + "?");
    if (!confirmAge) {
      event.target.value = "";
    }
  }

  if (age < 1) {
    alert("Invalid age, please insert age greater that 0.");
    event.target.value = "";
  }
});

dateInput.addEventListener("input", (event) => {
  const selectedDate = new Date(event.target.value);
  const currentDate = new Date();

  if (selectedDate > currentDate) {
    alert("Please select a date that is not in the future.");
    event.target.value = "";
  }
});

nameInput.addEventListener("blur", (event) =>{
  validateName(event, "Visitor");
})

assistedByInput.addEventListener("blur", (event) => {
  validateName(event, "Assistant");
})

function validateName(event, visitorOrAssistedBy) {
  const name = event.target.value;
  const nameParts = name.split(" ");

  const namePartsValid = nameParts.length === 2;
  const isNotInitial = (part) => part.length > 1;

  if (!namePartsValid || !nameParts.every(isNotInitial)) {
    alert(`Invalid ${visitorOrAssistedBy} name, please provide full first name and full last name.`);
    event.target.value = "";
  }
}
