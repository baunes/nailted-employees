import express from 'express';
import { Pagination } from '../../../../core/pagination';
import { PaginationUtils } from '../../../../utils/paginationUtils';
import { getEmployees, createEmployee } from '../../useCases';

const employeeRouter = express.Router();

employeeRouter.get('/', (req, res) => {
  const page = req.query.page ? Number.parseInt(req.query.page as string) : undefined;
  const size = req.query.size ? Number.parseInt(req.query.size as string) : undefined;
  const email = req.query.email ? (req.query.email as string) : undefined;
  const nameOrder = req.query.nameOrder ? Number.parseInt(req.query.nameOrder as string) : 0;
  const surnmeOrder = req.query.surnmeOrder ? Number.parseInt(req.query.surnmeOrder as string) : 0;
  return getEmployees
    .do(PaginationUtils.createPagination(page, size), email, nameOrder, surnmeOrder)
    .then((paggedDto) => res.json(paggedDto))
    .catch((error: Error) => {
      console.log(error.message);
      res.status(500).json('Error retrieving employees');
    });
});

employeeRouter.post('/', (req, res) => {
  return createEmployee
    .do(req.body as CreateEmployeeDto)
    .then((employee) => res.status(201).json(employee))
    .catch((error: Error) => {
      console.log(error.message);
      res.status(500).json('Error creating Employee');
    });
});

export { employeeRouter };
