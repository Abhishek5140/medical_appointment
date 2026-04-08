import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  patientName: {
    type: String,
    required: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctorName: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    enum: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Dermatology', 'General Medicine']
  },
  date: {
    type: String,
    required: [true, 'Date is required']
  },
  timeSlot: {
    type: String,
    required: [true, 'Time slot is required'],
    enum: ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM']
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  reason: {
    type: String,
    required: [true, 'Reason for appointment is required']
  }
}, {
  timestamps: true
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
