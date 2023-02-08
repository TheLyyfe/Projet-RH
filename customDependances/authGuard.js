const EntrepriseModel = require("../models/entreprise")


let routeGuard = async (req,res,next)=> {
    let user = await EntrepriseModel.findOne({_id:req.session.userId})
    if (user) {
        next()
    } else{
        res.redirect('/entreprises')
    }
}

module.exports = routeGuard  