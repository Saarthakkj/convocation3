import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: String,
  index: Number,
  photo: string,
});

export default mongoose.models.User || mongoose.model('User', userSchema);
