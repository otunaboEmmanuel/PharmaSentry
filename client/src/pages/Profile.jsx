import { React, useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'

const Profile = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    profilePicture: null,
  });

  const [isEditable, setIsEditable] = useState(false); // State to manage editability

  useEffect(() => {
    // Simulate fetching user data from the backend
    const fetchUserData = async () => {
      // Replace this with your API call
      const fetchedUserData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        profilePicture: null,
      };
      setUser(fetchedUserData);
    };

    fetchUserData();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser({ ...user, profilePicture: URL.createObjectURL(file) });
    }
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    // Logic to save changes (e.g., API call)
    console.log('User  data saved:', user);
  };

  return (
    <>
      <div className="w-auto bg-[#c1beff] sm:ml-0 min-h-screen">
        <div className='flex flex-row'>
          <Sidebar />
          <div className="ml-64 p-4 w-full">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-semibold mb-4">User  Information</h2>
              <form onSubmit={handleSaveChanges}>
                <div className="mb-4">
                  <label className="block text-gray-700">Profile Picture</label>
                  <div className="flex items-center mb-4">
                    {user.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt="Profile"
                        className="w-24 h-24 rounded-full mr-4"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gray-300 mr-4"></div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    disabled // Disable the input
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    disabled // Disable the input
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Phone</label>
                  <input
                    type="tel"
                    value={user.phone}
                    onChange={(e) => setUser({ ...user, phone: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    placeholder="Enter your phone number"
                  />
                </div>
                <button className="bg-[#663399] text-white px-4 py-2 rounded-md">Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile