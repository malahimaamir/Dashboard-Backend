import mongoose, { Document, Model, Types  } from "mongoose";
import bcrypt from "bcryptjs";

// Step 1: Define the interface
export interface IUser extends Document {
    _id: Types.ObjectId;
  fullName: string;
  email: string;
  password: string;
  userId: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Step 2: Define the schema
const userSchema = new mongoose.Schema<IUser>(
  {
    userId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
  },
  { timestamps: true }
);

// Step 3: Pre-save hook
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Step 4: Add the comparePassword method
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Step 5: Export the model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
