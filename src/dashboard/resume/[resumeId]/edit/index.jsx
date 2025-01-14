import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import FormSection from './component/FormSection';
import ResumePreview from './component/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import dummy from '@/data/dummy';
import GlobalApi from '../../../../../service/GlobalApi';

function EditResume() {

    const params = useParams();
    const [resumeInfo, setresumeInfo] = useState()
    
    const GetResumeInfo=async()=>{
     try {
      console.log('first')
      // console.log(params.resumeId,'idresuem')

    //  .then(resp=>{
    //     console.log('responssee', resp.data.data)
    //     setresumeInfo(resp.data.data)

    //   })
    const res=await  GlobalApi.GetResumeById('f5de2541-c08e-400a-b5f6-8ab94ebc0be0');
   console.log( res.data)
     } catch (error) {
      console.log(error)
     }
    }


    useEffect(()=>{
        console.log(params.resumeId)
        setresumeInfo(dummy)
        // GetResumeInfo()
    },[])
  return (
    <ResumeInfoContext.Provider value={{resumeInfo, setresumeInfo}}>
    <div className='grid grid-cols-2 gap-10 p-10'>
      {/* form section  */}
      <FormSection/>

      {/* preview section  */}
      <ResumePreview/>
    </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume