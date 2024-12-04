import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [totalPatients, setTotalPatients] = useState(0);
  const [patients, setPatients] = useState([]);
  const [totalOverdoseIncidents, setOverdoseIncidents] = useState([]);
  const [treatmentPrograms, setTreatmentPrograms] = useState([]);
  const [treatmentSessions, setTreatmentSessions] = useState([]); // New state for treatment sessions

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          userResponse,
          patientsResponse,
          treatmentResponse,
          overdoseResponse,
          sessionsResponse, // Fetch treatment sessions
        ] = await Promise.all([
          fetch('http://localhost:8800/server/auth/login'),
          fetch('http://localhost:8800/patients/allpatients'),
          fetch('http://localhost:8800/treatmentPrograms'),
          fetch('http://localhost:8800/overdoseIncidents'),
          fetch('http://localhost:8800/treatmentSessions'), // Updated endpoint for sessions
        ]);

        if (
          !userResponse.ok ||
          !patientsResponse.ok ||
          !treatmentResponse.ok ||
          !overdoseResponse.ok ||
          !sessionsResponse.ok // Check for sessions response
        ) {
          throw new Error('Network response was not ok');
        }
        const userData = await userResponse.json()
        const patientsData = await patientsResponse.json();
        const overdoseData = await overdoseResponse.json();
        const treatmentData = await treatmentResponse.json();
        const sessionsData = await sessionsResponse.json(); // Get sessions data
        console.log(userData);
        setTotalPatients(patientsData.length || 0);
        setPatients(patientsData);
        setOverdoseIncidents(overdoseData.length || 0);
        setTreatmentPrograms(treatmentData);
        setTreatmentSessions(sessionsData); // Set sessions data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const calculateAge = (dateOfBirth) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  // Function to mark a patient as complete
  const handleMarkComplete = (patient) => {
    const updatedPatients = patients.map((p) => {
      if (p.PatientID === patient.PatientID) {
        return { ...p, Status: 'completed treatment' };
      }
      return p;
    });
    setPatients(updatedPatients);
  };

  // Function to unmark a patient as complete
  const handleUnmarkComplete = (patientID) => {
    const updatedPatients = patients.map((p) => {
      if (p.PatientID === patientID) {
        return { ...p, Status: 'undergoing treatment' };
      }
      return p;
    });
    setPatients(updatedPatients);
  };

  return (
    <>
      <div className="w-auto bg-[#c1beff] sm:ml-0 min-h-screen">
        <div className="flex flex-row">
          <Sidebar />
          <div className="ml-64 p-4 w-full">
            <h1 className="text-2xl font-bold">Welcome </h1>
            <div className="gap-6 mt-4 w-full flex flex-row flex-wrap">
              {/* Card 1: Total Patients */}
              <div className="bg-white p-6 rounded-lg shadow-md flex-1 min-w-[250px]">
                <h2 className="text-xl font-semibold">Total Patients</h2>
                <p className="text-2xl font-bold">{totalPatients}</p>
              </div>

              {/* Card 4: Overdose Incidents */}
              <div className="bg-white p-6 rounded-lg shadow-md flex-1 min-w-[250px]">
                <h2 className="text-xl font-semibold">Total Overdose Incidents</h2>
                <p className="text-2xl font-bold">{totalOverdoseIncidents}</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md w-full">
                <h2 className="text-xl font-semibold mb-4">Patients List</h2>
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="w-full bg-gray-200 text-gray-700">
                      <th className="py-2 px-4 border-b text-left">Name</th>
                      <th className="py-2 px-4 border-b text-left">Age</th>
                      <th className="py-2 px-4 border-b text-left">Treatment Program</th>
                      <th className="py-2 px-4 border-b text-left">Status</th>
                      <th className="py-2 px-4 border-b text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.length > 0 ? (
                      patients.map((patient, index) => {
                        // Find the session related to the patient
                        const session = treatmentSessions.find(
                          (session) => session.PatientID === patient.PatientID
                        );

                        // Find the program related to the session
                        const program = session
                          ? treatmentPrograms.find(
                            (program) => program.ProgramID === session.ProgramID
                          )
                          : null;

                        return (
                          <tr key={index} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b text-left">{`${patient.FirstName} ${patient.LastName}`}</td>
                            <td className="py-2 px-4 border-b text-left">{calculateAge(patient.DateOfBirth)}</td>
                            <td className="py-2 px-4 border-b text-left">
                              {program ? program.Name : 'No program assigned'}
                            </td>
                            <td className="py-2 px-4 border-b text-left">{patient.Status}</td>
                            <td className="py-2 px-4 border-b text-left">
                              <button
                                onClick={() => handleMarkComplete(patient)}
                                className="text-white bg-[#663399] hover:bg-green-500 p-2 rounded mr-2"
                              >
                                Mark Complete
                              </button>
                              <button
                                onClick={() => handleUnmarkComplete(patient.PatientID)}
                                className="bg-red-500 text-white p-2 rounded"
                              >
                                Mark Not Complete
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="5" className="py-2 text-center">
                          No patients available
                        </td>
                      </tr>
                    )}
                  </tbody>

                </table>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md w-full">
                <h2 className="text-xl font-semibold mb-4 ">Treatment Programs</h2>
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="w-full bg-gray-200 text-gray-700">
                      <th className="py-2 px-4 border-b text-left">Name</th>
                      <th className="py-2 px-4 border-b text-left">Description</th>
                      <th className="py-2 px-4 border-b text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {treatmentPrograms.map((program, index) => (
                      <tr key={index} className="hover:bg-gray-100">
                        <td className="py-2 px-4 border-b text-left">{program.Name}</td>
                        <td className="py-2 px-4 border-b text-left">{program.Description}</td>
                        <td className="py-2 px-4 border-b text-left">
                          <button className="text-white bg-[#663399] hover:bg-green-500 p-2 rounded mr-2">Edit</button>
                          <button className="bg-red-500 text-white p-2 rounded">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Dashboard;