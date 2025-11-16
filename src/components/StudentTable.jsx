import React, { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "../api/studentApi";
import StudentForm from "./StudentForm";

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  const fetchStudents = async () => {
    const res = await getStudents();
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    fetchStudents();
  };

  const handleFormClose = () => {
    setEditingStudent(null);
    fetchStudents();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student List</h1>
      <StudentForm student={editingStudent} onClose={handleFormClose} />
      <table className="min-w-full bg-white border mt-6">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Course</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.studentId}>
              <td className="border px-4 py-2">{s.studentId}</td>
              <td className="border px-4 py-2">{s.firstName} {s.lastName}</td>
              <td className="border px-4 py-2">{s.email}</td>
              <td className="border px-4 py-2">{s.phone}</td>
              <td className="border px-4 py-2">{s.course}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 mr-2"
                  onClick={() => handleEdit(s)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1"
                  onClick={() => handleDelete(s.studentId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;