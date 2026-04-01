import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  date: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  tag: { type: String, default: 'Notice' },
  active: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Event || mongoose.model('Event', EventSchema);
