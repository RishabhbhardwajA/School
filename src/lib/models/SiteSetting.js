import mongoose from 'mongoose';

const SiteSettingSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true }, // 'global'
  heroHeadline: { type: String, default: 'Empowering Minds, Shaping Futures' },
  heroSubheadline: { type: String, default: 'Join Delhi Excellence Public School for a transformative educational journey grounded in values and innovation.' },
  aboutText: { type: String, default: 'Founded in 1985, Delhi Excellence Public School is a premier CBSE-affiliated institution dedicated to fostering academic excellence, moral integrity, and holistic development in a state-of-the-art learning environment.' },
  contactPhone: { type: String, default: '+91 98765 43210' },
  contactEmail: { type: String, default: 'info@delhiexcellenceschool.com' },
  contactAddress: { type: String, default: 'Sector 10, Dwarka, New Delhi 110075' },
});

export default mongoose.models.SiteSetting || mongoose.model('SiteSetting', SiteSettingSchema);
