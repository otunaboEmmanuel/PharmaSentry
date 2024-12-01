import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [totalPatients, setTotalPatients] = useState(0);
  const [overdoseIncidents, setOverdoseIncidents] = useState([]);
  const [emergencyVisits, setEmergencyVisits] = useState(0);
  const [treatmentPrograms, setTreatmentPrograms] = useState([]);
  const [communityResources, setCommunityResources] = useState(0);

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
          fetch('http://localhost:8800/server/overview/total-patients'),
          fetch('http://localhost:8800/server/overview/overdose-incidents'),
          fetch('http://localhost:8800/server/overview/emergency-visits'),
          fetch('http://localhost:8800/server/overview/treatment-programs'),
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

        setTotalPatients(patientsData.totalPatients || 0);
        setOverdoseIncidents(overdoseData.overdoseIncidents || []);
        setEmergencyVisits(emergencyData.emergencyVisits || 0);
        setTreatmentPrograms(treatmentData.treatmentPrograms || []);
        setCommunityResources(communityData.communityResources || 0);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="w-auto bg-[#c1beff] sm:ml-0 min-h-screen">
        <div className="flex flex-row">
          <Sidebar />
          <div className="ml-64 p-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {/* Card 1: Total Patients */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">Total Patients</h2>
                <p className="text-2xl font-bold">{totalPatients}</p>
              </div>

              {/* Card 2: Overdose Incidents */}
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

              {/* Card 3: Emergency Visits */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">Emergency Visits</h2>
                <p className="text-2xl font-bold">{emergencyVisits}</p>
              </div>

              {/* Card 4: Treatment Programs */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">Treatment Programs</h2>
                <ul className="mt-2">
                  {treatmentPrograms.length > 0 ? (
                    treatmentPrograms.map((program, index) => (
                      <li key={index}>
                        <span>Status: {program.status}, Count: {program.count}</span>
                      </li>
                    ))
                  ) : (
                    <li>No programs available</li>
                  )}
                </ul>
              </div>

              {/* Card 5: Community Resources */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">Community Resources</h2>
                <p className="text-2xl font-bold">{communityResources}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
