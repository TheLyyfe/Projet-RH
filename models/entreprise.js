const mongoose = require('mongoose')

const entrepriseSchema = new mongoose.Schema({
    entrname: {
        type: String,
        required: [true, 'Pas de nom'],
    },
    siret:{
        type: Number,
        required: [true, 'Pas de mot de passe']
    },
    mail:{
        type: String,
        required: [true, 'Pas de mail']
    },
    director:{
        type: String,
        required: [true, 'Pas de Directeur']
    },
    password: {
        type: String,
        required: [true, 'Pas de prénom'],
    },
    employees: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'employees',
        }]
    }

})

const EntrepriseModel = mongoose.model('Entreprise', entrepriseSchema);

module.exports = EntrepriseModel