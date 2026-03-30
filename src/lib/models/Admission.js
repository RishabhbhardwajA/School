import mongoose from 'mongoose';
const AdmissionSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  parentName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  classApplying: { type: String, required: true },
  dob: String,
  gender: String,
  address: String,
  previousSchool: String,
  message: String,
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'contacted'], default: 'pending' },
}, { timestamps: true });
export default mongoose.models.Admission || mongoose.model('Admission', AdmissionSchema);
