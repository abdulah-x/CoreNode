import express from 'express';
import {
  createIntern,
  getInterns,
  getInternById,
  updateIntern,
  deleteIntern
} from '../controllers/internController.js';

const router = express.Router();

// POST /api/interns - Create new intern
router.post('/', createIntern);

// GET /api/interns - Get all interns with search/filter/pagination
router.get('/', getInterns);

// GET /api/interns/:id - Get single intern
router.get('/:id', getInternById);

// PATCH /api/interns/:id - Update intern
router.patch('/:id', updateIntern);

// DELETE /api/interns/:id - Delete intern
router.delete('/:id', deleteIntern);

export default router;
