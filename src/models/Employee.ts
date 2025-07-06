// File: server/models/Employee.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IEmployee extends Document {
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  status: string;
  joinDate: string;
  salary: string;
  avatar: string;
  createdAt: Date;
}

const employeeSchema: Schema = new mongoose.Schema<IEmployee>({
  name: String,
  email: String,
  phone: String,
  department: String,
  position: String,
  status: String,
  joinDate: String,
  salary: String,
  avatar: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Employee = mongoose.model<IEmployee>("Employee", employeeSchema);
export default Employee;
