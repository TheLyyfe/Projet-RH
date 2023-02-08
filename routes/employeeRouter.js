const express = require("express");
const EmployeeModel = require('../models/employee.js');
const EntrepriseModel = require("../models/entreprise.js");
const upload = require('../services/multer.js')
const fs = require('fs')
const employeeRouter = express.Router()

employeeRouter.post('/addEmployee', upload.single("img"), async (req, res) => {
    console.log(req.body);
    try {
        req.body.img = req.file.filename
        req.body.entreprise = req.session.userId
        let user = new EmployeeModel(req.body)
        await user.save()
        await EntrepriseModel.updateOne({ _id: req.session.userId }, { $push: { employees: user._id } })
        res.redirect('/entreprises')
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})

employeeRouter.post('/updateEmployee/:id', upload.single("img"), async (req, res) => {
    console.log(req.body);
    try {
        if (req.file) {
            req.body.img = req.file.filename
        }
        let employee = await EmployeeModel.findOne({ _id: req.params.id });
        await EmployeeModel.updateOne({ _id: req.params.id }, req.body)
        fs.unlinkSync('assets/uploads/' + employee.img)
        res.redirect('/entreprises')
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})

employeeRouter.get('/deleteEmployee/:id', async (req, res) => {
    try {
        let employee = await EmployeeModel.findOne({ _id: req.params.id });
        await EmployeeModel.deleteOne({ _id: req.params.id });
        await EntrepriseModel.updateOne({ _id: req.session.userId }, { $pull: { employees: req.params.id  } })
        fs.unlinkSync('assets/uploads/' + employee.img)
        res.redirect('/entreprises');
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})

employeeRouter.get('/addBlame/:id', async (req, res) => {
    try {
        let employee = await EmployeeModel.findOne({ _id: req.params.id })
        if (employee.blame >= 2) {
            res.redirect(`/deleteEmployee/${req.params.id}`)
        } else {
            await EmployeeModel.updateOne({ _id: req.params.id }, { blame: parseInt(employee.blame) + 1 })
            res.redirect('/entreprises');
        }
    } catch (err) {
        console.log(err);
        res.send(err);
    }
}
)



module.exports = employeeRouter