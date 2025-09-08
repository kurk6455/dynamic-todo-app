const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const usersSchema = new Schema({
    email : {type : String, unique : true},
    password : String
})

const todosSchema = new Schema({
    todo : String,
    done : Boolean,
    userId : ObjectId
})

const usersModel = mongoose.model('users', usersSchema);
const todosModel = mongoose.model('todos', todosSchema);

module.exports = {
    usersModel, todosModel
}