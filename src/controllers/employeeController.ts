// File: server/controllers/employeeController.ts
import { Request, Response } from "express";
import Employee from "../models/Employee";

export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const addEmployee = async (req: Request, res: Response) => {
  try {
    const newEmployee = new Employee({
      name: `${req.body.firstName} ${req.body.lastName}`,
      email: req.body.email,
      phone: req.body.phone,
      department: req.body.department,
      position: req.body.position,
      status: "Active",
      joinDate: req.body.startDate,
      salary: req.body.salary,
      avatar: "/placeholder.svg",
    });

    await newEmployee.save();
    res.status(201).json({ message: "Employee added successfully", employee: newEmployee });
  } catch (error) {
    res.status(500).json({ message: "Failed to add employee" });
  }
};

export const getEmployeeStats = async (req: Request, res: Response) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const activeToday = await Employee.countDocuments({ status: "Active" });
    const onLeave = await Employee.countDocuments({ status: "On Leave" });

    const avgSalary = await Employee.aggregate([
      {
        $group: {
          _id: null,
          averageSalary: { $avg: { $toDouble: "$salary" } },
        },
      },
    ]);

    const departments = await Employee.distinct("department");

    res.json({
      totalEmployees,
      activeToday,
      avgSalary: avgSalary[0]?.averageSalary || 0,
      onLeave,
      departmentCount: departments.length,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};

export const getRecentEmployees = async (req: Request, res: Response) => {
  try {
    const recentEmployees = await Employee.find().sort({ createdAt: -1 }).limit(5);
    res.json(recentEmployees);
  } catch (err) {
    res.status(500).json({ message: "Failed to load recent activity" });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};
