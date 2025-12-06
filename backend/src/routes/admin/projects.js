const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/auth');
const { body, validationResult } = require('express-validator');
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} = require('../../utils/database');

// All routes require authentication
router.use(authMiddleware);

// GET /api/admin/projects - Get all projects
router.get('/', async (req, res) => {
  try {
    const filters = req.query;
    const projects = await getProjects(filters);

    res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      error: 'Failed to fetch projects'
    });
  }
});

// GET /api/admin/projects/:id - Get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await getProjectById(req.params.id);

    if (!project) {
      return res.status(404).json({
        error: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      error: 'Failed to fetch project'
    });
  }
});

// POST /api/admin/projects - Create project
router.post(
  '/',
  [
    body('title').notEmpty().trim().withMessage('Title is required'),
    body('category').notEmpty().trim().withMessage('Category is required'),
    body('description').notEmpty().trim().withMessage('Description is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: 'Validation failed',
          details: errors.array(),
        });
      }

      const project = await createProject(req.body);

      res.status(201).json({
        success: true,
        message: 'Project created successfully',
        data: project
      });
    } catch (error) {
      console.error('Create project error:', error);
      res.status(500).json({
        error: 'Failed to create project'
      });
    }
  }
);

// PUT /api/admin/projects/:id - Update project
router.put('/:id', async (req, res) => {
  try {
    const project = await updateProject(req.params.id, req.body);

    if (!project) {
      return res.status(404).json({
        error: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      error: 'Failed to update project'
    });
  }
});

// DELETE /api/admin/projects/:id - Delete project
router.delete('/:id', async (req, res) => {
  try {
    const project = await deleteProject(req.params.id);

    if (!project) {
      return res.status(404).json({
        error: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      error: 'Failed to delete project'
    });
  }
});

module.exports = router;

