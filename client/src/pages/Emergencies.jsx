// Emergencies.js
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Substances from '../components/Substances'; // Import the Substances component

const Emergencies = () => {
  const [editingIncident, setEditingIncident] = useState(null);
  const [newIncident, setNewIncident] = useState({
    PatientID: '',
    SubstanceID: '',
    IncidentDate: '',
    Severity: '',
    Notes: '',
  });
  const [incidents, setIncidents] = useState([]);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [incidentToDelete, setIncidentToDelete] = useState(null);
  const apiUrl = 'http://localhost:8800/overdoseIncidents';

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Failed to fetch incidents');
      const data = await response.json();
      setIncidents(data);
    } catch (error) {
      console.error('Error fetching incidents:', error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingIncident) {
      setEditingIncident({ ...editingIncident, [name]: value });
    } else {
      setNewIncident({ ...newIncident, [name]: value });
    }
  };

  const handleAddIncident = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newIncident),
      });
      if (!response.ok) throw new Error('Failed to add incident');
      const data = await response.json();
      setIncidents([...incidents, data.incident]);
      setNewIncident({
        PatientID: '',
        SubstanceID: '',
        IncidentDate: '',
        Severity: '',
        Notes: '',
      });
    } catch (error) {
      console.error('Error adding incident:', error.message);
    }
  };

  const handleUpdateIncident = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/${editingIncident.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingIncident),
      });
      if (!response.ok) throw new Error('Failed to update incident');
      const data = await response.json();
      setIncidents(
        incidents.map((incident) =>
          incident.id === editingIncident.id ? data.updatedIncident : incident
        )
      );
      setEditingIncident(null);
    } catch (error) {
      console.error('Error updating incident:', error.message)
    }
  };

  const handleDeleteIncident = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete incident');
      setIncidents(incidents.filter((incident) => incident.id !== id));
      setConfirmDeleteOpen(false);
    } catch (error) {
      console.error('Error deleting incident:', error.message);
    }
  };

  return (
    <div className="w-auto bg-[#c1beff] sm:ml-0 min-h-screen">
      <div className="flex flex-row">
        <Sidebar />
        <div className="ml-64 p-4 w-full">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingIncident ? 'Edit Overdose Incident' : 'Add New Overdose Incident'}
            </h2>
            <form
              onSubmit={editingIncident ? handleUpdateIncident : handleAddIncident}
              className="flex flex-col"
            >
              <input
                type="text"
                name="PatientID"
                placeholder="Patient ID"
                value={editingIncident ? editingIncident.PatientID : newIncident.PatientID}
                onChange={handleInputChange}
                className="mb-4 p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="SubstanceID"
                placeholder="Substance ID"
                value={editingIncident ? editingIncident.SubstanceID : newIncident.SubstanceID}
                onChange={handleInputChange}
                className="mb-4 p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="date"
                name="IncidentDate"
                value={editingIncident ? editingIncident.IncidentDate : newIncident.IncidentDate}
                onChange={handleInputChange}
                className="mb-4 p-2 border border-gray-300 rounded"
                required
              />
              <select
                name="Severity"
                value={editingIncident ? editingIncident.Severity : newIncident.Severity}
                onChange={handleInputChange}
                className="mb-4 p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Select Severity</option>
                <option value="Mild">Mild</option>
                <option value="Moderate">Moderate</option>
                <option value="Severe">Severe</option>
              </select>
              <textarea
                name="Notes"
                placeholder="Additional Notes"
                value={editingIncident ? editingIncident.Notes : newIncident.Notes}
                onChange={handleInputChange}
                className="mb-4 p-2 border border-gray-300 rounded"
              />
              <button type="submit" className="bg-[#663399] text-white px-4 py-2 rounded hover:bg-green-500">
                {editingIncident ? 'Update Incident' : 'Add Incident'}
              </button>
              {editingIncident && (
                <button
                  type="button"
                  onClick={() => setEditingIncident(null)}
                  className="mt-2 bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              )}
            </form>
          </div>
          <Substances /> {/* Render the Substances component */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Overdose Incidents List</h2>
            <div className="overflow-scroll sm:overflow-hidden">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-2 px-4 text-left">Patient ID</th>
                    <th className="py-2 px-4 text-left">Substance ID</th>
                    <th className="py-2 px-4 text-left">Date</th>
                    <th className="py-2 px-4 text-left">Severity</th>
                    <th className="py-2 px-4 text-left">Notes</th>
                    <th className="py-2 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {incidents.map((incident) => (
                    <tr key={incident.IncidentID} className="border-b">
                      <td className="py-2 px-4">{incident.PatientID}</td>
                      <td className="py-2 px-4">{incident.SubstanceID}</td>
                      <td className="py-2 px-4">
                        {new Date(incident.IncidentDate).toLocaleString()}
                      </td>
                      <td className="py-2 px-4">{incident.Severity}</td>
                      <td className="py-2 px-4">{incident.Notes}</td>
                      <td className="py-2 px-4">
                        <button
                          onClick={() => setEditingIncident(incident)}
                          className="text-blue-500 hover:underline mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setConfirmDeleteOpen(true);
                            setIncidentToDelete(incident.id);
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
                <p>Are you sure you want to delete this incident?</p>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setConfirmDeleteOpen(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDeleteIncident(incidentToDelete)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Emergencies;