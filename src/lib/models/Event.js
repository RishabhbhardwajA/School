import mongoose from 'mongoose';
const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  category: { type: String, enum: ['event', 'notice', 'news', 'circular'], default: 'event' },
  image: String,
  active: { type: Boolean, default: true },
}, { timestamps: true });
export default mongoose.models.Event || mongoose.model('Event', EventSchema);
