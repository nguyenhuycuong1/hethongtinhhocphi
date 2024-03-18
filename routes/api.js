const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController.js");

function initApiRouter(app) {
    // truncate
    router.delete("/destroy", apiController.deleteAll);

    // invoice
    router.post("/invoice", apiController.createInvoice);
    router.put("/invoice/:invoiceCode", apiController.updateInvoice);
    router.get("/invoices", apiController.getAllInvoices);
    router.get("/inv-exists/:invoiceCode", apiController.invCheckExists);

    // registeredSub
    router.delete(
        "/registered-sub/:invCode/:subCode",
        apiController.deleteRegisteredSubs
    );
    router.get("/registered-sub/:invCode", apiController.getRegisteredSubs);
    router.post("/registered-sub/:invCode", apiController.addRegisteredSubs);
    router.get("/rs-exist/:invCode/:subCode", apiController.rsCheckExists);

    // charge
    router.get("/charge", apiController.getCharge);
    router.put("/update-charge", apiController.updateCharge);

    // subjects
    router.get("/subject-name/:semeCode", apiController.getSubNameBySeme);
    router.post("/subjects", apiController.createNewSubject);
    router.get("/subjects/:semeCode", apiController.getSubBySeme);
    router.get("/subjects", apiController.getAllSubjects);
    router.delete("/subjects/:subjectCode", apiController.deleteSubject);

    router.get("/", (req, res) => {
        res.send("api/v1");
    });
    return app.use("/api/v1/", router);
}

module.exports = initApiRouter;
