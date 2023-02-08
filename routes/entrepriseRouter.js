const express = require("express");
const EntrepriseModel = require('../models/entreprise.js')
const upload = require('../services/multer.js')
const routeGuard = require('../customDependances/authGuard.js')
const crypto = require('../customDependances/crypto.js')


const entrepriseRouter = express.Router()

entrepriseRouter.get('/entreprises', async (req, res) => {
   try {
      let employees
      let user = await EntrepriseModel.findOne({ _id: req.session.userId }).populate("employees");
      if (user) {
         employees = user.employees;
      }
      console.log(user);
      res.render('main.twig', {
         user: user,
         employees: employees
         
      })
   } catch (err) {
      console.log(err);
      res.send(err);
   }
})

entrepriseRouter.get('/addEntreprise', async (req, res) => {
   try {
      res.render('main.twig')
   } catch (err) {
      console.log(err);
      res.send(err);
   }
})

entrepriseRouter.post('/addEntreprise', async (req, res) => {
   console.log(req.body);
   try {
      req.body.password = await crypto.cryptPassword(req.body.password)
      let entreprise = new EntrepriseModel(req.body)
      await entreprise.save()
      res.redirect('/entreprises')
   } catch (err) {
      console.log(err);
      res.send(err);
   }
})

entrepriseRouter.post('/login', async (req, res) => {
   try {
      let user = await EntrepriseModel.findOne({ mail: req.body.mail})
      if (user) {
         if (await crypto.comparePassword(req.body.password, user.password)) {
            req.session.userId = user._id
            res.redirect('/entreprises')
         } else {
            throw "Bonsoir non"
         }
      } else {
         throw "Id not found"
      }
   } catch (err) {
      req.session.error = err
      console.log(err);
      res.redirect("/entreprises")
   }

})

entrepriseRouter.get('/logout', async (req, res) => {
   req.session.destroy();
   res.redirect('/entreprises')
})


module.exports = entrepriseRouter
