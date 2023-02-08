const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Pas de nom'],
    },
    fonction: {
        type: String,
        required: [true, 'Pas de fonction'],
    },
    blame: {
        type: Number,
        default: 0,
    },
    img:{
        type: String,
        required: [true, "Pas d'image"],
    },
    entreprise: {
        type: String,
        required: [true, "Pas d'entreprise"],
    },

})

const EmployeeModel = mongoose.model('employees', employeeSchema);

module.exports = EmployeeModel