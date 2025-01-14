import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'


import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../../../../../service/GlobalApi';
import { Loader2Icon } from 'lucide-react';
import { toast } from 'sonner';

function PersonalDetails({setnextEnable}) {
   const params = useParams();

  const {resumeInfo,setresumeInfo}=useContext(ResumeInfoContext)
  const [formData, setformData] = useState({})
  const [loading, setloading] = useState(false)

  useEffect(()=>{
   console.log(params,'resumeId')
   // console.log(resumeInfo

   // )


  },[])
  const handleInputChange=(e)=>{
   setnextEnable(false)
      const {name,value}=e.target
      setformData({
         ...formData,
         [name]:value
      })

      setresumeInfo({
         ...resumeInfo,
         [name]:value
      })
  }
  const onSave=(e)=>{
      e.preventDefault();
      setloading(true)
      const data={
         data:formData
      }
      console.log(formData)
      GlobalApi.UpdateResumeDetail(params?.resumeId,data).then((resp)=>{
         // console.log(resp);

         setnextEnable(true)
         setloading(false)
         toast('Details Updated')
      },(error)=>setloading(false))
  }

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className="font-bold text-lg">Personal Details</h2>
        <p className="">Get Start with the basic Information</p>
        <form onSubmit={onSave} action="">
            <div className="grid grid-cols-2 gap-3 mt-5">
                 <div className="">
                    <label htmlFor="firstName" className="text-sm">First Name</label>
                    <Input defaultValue={resumeInfo?.firstName}
                    onChange={handleInputChange}
                    required
                    name='firstName' id='firstName'/>
                 </div>
                 <div className="">
                    <label htmlFor="lastName" required className="text-sm">Last Name</label>
                    <Input defaultValue={resumeInfo?.lastName}
                    onChange={handleInputChange}
                    name='lastName' id='lastName'/>
                 </div>
                 <div className="col-span-2">
                    <label htmlFor="jobTitle" className="text-sm">Job Title</label>
                    <Input defaultValue={resumeInfo?.jobTitle}
                    onChange={handleInputChange}
                    name='jobTitle' id='jobTitle'/>
                 </div>
                 <div className="col-span-2">
                    <label htmlFor="address" className="text-sm">Address</label>
                    <Input defaultValue={resumeInfo?.address}
                    onChange={handleInputChange}
                    name='address' id='address'/>
                 </div>
                 <div className="">
                    <label htmlFor="phone" className="text-sm">Phone</label>
                    <Input defaultValue={resumeInfo?.phone}
                    required
                    onChange={handleInputChange}
                    name='phone' id='phone'/>
                 </div>
                 <div className="">
                    <label htmlFor="email" className="text-sm">Email</label>
                    <Input defaultValue={resumeInfo?.email}
                    required
                    onChange={handleInputChange}
                    name='email' id='email'/>
                 </div>
            </div>
            <div className="mt-3 flex justify-end"><Button disabled={loading} type='submit' className="">
               {loading?<Loader2Icon className='animate-spin'/>:'Save'}
               </Button></div>
            
        </form>
    </div>
  )
}

export default PersonalDetails