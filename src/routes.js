const { errorMessage } = require("./helper_objects");
const express = require("express");
const {
  createVisitorsTable,
  addNewVisitor,
  listAllVisitors,
  deleteVisitor,
  updateVisitor,
  viewVisitor,
  deleteAllVisitors,
  viewLastVisitorId,
} = require("./database_functions");
const {
  getStatus,
  validateInputs,
  formatVisitorData,
} = require("./helper_functions");

const router = express.Router();
router.use(express.json());

router.use(async (_req, _res, next) => {
  try {
    await createVisitorsTable();
    next();
  } catch (error) {
    next(error);
  }
});

router.post("/submit", async (req, res, next) => {
  try {
    const formData = req.body;
    await addNewVisitor(formData);
    const visitorId = await viewLastVisitorId();

    res.redirect(`/thanks?id=${visitorId}`);
  } catch (error) {
    next(error);
  }
});

router.get("/thanks", async (req, res, next) => {
  try {
    const visitorId = req.query.id;
    const visitorData = await viewVisitor(visitorId);
    formatVisitorData(visitorData);
    res.render("thank_you", { visitorData });
  } catch (error) {
    next(error);
  }
});

router.use((err, _req, res, _next) => {
  res.status(500).send(errorMessage.requestError + err.message);
  throw new Error(err);
});

router.get("/visitors", async (_req, res) => {
  try {
    const visitorsData = await listAllVisitors();
    res.json(visitorsData);
  } catch (error) {
    const status = getStatus(error);
    res.status(status).json({ message: error.message });
  }
});

router.get("/visitors/:id", async (req, res) => {
  let id;
  try {
    id = parseInt(req.params.id);
    const visitorData = await viewVisitor(id);
    formatVisitorData(visitorData);
    res.json(visitorData);
  } catch (error) {
    const status = getStatus(error, id);
    res.status(status).json({ message: error.message });
  }
});

router.delete("/visitors/:id", async (req, res) => {
  let id;
  try {
    id = parseInt(req.params.id);
    const successMessage = await deleteVisitor(id);
    res.json({ message: successMessage });
  } catch (error) {
    const status = getStatus(error, id);
    res.status(status).json({ message: error.message });
  }
});

router.delete("/visitors", async (_req, res) => {
  try {
    const successMessage = await deleteAllVisitors();
    res.json({ message: successMessage });
  } catch (error) {
    const status = getStatus(error);
    res.status(status).json({ message: error.message });
  }
});

router.post("/visitors", async (req, res, _next) => {
  try {
    const visitorData = req.body;
    validateInputs(visitorData);
    const successMessage = await addNewVisitor(visitorData);
    res.json({ message: successMessage });
  } catch (error) {
    const status = getStatus(error);
    res.status(status).json({ message: error.message });
  }
});

router.put("/visitors/:id", async (req, res) => {
  let id;
  try {
    const newData = req.body;
    id = parseInt(req.params.id);
    validateInputs(newData);
    const updatedData = await updateVisitor(id, newData);
    formatVisitorData(updatedData);
    res.json(updatedData);
  } catch (error) {
    const status = getStatus(error, id);
    res.status(status).json({ message: error.message });
  }
});

module.exports = router;
