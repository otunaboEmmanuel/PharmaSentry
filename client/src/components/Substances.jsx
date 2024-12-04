// Substances.js
import React, { useState, useEffect } from 'react';

const Substances = () => {
    const [substances, setSubstances] = useState([]);
    const [newSubstance, setNewSubstance] = useState({ Name: '', Type: '', Description: '' });
    const [editingSubstance, setEditingSubstance] = useState(null);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [substanceToDelete, setSubstanceToDelete] = useState(null);
    const apiUrl = 'http://localhost:8800/substances';

    useEffect(() => {
        fetchSubstances();
    }, []);

    const fetchSubstances = async () => {
        try {
            const response = await fetch(`${apiUrl}`);
            if (!response.ok) throw new Error('Failed to fetch substances');
            const data = await response.json();
            console.log(data)
            setSubstances(data);
        } catch (error) {
            console.error('Error fetching substances:', error.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editingSubstance) {
            setEditingSubstance({ ...editingSubstance, [name]: value });
        } else {
            setNewSubstance({ ...newSubstance, [name]: value });
        }
    };

    const handleAddSubstance = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newSubstance),
            });
            if (!response.ok) throw new Error('Failed to add substance');
            const data = await response.json();
            setSubstances([...substances, data]);
            setNewSubstance({ Name: '', Type: '', Description: '' });
        } catch (error) {
            console.error('Error adding substance:', error.message);
        }
    };

    const handleUpdateSubstance = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${apiUrl}/${editingSubstance.SubstanceID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingSubstance),
            });
            if (!response.ok) throw new Error('Failed to update substance');
            const data = await response.json();
            setSubstances(
                substances.map((substance) =>
                    substance.SubstanceID === editingSubstance.SubstanceID ? data : substance
                )
            );
            setEditingSubstance(null);
        } catch (error) {
            console.error('Error updating substance:', error.message);
        }
    };

    const handleDeleteSubstance = async (id) => {
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete substance');
            setSubstances(substances.filter((substance) => substance.SubstanceID !== id));
            setConfirmDeleteOpen(false);
        } catch (error) {
            console.error('Error deleting substance:', error.message);
        }
    };

    return (
        <>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Substances List</h2>
                <form onSubmit={editingSubstance ? handleUpdateSubstance : handleAddSubstance} className="flex flex-col mb-4">
                    <input
                        type="text"
                        name="Name"
                        placeholder="Substance Name"
                        value={editingSubstance ? editingSubstance.Name : newSubstance.Name}
                        onChange={handleInputChange}
                        className="mb-4 p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="text"
                        name="Type"
                        placeholder="Substance Type"
                        value={editingSubstance ? editingSubstance.Type : newSubstance.Type}
                        onChange={handleInputChange}
                        className="mb-4 p-2 border border-gray-300 rounded"
                        required
                    />
                    <textarea
                        name="Description"
                        placeholder="Description"
                        value={editingSubstance ? editingSubstance.Description : newSubstance.Description}
                        onChange={handleInputChange}
                        className="mb-4 p-2 border border-gray-300 rounded"
                    />
                    <button type="submit" className="bg-[#663399] text-white px-4 py-2 rounded hover:bg-green-500">
                        {editingSubstance ? 'Update Substance' : 'Add Substance'}
                    </button>
                    {editingSubstance && (
                        <button
                            type="button"
                            onClick={() => setEditingSubstance(null)}
                            className="mt-2 bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                    )}
                </form>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Substances List</h2>
                <div className="overflow-scroll sm:overflow-hidden">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-2 px-4 text-left">SubstanceID</th>
                                <th className="py-2 px-4 text-left">Name</th>
                                <th className="py-2 px-4 text-left">Type</th>
                                <th className="py-2 px-4 text-left">Description</th>
                                <th className="py-2 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {substances.map((substance) => (
                                <tr key={substance.SubstanceID} className="border-b">
                                    <td className="py-2 px-4">{substance.SubstanceID}</td>
                                    <td className="py-2 px-4">{substance.Name}</td>
                                    <td className="py-2 px-4">{substance.Type}</td>
                                    <td className="py-2 px-4">{substance.Description}</td>
                                    <td className="py-2 px-4">
                                        <button
                                            onClick={() => setEditingSubstance(substance)}
                                            className="text-blue-500 hover:underline mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => {
                                                setConfirmDeleteOpen(true);
                                                setSubstanceToDelete(substance.SubstanceID);
                                            }}
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
            {confirmDeleteOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-md">
                        <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
                        <p>Are you sure you want to delete this substance?</p>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => setConfirmDeleteOpen(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDeleteSubstance(substanceToDelete)}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    );
};

export default Substances; 