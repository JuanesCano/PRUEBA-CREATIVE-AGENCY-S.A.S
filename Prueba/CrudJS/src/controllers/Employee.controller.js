import { response } from "../helpers/response.js"
import { employeeModel } from "../models/Employee.model.js"

const employeeCtrl = {}

employeeCtrl.listEmployees = async ( req, reply ) => {
    try {
        const employee = await employeeModel.find()
        response(reply, 200, true, employee, "Lista de empleados")
    } catch (error) {
        response(reply, 500, false, "", error.message)
    }
};

employeeCtrl.createEmployees = async(req, reply) => {
    try {
        const {identification, name, age, position, salary} = req.body
        const existEmployee = await employeeModel.findOne({identification})

        if (existEmployee) {
            return response(reply, 401, false, "", "El empleado ya existe")
        }

        const newEmployee = new employeeModel({
            identification,
            name,
            age,
            position,
            salary
        })

        await employeeModel.create(newEmployee)
        response(reply, 201, true, newEmployee, "Nuevo empleado")
    } catch (error) {
        response(reply, 500, false, "", error.message)
    }
};

employeeCtrl.updateEmploye = async(req, reply) => {
    try {
        const {id} = req.params
        const employee = await employeeModel.findById(id)

        if(!employee){
            return response(reply, 404, false, "", "Empleado no encontrado")
        }

        await employee.updateOne(req.body);
        response(reply, 200, true, "", "Empleado actualizado")
    } catch (error) {
        response(reply, 500, false, "", error.message)
    }
};

employeeCtrl.deleteEmployee = async(req, reply) => {
    try {
        const {id} = req.params
        const employee = await employeeModel.findById(id)

        if(!employee){
            return response(reply, 404, false, "", "Empleado no encontrado")
        }

        await employee.deleteOne();
        response(reply, 200, true, "", "Empleado eliminado")
    } catch (error) {
        response(reply, 500, false, "", error.message)
    }
};

export default employeeCtrl