import employeeCtrl from "../controllers/Employee.controller.js";


const employeeRoutes = (fastify, opts, done) => {
    fastify.get("/", employeeCtrl.listEmployees);

    fastify.post("/", employeeCtrl.createEmployees);

    fastify.put("/:id", employeeCtrl.updateEmploye);

    fastify.delete("/:id", employeeCtrl.deleteEmployee);

    done();
};

export default employeeRoutes