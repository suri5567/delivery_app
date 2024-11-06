import mongoose from 'mongoose';

const routeSchema = new mongoose.Schema({
  routeId: { type: String, unique: true, required: true },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  steps: [{ location: String, timestamp: Date }],
  status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
}, { timestamps: true });

export default mongoose.model('Route', routeSchema);
