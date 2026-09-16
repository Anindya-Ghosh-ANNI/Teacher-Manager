import { useEffect, useState } from "react"
import {TeacherCard} from "../../index.js";

function Home_student() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [teacherData, setTeacherData] = useState([]);

  useEffect(()=>{
    ;( async ()=>{
      try {
        const response = await fetch(`${API_URL}/teacher/getAllActive`);
        const data = await response.json();
  
        if(!response.ok){
          throw new Error(data.message || "Couldn't fetch Teachers data.");
        }
  
        console.log(data.data);
        setTeacherData(data.data)
      } 
      catch (error) {
        console.log(error);
      }
    })()  
  
  }, [])          


  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {teacherData.map((val, idx)=>(
          <TeacherCard
            key={val._id}
            name={val.fullname}
          />
        ))}
      </div>
    </>
  )
}

export default Home_student