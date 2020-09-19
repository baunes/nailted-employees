import express from 'express';
import { employeeRouter } from '../../modules/employees/infra/http/routes';

const api = express.Router();

api.use('/employee', employeeRouter);

export { api };
