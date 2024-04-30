const { errorMessage, regex } = require("./helper_objects");

const isResponseEmpty = (results) => results.rowCount === 0;

const getStatus = (error, id) => {
  let status;
  switch (error.message) {
    case errorMessage.visitorDoesNotExist(id) || errorMessage.visitorsTableEmpty:
      status = 404;
      break;

    case errorMessage.requestError + errorMessage.severError:
      status = 500;
      break;

    default:
      status = 400;
      break;
  }

  return status;
};

function validateNameFormat(name, visitorOrAssistant) {
  validate(
    name,
    errorMessage.notLastAndFirstName(visitorOrAssistant),
    errorMessage.nameContainsInitials(visitorOrAssistant),
    errorMessage.nameNull(visitorOrAssistant)
  );

  function validate(name, partsLenErr, initialsErr, nameNullErr) {
    if (!name) {
      throw new Error(nameNullErr);
    }

    const nameParts = name.split(" ");

    const isNotInitial = (part) => part.length > 1;
    if (!nameParts.every(isNotInitial)) {
      throw new Error(initialsErr);
    }

    if (nameParts.length !== 2) {
      throw new Error(partsLenErr);
    }
  }
}

function validateAge(age) {
  if (isNaN(age) || !age) throw new Error(errorMessage.ageNotNumber);
  if (age < 1) throw new Error(errorMessage.ageLessThan1);
}

function validateDate(date) {
  if (!regex.date.test(date)) throw new Error(errorMessage.dateInvalidFormat);
}

function validateTime(time) {
  if (!regex.time.test(time)) throw new Error(errorMessage.timeInvalidFormat);
}

function validateComments(comments) {
  if (typeof comments !== "string")
    throw new Error(errorMessage.commentsNotString);
}

function validateInputs(visitorData) {
  for (const key in visitorData) {
    switch (key) {
      case "visitor_name":
        validateNameFormat(visitorData[key], "Visitor");
        break;
      case "visitor_age":
        validateAge(visitorData[key]);
        break;
      case "date_of_visit":
        validateDate(visitorData[key]);
        break;
      case "time_of_visit":
        validateTime(visitorData[key]);
        break;
      case "assisted_by":
        validateNameFormat(visitorData[key], "Assisted by");
        break;
      case "comments":
        validateComments(visitorData[key]);
        visitorData[key] =
          visitorData[key] === "" ? "No comment" : visitorData[key];
        break;
    }
  }
}

function formatVisitorData(visitorData) {
  const date = visitorData.date_of_visit.toISOString().substring(0, 10);
  const time = visitorData.time_of_visit.substring(0, 5);
  visitorData.date_of_visit = date;
  visitorData.time_of_visit = time;
}

module.exports = {
  isResponseEmpty,
  getStatus,
  validateInputs,
  formatVisitorData,
};
