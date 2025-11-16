import React, { useEffect, useState } from "react";
import { addStudent, updateStudent } from "../api/studentApi";

const StudentForm = ({ student, onClose }) => {
  const [formData, setFormData] = useState({
    studentId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "Male",
    dob: "",
    address: "",
    course: "IT",
    // Backend expects 'registrationDate' (not 'registeredDate')
    registrationDate: "",
    status: "Active",
    notes: "",
  });

  useEffect(() => {
    if (student) {
      setFormData(student);
    }
  }, [student]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Ensure registrationDate is set if blank when adding new student
    const payload = {
      ...formData,
      registrationDate:
        formData.registrationDate || new Date().toISOString().substring(0, 10), // yyyy-mm-dd
    };
    if (student) {
      await updateStudent(student.studentId, payload);
    } else {
      await addStudent(payload);
    }
    onClose();
    setFormData({
      studentId: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: "Male",
      dob: "",
      address: "",
      course: "IT",
      registrationDate: "",
      status: "Active",
      notes: "",
    });
  };

  return (
    <form className="bg-gray-100 p-4 rounded" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Student ID"
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
          className="border p-2 w-full"
          disabled={!!student} // disable if editing
          required
        />
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <select
          name="course"
          value={formData.course}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option>IT</option>
          <option>SE</option>
          <option>DS</option>
        </select>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>
        <input
          type="date"
          name="registrationDate"
          value={formData.registrationDate}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Registration Date"
        />
      </div>
      <textarea
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address"
        className="border p-2 w-full mt-2"
      ></textarea>
      <textarea
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        placeholder="Notes"
        className="border p-2 w-full mt-2"
      ></textarea>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 mt-2"
      >
        {student ? "Update" : "Add"} Student
      </button>
    </form>
  );
};

export default StudentForm;