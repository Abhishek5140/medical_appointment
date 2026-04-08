import express from 'express';
import {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
  getDoctors,
  getDoctorsByDepartment
} from '../controllers/appointmentController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Get all doctors
router.get('/doctors', getDoctors);

// Get doctors by department
router.get('/doctors/:department', getDoctorsByDepartment);

// Patient: Create appointment
router.post('/', restrictTo('patient'), createAppointment);

// Patient & Doctor: Get appointments
router.get('/', getAppointments);

// Doctor: Update appointment status
router.put('/:id', restrictTo('doctor'), updateAppointmentStatus);

export default router;
