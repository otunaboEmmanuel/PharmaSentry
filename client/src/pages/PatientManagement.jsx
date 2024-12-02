import React, { useState, useEffect } from 'react';
import { AuthProvider } from '../components/Auth';
import Sidebar from '../components/Sidebar';
// import TopNav from '../components/topnav/TopNav';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const PatientManagement = ({ toggleSidebar, sidebarOpen }) => {
    const [patient, setPatient] = useState([]);
    const [newPatient, setNewPatient] = useState({ FirstName: '', LastName: '', DateOfBirth: '', Gender: '', Address: '', PhoneNumber: '', Email: '' });
    const [editingPatient, setEditingPatient] = useState(null);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [PatientToDelete, setPatientToDelete] = useState(null);

    const getPatient = async () => {
        try {
            const res = await fetch("http://localhost:8800/server/patient", {
                method: "GET",
            });
            if (res.ok) {
                const data = await res.json();
                console.log(data)
                setPatient(data);
            } else {
                console.error("Failed to fetch users:", res.statusText);
            }
        } catch (error) {
            console.error("API link not working", error);
        }
    };

    useEffect(() => {
        getPatient();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editingPatient) {
            setEditingPatient({ ...editingPatient, [name]: value });
        } else {
            setNewPatient({ ...newPatient, [name]: value });
        }
    };

    const handleAddPatient = async (e) => {
        e.preventDefault();
        if (Object.values(newPatient).every((field) => field.trim())) {
            try {
                const response = await fetch("http://localhost:8800/server/patient", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newPatient),
                });

                if (response.ok) {
                    const createdPatient = await response.json();
                    setPatient([...patient, createdPatient]);
                    setNewPatient({ FirstName: "", LastName: "", DateOfBirth: "", Gender: "", Address: "", PhoneNumber: "", Email: "" });
                } else {
                    console.error("Failed to add patient:", response.statusText);
                }
            } catch (error) {
                console.error("Error adding patient:", error.message);
            }
        } else {
            console.error("Please fill in all fields.");
        }
    };


    const handleEditPatient = (patient) => {
        setEditingPatient(patient);
    };

    const handleUpdatePatient = async (e) => {
        e.preventDefault();
        if (editingPatient) {
            try {
                const response = await fetch(`http://localhost:8800/server/patient${editingPatient.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editingPatient),
                });

                if (response.ok) {
                    setPatient(patient.map(patient => (patient.id === editingPatient.id ? editingPatient : patient)));
                    setEditingPatient(null);
                } else {
                    console.error("Failed to update user:", response.statusText);
                }
            } catch (error) {
                console.error("Error updating user:", error);
            }
        }
    };

    const handleDeletePatient = (id) => {
        setPatientToDelete(id);
        setConfirmDeleteOpen(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8800/server/patient/${PatientToDelete}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setPatient(patient.filter(patient => patient.id !== PatientToDelete));
                setConfirmDeleteOpen(false);
                setPatientToDelete(null);
            } else {
                console.error("Failed to delete patient:", response.statusText);
            }
        } catch (error) {
            console.error("Error deleting patient:", error);
        }
    };

    return (
        <AuthProvider>
            <div className="w-auto bg-[#c1beff] sm:ml-0 min-h-screen">
                <div className="flex flex-row">
                    <Sidebar />
                    <div className="ml-64 p-4 w-full">

                        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                            <h2 className="text-xl font-semibold mb-4">{editingPatient ? 'Edit Patient' : 'Add New Patient'}</h2>
                            <form onSubmit={editingPatient ? handleUpdatePatient : handleAddPatient} className="flex flex-col">
                                <input
                                    type="text"
                                    name="FirstName"
                                    placeholder="First name"
                                    value={editingPatient ? editingPatient.FirstName : newPatient.FirstName}
                                    onChange={handleInputChange}
                                    className="mb-4 p-2 border border-gray-300 rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    name="LastName"
                                    placeholder="Last name"
                                    value={editingPatient ? editingPatient.LastName : newPatient.LastName}
                                    onChange={handleInputChange}
                                    className="mb-4 p-2 border border-gray-300 rounded"
                                    required
                                />
                                <input
                                    type="date"
                                    name="DateOfBirth"
                                    placeholder="Date of Birth"
                                    value={editingPatient ? editingPatient.DateOfBirth : newPatient.DateOfBirth}
                                    onChange={handleInputChange}
                                    className="mb-4 p-2 border border-gray-300 rounded"
                                    required
                                />
                                <select
                                    name="Gender"
                                    value={editingPatient ? editingPatient.Gender : newPatient.Gender}
                                    onChange={handleInputChange}
                                    className="mb-4 p-2 border border-gray-300 rounded"
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                <input
                                    type="text"
                                    name="Address"
                                    placeholder="Address"
                                    value={editingPatient ? editingPatient.Address : newPatient.Address}
                                    onChange={handleInputChange}
                                    className="mb-4 p-2 border border-gray-300 rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    name="PhoneNumber"
                                    placeholder="Phone Number"
                                    value={editingPatient ? editingPatient.PhoneNumber : newPatient.PhoneNumber}
                                    onChange={handleInputChange}
                                    className="mb-4 p-2 border border-gray-300 rounded"
                                    required
                                />
                                <input
                                    type="email"
                                    name="Email"
                                    placeholder="Email"
                                    value={editingPatient ? editingPatient.Email : newPatient.Email}
                                    onChange={handleInputChange}
                                    className="mb-4 p-2 border border-gray-300 rounded"
                                    required
                                />

                                <button type="submit" className="bg-[#663399] text-white px-4 py-2 rounded hover:bg-green-500">
                                    {editingPatient ? 'Update Patient' : 'Add Patient'}
                                </button>
                                {editingPatient && (
                                    <button
                                        type="button"
                                        onClick={() => setEditingPatient(null)}
                                        className="mt-2 bg-gray-500 text-white px-4 py-2 rounded"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </form>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Patient List</h2>
                            <div className='overflow-scroll sm:overflow-hidden'>
                                <table className="min-w-full bg-white border border-gray-300">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="py-2 px-4 text-left">First Name</th>
                                            <th className="py-2 px-4 text-left">Last name</th>
                                            <th className="py-2 px-4 text-left">Date of Birth</th>
                                            <th className="py-2 px-4 text-left">Gender</th>
                                            <th className="py-2 px-4 text-left">Address</th>
                                            <th className="py-2 px-4 text-left">Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {patient.map(patient => (
                                            <tr key={patient.id} className="border-b">
                                                <td className="py-2 px-4">{patient.FirstName}</td>
                                                <td className="py-2 px-4">{patient.LastName}</td>
                                                <td className="py-2 px-4">{patient.DateOfBirth}</td>
                                                <td className="py-2 px-4">{patient.Gender}</td>
                                                <td className="py-2 px-4">{patient.Address}</td>
                                                <td className="py-2 px-4">{patient.Email}</td>
                                                <td className="py-2 px-4">
                                                    <button
                                                        onClick={() => handleEditPatient(patient)}
                                                        className="text-blue-500 hover:underline mr-2"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeletePatient(patient.id)}
                                                        className="text-red-500 hover:underline"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
                            <DialogTitle>Confirm Delete</DialogTitle>
                            <DialogContent>
                                <p>Are you sure you want to delete this user?</p>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setConfirmDeleteOpen(false)} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={confirmDelete} color="secondary">
                                    Delete
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
            </div>
        </AuthProvider >
    );
};

export default PatientManagement;