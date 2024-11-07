import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
  driverId: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  vehicleType: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

const Driver = mongoose.models.Driver || mongoose.model('Driver', driverSchema);

export default Driver;
