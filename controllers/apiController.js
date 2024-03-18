const db = require("../models/index");

// subject controller
const getAllSubjects = async (req, res) => {
    const data = await db.Subject.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return res.status(200).json({ data });
    // return res.send('fond')
};

const createNewSubject = async (req, res) => {
    const data = req.body;
    if (Array.isArray(data)) {
        try {
            await db.Subject.bulkCreate(data);
            return res.status(200).json({
                message: "success",
            });
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                message: "error",
            });
        }
    } else {
        try {
            await db.Subject.create(data);
            return res.status(200).json({
                message: "success",
            });
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                message: "error",
            });
        }
    }
};

const getSubBySeme = async (req, res) => {
    const semeCode = req.params.semeCode;
    const data = await db.Subject.findAll({
        where: { semeCode: semeCode },
        attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return res.status(200).json({ data });
};

const getSubNameBySeme = async (req, res) => {
    const semeCode = req.params.semeCode;
    const data = await db.Subject.findAll({
        where: { semeCode: semeCode },
        attributes: ["subjectCode", "subjectName"],
    });
    return res.status(200).json({ data });
};

const deleteSubject = async (req, res) => {
    const subjectCode = req.params.subjectCode;
    try {
        await db.Subject.destroy({
            where: {
                subjectCode: subjectCode,
            },
        });
        return res.status(200).json({
            message: "success",
        });
    } catch (error) {
        return res.status(400).json({
            message: "error",
        });
    }
};

// charge controller
const getCharge = async (req, res) => {
    const data = await db.Charge.findOne({ where: { id: 1 } });
    return res.status(200).json(data);
};

const updateCharge = async (req, res) => {
    const data = req.body;
    await db.Charge.update(data, { where: { id: 1 } });
    return res.redirect("back");
};

// registeredSub controller

const getRegisteredSubs = async (req, res) => {
    const invCode = "inv" + req.params.invCode;
    const data = await db.RegisteredSub.findAll({
        where: { invCode: invCode },
        attributes: { exclude: ["createdAt", "updatedAt"] },

        include: [
            {
                model: db.Subject,
                attributes: { exclude: ["createdAt", "updatedAt"] },
            },
        ],
    });
    return res.status(200).json({ data });
};

const addRegisteredSubs = async (req, res) => {
    const invCode = `inv${req.params.invCode}`;
    const subCode = req.body.subCode;
    await db.RegisteredSub.create({ invCode: invCode, subCode: subCode });
    return res.json({
        message: "successfully",
    });
};

const deleteRegisteredSubs = async (req, res) => {
    const invCode = `inv${req.params.invCode}`;
    const subCode = req.params.subCode;
    await db.RegisteredSub.destroy({
        where: {
            invCode: invCode,
            subCode: subCode,
        },
    });
    return res.status(200).json({
        message: "successfully",
    });
};

const rsCheckExists = async (req, res) => {
    const invCode = `inv${req.params.invCode}`;
    const subCode = req.params.subCode;
    const data = await db.RegisteredSub.findOne({
        where: {
            invCode: invCode,
            subCode: subCode,
        },
    });
    if (data) {
        return res.json(true);
    } else {
        return res.json(false);
    }
};
// invoice controller

const createInvoice = async (req, res) => {
    const invoiceCode = "inv" + req.body.invoiceCode;
    const { semeCode, totalFees } = req.body;
    await db.Invoice.create({
        invoiceCode: invoiceCode,
        semeCode: semeCode,
        totalFees: totalFees,
    });
    return res.json({
        message: "successfully",
    });
};

const updateInvoice = async (req, res) => {
    const { totalFees } = req.body;
    const invoiceCode = "inv" + req.params.invoiceCode;
    await db.Invoice.update(
        { totalFees },
        {
            where: { invoiceCode: invoiceCode },
        }
    );
    res.json({
        message: "successfully",
    });
};

const invCheckExists = async (req, res) => {
    const invoiceCode = `inv${req.params.invoiceCode}`;
    const data = await db.Invoice.findOne({
        where: {
            invoiceCode: invoiceCode,
        },
    });
    if (data) {
        return res.json(true);
    } else {
        return res.json(false);
    }
};

const getAllInvoices = async (req, res) => {
    const data = await db.Invoice.findAll({
        attributes: ["invoiceCode", "semeCode", "totalFees"],
        include: [
            {
                model: db.Semester,
                attributes: ["semesterDesc"],
            },
            {
                model: db.RegisteredSub,
                attributes: ["invCode", "subCode"],
                include: [
                    {
                        model: db.Subject,
                        attributes: ["credit"],
                    },
                ],
            },
        ],
        order: [["invoiceCode", "ASC"]],
    });
    const newData = await Promise.all(
        data.map(async (invoice) => {
            const registeredSubs = invoice.RegisteredSubs;
            let total_credit = 0;
            let total_sub = 0;
            const updatedRegisteredSubs = await Promise.all(
                registeredSubs.map(async (registeredSub) => {
                    const subject = await db.Subject.findOne({
                        attributes: ["credit"],
                        where: {
                            subjectCode: registeredSub.subCode,
                        },
                    });
                    const credit = subject.credit;
                    total_credit = total_credit + credit;
                    total_sub += 1;
                    return registeredSub;
                })
            );
            return {
                ...invoice.dataValues,
                RegisteredSubs: updatedRegisteredSubs,
                total_credit,
                total_sub,
            };
        })
    );

    return res.status(200).json({
        data: newData,
    });
};

// truncate

const deleteAll = async (req, res) => {
    const invs = ["invk1", "invk2", "invk3"];
    await db.Invoice.update({ totalFees: 0 }, { where: { invoiceCode: invs } });
    await db.RegisteredSub.truncate();
    return res.json({
        message: "successfully",
    });
};

module.exports = {
    getAllSubjects,
    createNewSubject,
    deleteSubject,
    getCharge,
    updateCharge,
    getSubBySeme,
    getSubNameBySeme,
    getRegisteredSubs,
    addRegisteredSubs,
    deleteRegisteredSubs,
    rsCheckExists,
    createInvoice,
    updateInvoice,
    invCheckExists,
    getAllInvoices,
    deleteAll,
};
