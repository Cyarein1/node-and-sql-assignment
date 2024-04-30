const queryCommand = {
  addNewVisitor: (keys) => `INSERT INTO visitors
    (${keys})
    VALUES ($1, $2, $3, $4, $5, $6)`,
  listAllVisitors: "SELECT id, visitor_name FROM visitors",
  deleteVisitor: "DELETE FROM visitors WHERE id = $1",
  updateVisitor: (fields) => {
    const setClause = fields
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");
    const query = `UPDATE visitors SET ${setClause} WHERE id = $${
      fields.length + 1
    } RETURNING *`;

    return query;
  },
  viewVisitor: "SELECT * FROM visitors WHERE id = $1",
  deleteAllVisitors: "DELETE FROM visitors",
  viewLastVisitor: "SELECT id FROM visitors ORDER BY id DESC LIMIT 1",
  createVisitorsTable: `CREATE TABLE IF NOT EXISTS visitors (
    id SERIAL PRIMARY KEY,
    visitor_name VARCHAR(255) NOT NULL,
    visitor_age INTEGER NOT NULL,
    date_of_visit DATE NOT NULL,
    time_of_visit TIME NOT NULL,
    assisted_by VARCHAR(255) NOT NULL,
    comments TEXT DEFAULT 'no comment'
    );`,
};

const errorMessage = {
  visitorsTableEmpty: `Visitors table is empty`,
  requestError: "An error occurred while processing your request: ",
  visitorDoesNotExist: (id) => `Visitor with ID: ${id} could not be found.`,
  nameContainsInitials: (visitorOrAssistedBy) =>
    `${visitorOrAssistedBy} name must not contain initials.`,
  notLastAndFirstName: (visitorOrAssistedBy) =>
    `${visitorOrAssistedBy} name must contain first name and and last name.`,
  nameNull: (name) => `${name} name cannot be null.`,
  severError: "ECONNREFUSED 127.0.0.1:5432",
  ageNotNumber: "Age must be a number.",
  ageLessThan1: "Age must be greater than 1",
  dateInvalidFormat: "Date of visit must be in the format yyyy-mm-dd.",
  timeInvalidFormat: "Time of visit must be in the format hh:mm.",
  commentsNotString: "Comments must be a string.",
};

const successMessage = {
  addNewVisitor: (visitorName) =>
    `Visitor with name: ${visitorName} successfully added`,
  deleteVisitor: (id) => `Visitor with ID: ${id} successfully deleted.`,
  deleteAllVisitors: "Visitors successfully deleted.",
  visitorsTableCreated: "Visitors table successfully created.",
};

const regex = { date: /^\d{4}-\d{2}-\d{2}$/, time: /^\d{2}:\d{2}$/ };

module.exports = { queryCommand, errorMessage, successMessage, regex };
