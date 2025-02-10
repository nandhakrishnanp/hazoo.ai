import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import LineChartComponent from '../../components/LineChartComponent';
import axiosInstance from '../../../axiosConfig';
import HazardBarChart from '../../components/BarChart';

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

const Analytics = () => {

   const [hazards,setHazards] = useState(null);
  const [selectedHazard,setSelectedHazard] = useState(null);
  const [filteredHazards,setFilteredHazards] = useState(null);
  const fetchHazards = async () => {
    try {
      const response = await axiosInstance.get("/hazard/getallhazards");
      const data = await response.data.data;
      setHazards(data);
      setFilteredHazards(data);
     
      console.log(data);

     
    } catch (error) {
      console.error("Failed to fetch hazards:", error);
    }
  };

   const hazardslist= [
    "Potholes & Cracks",
    "Fallen Debris",
    "Poor Visibility Conditions",
    "Accidents",
    "Animal Crossing",
    "work in progress"
  ]
  useEffect(() => {
    fetchHazards();
  }, []);
  useEffect(()=>{
    if(hazards){

      if(selectedHazard === 'all'){
        setFilteredHazards(hazards)
      }else{
        const filtered = hazards.filter((item)=>item.hazard_type === selectedHazard)
        setFilteredHazards(filtered)
      }
    }
    console.log(filteredHazards);
    
  },[selectedHazard])
  return (
    <div className=' bg-gray-200 w-full min-h-screen  font-Inter items-center justify-center'>
      <p className='  font-Inter p-5 text-xl font-bold'>Analytics</p>
     
       <div>
           <div className=' px-5  flex  gap-2  py-2'>
            <p>Select Hazard</p>
           <select onChange={(e)=>{
            setSelectedHazard(e.target.value)
           }} className=' cursor-pointer'>
            {
              hazardslist.map((item)=>(
                <option value={item}>{item}</option>
              ))
            }
           </select>
           </div>
        
           {
            hazards ? <LineChartComponent hazardData={filteredHazards}/> : <h1>Loading...</h1>
           }
        
            


            <p className=' px-9 text-lg  font-bold'>Hazard Wise Analysis</p>
          {
            hazards ? <HazardBarChart hazardData={hazards}/>
            : <h1>Loading...</h1>
          }
       </div>
    </div>
  )
}

export default Analytics