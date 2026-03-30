import mongoose from 'mongoose';
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: String,
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'read', 'resolved'], default: 'new' },
}, { timestamps: true });
export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
