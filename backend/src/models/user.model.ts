import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, default: 'User' },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true } // NOTE: in production hash passwords
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
export default User;
