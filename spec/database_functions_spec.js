const { pool } = require("../src/config");
const {
  createVisitorsTable,
  addNewVisitor,
  listAllVisitors,
  deleteVisitor,
  updateVisitor,
  viewVisitor,
  deleteAllVisitors,
  viewLastVisitorId,
} = require("../src/database_functions");
const { queryCommand, successMessage } = require("../src/helper_objects");

describe("database function", () => {
  const visitor = {
    visitorName: "Cya",
    visitorAge: "25",
    dateOfVisit: "2024-01-01",
    timeOfVisit: "17:05",
    assistedBy: "Mandla",
    comments: "Nice Visit",
  };

  const visitorId = 1;
  const updatedData = { visitor_Name: "John Doe" };

  beforeEach(() => {
    const mockResponse = Promise.resolve({
      command: "COMMAND",
      rowCount: 1,
      id: null,
      rows: [{ id: "cya" }],
    });

    spyOn(pool, "query").and.returnValue(mockResponse);
  });

  describe("createVisitorsTable function", () => {
    it("should create the visitors table.", async () => {
      await createVisitorsTable();

      expect(pool.query).toHaveBeenCalledWith(queryCommand.createVisitorsTable);
    });

    it("should return a success message when the visitors tables was successfully created.", async () => {
      const result = await createVisitorsTable();

      expect(result).toBe(successMessage.visitorsTableCreated);
    });
  });

  describe("addNewVisitor", () => {
    it("should add new visitor data to the visitors table", async () => {
      const expectedValues = Object.values(visitor);
      const joinedKeys = Object.keys(visitor).join(", ");
      await addNewVisitor(visitor);

      expect(pool.query).toHaveBeenCalledOnceWith(
        queryCommand.addNewVisitor(joinedKeys),
        expectedValues
      );
    });

    it("should return a success message when the visitor data was successfully added", async () => {
      const { firstName } = visitor;
      expect(await addNewVisitor(visitor)).toBe(
        successMessage.addNewVisitor(firstName)
      );
    });
  });

  describe("listAllVisitors", () => {
    it("should list all the visitors in the database.", async () => {
      await listAllVisitors();

      expect(pool.query).toHaveBeenCalledOnceWith(queryCommand.listAllVisitors);
    });
  });

  describe("deleteVisitor", () => {
    it("should delete visitor from the database", async () => {
      await deleteVisitor(visitorId);

      expect(pool.query).toHaveBeenCalledOnceWith(queryCommand.deleteVisitor, [
        visitorId,
      ]);
    });

    it("should return a success message when the visitor data has been successfully deleted", async () => {
      expect(await deleteVisitor(visitorId)).toBe(
        successMessage.deleteVisitor(visitorId)
      );
    });
  });

  describe("updateVisitor", () => {
    it("should update the visitor information on the database.", async () => {
      await updateVisitor(visitorId, updatedData);
      const fields = Object.keys(updatedData);
      const values = Object.values(updatedData);

      expect(pool.query).toHaveBeenCalledOnceWith(
        queryCommand.updateVisitor(fields),
        [...values, visitorId]
      );
    });
  });

  describe("viewVisitorId", () => {
    it("should retrieve visitor data from the database.", async () => {
      await viewVisitor(visitorId);

      expect(pool.query).toHaveBeenCalledOnceWith(queryCommand.viewVisitor, [
        visitorId,
      ]);
    });
  });

  describe("deleteAllVisitors", () => {
    it("should delete all the visitors data from the database.", async () => {
      await deleteAllVisitors();

      expect(pool.query).toHaveBeenCalledOnceWith(
        queryCommand.deleteAllVisitors
      );
    });

    it("should return success message when all visitors data has been successfully deleted.", async () => {
      await deleteAllVisitors();

      expect(await deleteAllVisitors()).toBe(successMessage.deleteAllVisitors);
    });
  });

  describe("viewLastVisitorId", () => {
    it("should retrieve last visitor data from the database.", async () => {
      await viewLastVisitorId();

      expect(pool.query).toHaveBeenCalledOnceWith(queryCommand.viewLastVisitor);
    });
  });
});
