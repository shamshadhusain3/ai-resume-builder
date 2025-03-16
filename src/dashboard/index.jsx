import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from '../../service/GlobalApi';
import ResumeCardItem from './components/ResumeCardItem';
import dummy from '@/data/dummy';

function Dashboard() {
  const {user}=useUser();
  const [resumeList, setresumeList] = useState([]);


  useEffect(()=>{
    user&&GetResumeList()
  },[user])
  const GetResumeList=()=>{
    GlobalApi.GetUserResume(user.primaryEmailAddress.emailAddress).then((res)=>{
      console.log('response',res.data.data)
      setresumeList(res.data.data)
    })
  }
  console.log(resumeList.length,'resumeList')
  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p className="">Start creating AI resume to your next Job role</p>
      <div className="mt-10">
      <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mb-10">
      <AddResume/>
      {resumeList?.length>0&&resumeList?.map((resume,index)=>(
        console.log(resume,'resumeData'), 
        <ResumeCardItem key={index} resume={resume} />
      ))}
      </div>
      </div>
    </div>
  )
}

export default Dashboard