import mongoose from 'mongoose';
const AlumniSchema = new mongoose.Schema({
  name: { type: String, required: true },
  passingYear: { type: Number, required: true },
  achievement: { type: String, required: true },
  currentRole: { type: String, required: true },
  imageUrl: { type: String, default: '/alumni-placeholder.png' },
  active: { type: Boolean, default: true }
}, { timestamps: true });
export default mongoose.models.Alumni || mongoose.model('Alumni', AlumniSchema);
