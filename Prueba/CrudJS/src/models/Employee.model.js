import mongoose from "mongoose";

const {Schema, model} = mongoose;

const employeeSchema = new Schema({
    identification: {
        type: Number,
        required: [true, "El campo identification es obligatorio"]
    },

    name: {
        type: String,
        required: [true, "El campo name es obligatorio"]
    },

    age: {
        type: Number,
        required: [true, "El campo age es obligatorio"]
    },

    position: {
        type: String,
        required: [true, "El campo position es obligatorio"]
    },

    salary: {
        type: Number,
        required: [true, "El campo salary es obligatorio"]
    }
})

export const employeeModel = model("employee", employeeSchema)