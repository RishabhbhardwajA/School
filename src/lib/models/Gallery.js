import mongoose from 'mongoose';
const GallerySchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  caption: String,
  category: { type: String, enum: ['campus', 'sports', 'events', 'academics', 'cultural', 'other'], default: 'other' },
  active: { type: Boolean, default: true },
}, { timestamps: true });
export default mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);
