import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, default: 'KES' },
  duration: { type: String },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  category: { type: String, enum: ['Development', 'Business', 'Design', 'Marketing'], default: 'Design' },
  thumbnail: { type: String },
  enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Class', classSchema);