import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [totalPatients, setTotalPatients] = useState(0);
  const [patients, setPatients] = useState([]); // State to hold patient data
  const [overdoseIncidents, setOverdoseIncidents] = useState([]);
  const [emergencyVisits, setEmergencyVisits] = useState(0);
  const [treatmentPrograms, setTreatmentPrograms] = useState([]);
  const [communityResources, setCommunityResources] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]); // Assuming you have a state for recent activities

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          patientsResponse,
          overdoseResponse,
          emergencyResponse,
          treatmentResponse,
          communityResponse,
        ] = await Promise.all([
          fetch('http://localhost:8800/patients/allpatients'), // Updated endpoint
          fetch('http://localhost:8800/server/overview/overdose-incidents'),
          fetch('http://localhost:8800/server/overview/emergency-visits'),
          fetch('http://localhost:8800/treatmentPrograms'), // Updated endpoint
          fetch('http://localhost:8800/server/overview/community-resources'),
        ]);

        if (
          !patientsResponse.ok ||
          !overdoseResponse.ok ||
          !emergencyResponse.ok ||
          !treatmentResponse.ok ||
          !communityResponse.ok
        ) {
          throw new Error('Network response was not ok');
        }

        const patientsData = await patientsResponse.json();
        const overdoseData = await overdoseResponse.json();
        const emergencyData = await emergencyResponse.json();
        const treatmentData = await treatmentResponse.json();
        const communityData = await communityResponse.json();
        console.log(treatmentData);
        setTotalPatients(patientsData.length || 0); // Assuming patientsData is an array
        setPatients(patientsData); // Set the patients data
        setOverdoseIncidents(overdoseData.overdoseIncidents || []);
        setEmergencyVisits(emergencyData.emergencyVisits || 0);
        setTreatmentPrograms(treatmentData);
        setCommunityResources(communityData.communityResources || 0);
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

    // Adjust age if the birthday hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  // Function to mark a patient as complete
  const handleMarkComplete = (patient) => {
    const updatedPatients = patients.map((p) => {
      if (p.PatientID === patient.PatientID) {
        return { ...p, Status: 'completed treatment' }; // Update status
      }
      return p;
    });
    setPatients(updatedPatients);
  };

  // Function to unmark a patient as complete
  const handleUnmarkComplete = (patientID) => {
    const updatedPatients = patients.map((p) => {
      if (p.PatientID === patientID) {
        return { ...p, Status: 'undergoing treatment' }; // Update status
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
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="gap-6 mt-4 w-full flex flex-row flex-wrap">
              {/* Card 1: Total Patients */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">Total Patients</h2>
                <p className="text-2xl font-bold">{totalPatients}</p>
              </div>

              {/* Card 2: Emergency Visits */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">Emergency Visits</h2>
                <p className="text-2xl font-bold">{emergencyVisits}</p>
              </div>

              {/* Card 3: Community Resources */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">Community Resources</h2>
                <p className="text-2xl font-bold">{communityResources}</p>
              </div>

              {/* Card 4: Overdose Incidents */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">Overdose Incidents</h2>
                <ul className="mt-2">
                  {overdoseIncidents.length > 0 ? (
                    overdoseIncidents.map((incident, index) => (
                      <li key={index}>
                        <span>Severity: {incident.severity}, Count: {incident.count}</span>
                      </li>
                    ))
                  ) : (
                    <li>No incidents available</li>
                  )}
                </ul>
              </div>

              {/* Card 5: Treatment Programs */}
              <div className="bg-white p-6 rounded-lg shadow-md w-full">
                <h2 className="text-xl font-semibold mb-4">Treatment Programs</h2>
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="w-full bg-gray-200 text-gray-700">
                      <th className="py-2 px-4 border-b text-left">Treatment ID</th>
                      <th className="py-2 px-4 border-b text-left">Treatment Program</th>
                      <th className="py-2 px-4 border-b text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {treatmentPrograms.length > 0 ? (
                      treatmentPrograms.map((treatment, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                          <td className="py-2 px-4 border-b text-left">{treatment.ProgramID}</td>
                          <td className="py-2 px-4 border-b text-left">{treatment.Name}</td>
                          <td className="py-2 px-4 border-b text-left">{treatment.Description}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="py-2 text-center">No patients available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Card 6: Patients List */}
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
                      patients.map((patient, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                          <td className="py-2 px-4 border-b text-left">{`${patient.FirstName} ${patient.LastName}`}</td>
                          <td className="py-2 px-4 border-b text-left">{calculateAge(patient.DateOfBirth)}</td>
                          <td className="py-2 px-4 border-b text-left">{}</td>
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
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="py-2 text-center">No patients available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Card 7: Recent Activity */}
              <div className="bg-white p-6 rounded-lg shadow-md w-full">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <ul>
                  {recentActivities.length > 0 ? (
                    recentActivities.map((activity, index) => (
                      <li key={index} className="border-b py-2">
                        {activity.message} <span className="text-gray-500">({activity.date})</span>
                      </li>
                    ))
                  ) : (
                    <li>No recent activities available</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;