import mongoose from 'mongoose';
const TransportRouteSchema = new mongoose.Schema({
  routeName: { type: String, required: true },
  busNumber: { type: String, required: true },
  stops: { type: [String], default: [] },
  monthlyFee: { type: Number, required: true },
  driverName: { type: String },
  driverPhone: { type: String },
  active: { type: Boolean, default: true }
}, { timestamps: true });
export default mongoose.models.TransportRoute || mongoose.model('TransportRoute', TransportRouteSchema);
