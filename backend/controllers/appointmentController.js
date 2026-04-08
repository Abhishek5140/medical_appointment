import Appointment from '../models/Appointment.js';
import User from '../models/User.js';

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private (Patient only)
export const createAppointment = async (req, res) => {
  try {
    const { doctorId, department, date, timeSlot, reason } = req.body;

    // Validation
    if (!doctorId || !department || !date || !timeSlot || !reason) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Verify doctor exists and has the correct role
    const doctor = await User.findById(doctorId);
    
    if (!doctor || doctor.role !== 'doctor') {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    // Check if appointment slot is already taken
    const existingAppointment = await Appointment.findOne({
      doctorId,
      date,
      timeSlot,
      status: { $ne: 'rejected' }
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: 'This time slot is already booked'
      });
    }

    // Create appointment
    const appointment = await Appointment.create({
      patientId: req.user._id,
      patientName: req.user.name,
      doctorId,
      doctorName: doctor.name,
      department,
      date,
      timeSlot,
      reason,
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: appointment
    });
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating appointment',
      error: error.message
    });
  }
};

// @desc    Get appointments
// @route   GET /api/appointments
// @access  Private (Patient & Doctor)
export const getAppointments = async (req, res) => {
  try {
    let appointments;

    if (req.user.role === 'patient') {
      // Get appointments for the logged-in patient
      appointments = await Appointment.find({ patientId: req.user._id })
        .populate('doctorId', 'name email department')
        .sort({ createdAt: -1 });
    } else if (req.user.role === 'doctor') {
      // Get appointments for the logged-in doctor
      appointments = await Appointment.find({ doctorId: req.user._id })
        .populate('patientId', 'name email')
        .sort({ createdAt: -1 });
    }

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching appointments',
      error: error.message
    });
  }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id
// @access  Private (Doctor only)
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Validation
    if (!status || !['approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid status (approved or rejected)'
      });
    }

    // Find appointment
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check if the logged-in doctor is assigned to this appointment
    if (appointment.doctorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only update appointments assigned to you'
      });
    }

    // Update status
    appointment.status = status;
    await appointment.save();

    res.status(200).json({
      success: true,
      message: `Appointment ${status} successfully`,
      data: appointment
    });
  } catch (error) {
    console.error('Update appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating appointment',
      error: error.message
    });
  }
};

// @desc    Get all doctors
// @route   GET /api/appointments/doctors
// @access  Private
export const getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' }).select('-password');

    res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors
    });
  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching doctors',
      error: error.message
    });
  }
};

// @desc    Get doctors by department
// @route   GET /api/appointments/doctors/:department
// @access  Private
export const getDoctorsByDepartment = async (req, res) => {
  try {
    const { department } = req.params;
    
    const doctors = await User.find({ 
      role: 'doctor',
      department: department
    }).select('-password');

    res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors
    });
  } catch (error) {
    console.error('Get doctors by department error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching doctors',
      error: error.message
    });
  }
};
