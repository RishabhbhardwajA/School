import mongoose from 'mongoose';
const FacultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  qualifications: { type: String, required: true },
  experience: { type: Number, required: true },
  imageUrl: { type: String, default: '/faculty-placeholder.png' },
  active: { type: Boolean, default: true }
}, { timestamps: true });
export default mongoose.models.Faculty || mongoose.model('Faculty', FacultySchema);
