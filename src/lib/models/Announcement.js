import mongoose from 'mongoose';
const AnnouncementSchema = new mongoose.Schema({
  text: { type: String, required: true },
  active: { type: Boolean, default: true },
  priority: { type: Number, default: 0 },
}, { timestamps: true });
export default mongoose.models.Announcement || mongoose.model('Announcement', AnnouncementSchema);
