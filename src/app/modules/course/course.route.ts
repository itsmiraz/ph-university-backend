import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidation } from './course.validation';
import { CourseControllers } from './course.controller';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(CourseValidation.createCourseValidationSchmea),
  CourseControllers.createCourse,
);

router.get('/', CourseControllers.getAllCourses);
router.get('/:id', CourseControllers.getSingleCourse);
router.delete('/:id', CourseControllers.deleteCourse);
router.patch(
  '/:id',
  validateRequest(CourseValidation.updatedCourseValidationSchema),
  CourseControllers.updateCourse,
);

export const CourseRoutes = router;