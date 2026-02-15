import Intern from '../models/Intern.js';

/**
 * @desc    Create a new intern
 * @route   POST /api/interns
 * @access  Public
 */
export const createIntern = async (req, res, next) => {
  try {
    const intern = await Intern.create(req.body);
    res.status(201).json(intern);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all interns with search, filter, and pagination
 * @route   GET /api/interns
 * @access  Public
 * @query   q (search), role, status, page, limit
 */
export const getInterns = async (req, res, next) => {
  try {
    const { q, role, status, page = 1, limit = 10 } = req.query;

    // Build query object
    const query = {};

    // Search by name or email (case-insensitive regex)
    if (q) {
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } }
      ];
    }

    // Filter by role
    if (role) {
      query.role = role;
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Calculate pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Execute query with pagination
    const interns = await Intern.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    // Get total count for pagination metadata
    const total = await Intern.countDocuments(query);

    // Calculate pagination metadata
    const totalPages = Math.ceil(total / limitNum);
    const hasNextPage = pageNum < totalPages;
    const hasPrevPage = pageNum > 1;

    res.json({
      data: interns,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages,
        hasNextPage,
        hasPrevPage
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single intern by ID
 * @route   GET /api/interns/:id
 * @access  Public
 */
export const getInternById = async (req, res, next) => {
  try {
    const intern = await Intern.findById(req.params.id);

    if (!intern) {
      const error = new Error('Intern not found');
      error.statusCode = 404;
      error.code = 'NOT_FOUND';
      throw error;
    }

    res.json(intern);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update an intern
 * @route   PATCH /api/interns/:id
 * @access  Public
 */
export const updateIntern = async (req, res, next) => {
  try {
    const intern = await Intern.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!intern) {
      const error = new Error('Intern not found');
      error.statusCode = 404;
      error.code = 'NOT_FOUND';
      throw error;
    }

    res.json(intern);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete an intern
 * @route   DELETE /api/interns/:id
 * @access  Public
 */
export const deleteIntern = async (req, res, next) => {
  try {
    const intern = await Intern.findByIdAndDelete(req.params.id);

    if (!intern) {
      const error = new Error('Intern not found');
      error.statusCode = 404;
      error.code = 'NOT_FOUND';
      throw error;
    }

    res.json({ message: 'Intern deleted successfully' });
  } catch (error) {
    next(error);
  }
};
