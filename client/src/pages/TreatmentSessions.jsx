import React, { useState, useEffect } from 'react';
import { AuthProvider } from '../components/Auth';
import Sidebar from '../components/Sidebar';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const TreatmentSessions = ({ toggleSidebar, sidebarOpen }) => {
    const [sessions, setSessions] = useState([]);
    const [newSession, setNewSession] = useState({ PatientID: '', ProgramID: '', SessionDate: '', Notes: '' });
    const [editingSession, setEditingSession] = useState(null);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [sessionToDelete, setSessionToDelete] = useState(null);

    const getSessions = async () => {
        try {
            const res = await fetch("http://localhost:8800/treatmentSessions", {
                method: "GET",
            });

            if (res.ok) {
                const data = await res.json();
                setSessions(data);
            } else {
                console.error("Failed to fetch sessions:", res.statusText);
            }
        } catch (error) {
            console.error("API link not working", error);
        }
    };

    useEffect(() => {
        getSessions();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editingSession) {
            setEditingSession({ ...editingSession, [name]: value });
        } else {
            setNewSession({ ...newSession, [name]: value });
        }
    };

    const handleAddSession = async (e) => {
        e.preventDefault();
        if (Object.values(newSession).every((field) => field.trim())) {
            try {
                const response = await fetch("http://localhost:8800/treatmentSessions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newSession),
                });

                if (response.ok) {
                    const createdSession = await response.json();
                    setSessions([...sessions, createdSession]);
                    setNewSession({ PatientID: "", ProgramID: "", SessionDate: "", Notes: "" });
                } else {
                    console.error("Failed to add session:", response.statusText);
                }
            } catch (error) {
                console.error("Error adding session:", error.message);
            }
        } else {
            console.error("Please fill in all fields.");
        }
    };

    const handleEditSession = (session) => {
        setEditingSession(session);
    };

    const handleUpdateSession = async (e) => {
        e.preventDefault();
        if (editingSession) {
            try {
                const response = await fetch(`http://localhost:8800/treatment-sessions/${editingSession.SessionID}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editingSession),
                });

                if (response.ok) {
                    setSessions(sessions.map(session => (session.SessionID === editingSession.SessionID ? editingSession : session)));
                    setEditingSession(null);
                } else {
                    console.error("Failed to update session:", response.statusText);
                }
            } catch (error) {
                console.error("Error updating session:", error);
            }
        }
    };

    const handleDeleteSession = (id) => {
        setSessionToDelete(id);
        setConfirmDeleteOpen(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8800/treatmentSessions/${sessionToDelete}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setSessions(sessions.filter(session => session.SessionID !== sessionToDelete));
                setConfirmDeleteOpen(false);
                setSessionToDelete(null);
            } else {
                console.error("Failed to delete session:", response.statusText);
            }
        } catch (error) {
            console.error("Error deleting session:", error);
        }
    };

    return (
        <AuthProvider>
            <div className="w-auto bg-[#c1beff] sm:ml-0 min-h-screen">
                <div className="flex flex-row">
                    <Sidebar />
                    <div className="ml-64 p-4 w-full">
                        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                            <h2 className="text-xl font-semibold mb-4">{editingSession ? 'Edit Session' : 'Add New Session'}</h2>
                            <form onSubmit={editingSession ? handleUpdateSession : handleAddSession} className="flex flex-col">
                                <input
                                    type="text"
                                    name="PatientID"
                                    placeholder="Patient ID"
                                    value={editingSession ? editingSession.PatientID : newSession.PatientID}
                                    onChange={handleInputChange}
                                    className="mb-4 p-2 border border-gray-300 rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    name="ProgramID"
                                    placeholder="Program ID"
                                    value={editingSession ? editingSession.ProgramID : newSession.ProgramID}
                                    onChange={handleInputChange}
                                    className="mb-4 p-2 border border-gray-300 rounded"
                                    required
                                />
                                <input
                                    type="date"
                                    name="SessionDate"
                                    placeholder="Date"
                                    value={editingSession ? editingSession.SessionDate : newSession.SessionDate}
                                    onChange={handleInputChange}
                                    className="mb-4 p-2 border border-gray-300 rounded"
                                    required
                                />
                                <textarea
                                    name="Notes"
                                    placeholder="Notes"
                                    value={editingSession ? editingSession.Notes : newSession.Notes}
                                    onChange={handleInputChange}
                                    className="mb-4 p-2 border border-gray-300 rounded"
                                    required
                                />
                                <button type="submit" className="bg-[#663399] text-white px-4 py-2 rounded hover:bg-green-500">
                                    {editingSession ? 'Update Session' : 'Add Session'}
                                </button>
                                {editingSession && (
                                    <button
                                        type="button"
                                        onClick={() => setEditingSession(null)}
                                        className="mt-2 bg-gray-500 text-white px-4 py-2 rounded"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </form>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Session List</h2>
                            <div className='overflow-scroll sm:overflow-hidden'>
                                <table className="min-w-full bg-white border border-gray-300">
                                    <thead>
                                        <tr className="bg-gray-200">
                                        <th className="py-2 px-4 text-left">Session ID</th>
                                            <th className="py-2 px-4 text-left">Patient ID</th>
                                            <th className="py-2 px-4 text-left">Program ID</th>
                                            <th className="py-2 px-4 text-left">Date</th>
                                            <th className="py-2 px-4 text-left">Notes</th>
                                            <th className="py-2 px-4 text-left">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sessions.map(session => (
                                            <tr key={session.SessionID} className="border-b">
                                                <td className="py-2 px-4">{session.SessionID}</td>
                                                <td className="py-2 px-4">{session.PatientID}</td>
                                                <td className="py-2 px-4">{session.ProgramID}</td>
                                                <td className="py-2 px-4">{session.SessionDate}</td>
                                                <td className="py-2 px-4">{session.Notes}</td>
                                                <td className="py-2 px-4">
                                                    <button
                                                        onClick={() => handleEditSession(session)}
                                                        className="text-blue-500 hover:underline mr-2"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteSession(session.SessionID)}
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
                                <p>Are you sure you want to delete this session?</p>
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
        </AuthProvider>
    );
};

export default TreatmentSessions;