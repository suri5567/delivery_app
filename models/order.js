import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true, required: true },
  customerName: { type: String, required: true },
  deliveryAddress: { type: String, required: true },
  orderStatus: { type: String, enum: ['pending', 'dispatched', 'delivered', 'canceled'], default: 'pending' },
  totalAmount: { type: Number, required: true },
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
