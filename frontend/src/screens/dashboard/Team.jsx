import React, { useEffect, useState } from 'react'
import axiosInstance from "../../../axiosConfig";
const Team = () => {
  
  const [teams, setTeams] = useState(null);

  const fetchAllTeams = async () => {
    const res = await axiosInstance.get('/team/');
    setTeams(res.data);
  }

  useEffect(() => {
    fetchAllTeams();
  }, [])


  return (
    <div className=' bg-gray-200 w-full min-h-screen flex flex-col   font-Inter'>
    
    <h1 className=" text-2xl font-Popin font-bold p-4">Available Teams</h1>
   
       {
      teams ? teams.map((team) => (
        <div key={team._id} className="flex flex-col bg-white m-4 p-4 shadow-lg rounded-lg">
          <h1 className="text-lg font-bold">Hazard Name : {team.name}</h1>
         {team.members.map((member) => (
            <div key={member._id} className="flex flex-col p-2">
              <p className="text-sm">Name: {member.name}</p>
              <p className="text-sm">Mobile: {member.mobile}</p>
            </div>
          ))}
        </div>
      )) : <h1>Loading...</h1>}

  </div>
  )
}

export default Team