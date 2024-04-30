const { pool } = require("./config");
const {
  queryCommand,
  errorMessage,
  successMessage,
} = require("./helper_objects");
const { isResponseEmpty } = require("./helper_functions");

const createVisitorsTable = async () => {
  await pool.query(queryCommand.createVisitorsTable);
  return successMessage.visitorsTableCreated;
};

const addNewVisitor = async (visitor) => {
  const values = Object.values(visitor);
  const joinedKeys = Object.keys(visitor).join(", ");
  const { visitor_name: firstName } = visitor;

  await pool.query(queryCommand.addNewVisitor(joinedKeys), values);
  return successMessage.addNewVisitor(firstName);
};

const listAllVisitors = async () => {
  const results = await pool.query(queryCommand.listAllVisitors);

  if (isResponseEmpty(results)) {
    return errorMessage.visitorsTableEmpty;
  }

  return results.rows;
};

const deleteVisitor = async (visitorId) => {
  const result = await pool.query(queryCommand.deleteVisitor, [visitorId]);

  if (isResponseEmpty(result)) {
    throw new Error(errorMessage.visitorDoesNotExist(visitorId));
  }

  return successMessage.deleteVisitor(visitorId);
};

const updateVisitor = async (visitorId, updatedData) => {
  const keys = Object.keys(updatedData);
  const values = Object.values(updatedData);

  const result = await pool.query(queryCommand.updateVisitor(keys), [
    ...values,
    visitorId,
  ]);

  if (isResponseEmpty(result)) {
    throw new Error(errorMessage.visitorDoesNotExist(visitorId));
  }

  return result.rows[0];
};

const viewVisitor = async (visitorId) => {
  const results = await pool.query(queryCommand.viewVisitor, [visitorId]);

  if (results) {
    if (isResponseEmpty(results)) {
      throw new Error(errorMessage.visitorDoesNotExist(visitorId));
    }
    return results.rows[0];
  }
};

const deleteAllVisitors = async () => {
  const results = await pool.query(queryCommand.deleteAllVisitors);

  if (isResponseEmpty(results)) {
    throw new Error(errorMessage.visitorsTableEmpty);
  }

  return successMessage.deleteAllVisitors;
};

const viewLastVisitorId = async () => {
  const results = await pool.query(queryCommand.viewLastVisitor);

  if (results) {
    if (isResponseEmpty(results)) {
      throw new Error(errorMessage.visitorsTableEmpty);
    }
    return results.rows[0].id;
  }
};

module.exports = {
  createVisitorsTable,
  addNewVisitor,
  listAllVisitors,
  deleteVisitor,
  updateVisitor,
  viewVisitor,
  deleteAllVisitors,
  viewLastVisitorId,
};
