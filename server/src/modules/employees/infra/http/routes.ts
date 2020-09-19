import express from 'express';
import { Pagination } from '../../../../core/pagination';
import { PaginationUtils } from '../../../../utils/paginationUtils';
import { getEmployees } from '../../useCases';

const employeeRouter = express.Router();

employeeRouter.get('/', async (req, res) => {
  const page = req.query.page ? Number.parseInt(req.query.page as string) : undefined;
  const size = req.query.size ? Number.parseInt(req.query.size as string) : undefined;
  const email = req.query.email ? (req.query.email as string) : undefined;
  const nameOrder = req.query.nameOrder ? Number.parseInt(req.query.nameOrder as string) : 0;
  const surnmeOrder = req.query.surnmeOrder ? Number.parseInt(req.query.surnmeOrder as string) : 0;
  res.json(await getEmployees.do(PaginationUtils.createPagination(page, size), email, nameOrder, surnmeOrder));
});

export { employeeRouter };
