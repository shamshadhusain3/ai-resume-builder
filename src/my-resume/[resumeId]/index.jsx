import Header from '@/component/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/[resumeId]/edit/component/ResumePreview'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from '../../../service/GlobalApi'
import { RWebShare } from 'react-web-share'

function ViewResume() { 

    const [resumeInfo, setresumeInfo] = useState()
    const {resumeId} = useParams();
     const GetResumeInfo=async()=>{
        GlobalApi.GetResumeById(resumeId).then(resp=>{
            console.log('responssee', resp.data.data)
            setresumeInfo(resp.data.data)
        })
     }
    React.useEffect(()=>{
        GetResumeInfo()
    }
    ,[])

  return (
    <ResumeInfoContext.Provider value={{resumeInfo, setresumeInfo}}>
        <div id="no-print">
        <Header/>
        <div className=" my-10 md:mx-20 lg:mx-36">
          
          <h2 className='text-center text-xl font-medium ' >Congratulations 🎉🎉 your Ultimate Ai Generated Resume is ready </h2>
            <p className='text-center text-gray-400' >Now you are ready to Download your Resume and You can share Unique Resume Url with your freinds and family </p>
            <div className=" flex justify-between px-44 my-10">
                <Button onClick={()=>window.print()} >Download</Button>
                <RWebShare
        data={{
          text: "Hello everyone! this is my Resume created by Ultimate Ai Resume Builder 🚀 you can see it here",
          url: import.meta.env.VITE_BASE_URL + "my-resume/" + resumeId+"/view",
          title: resumeInfo?.firstName+" "+resumeInfo?.lastName+" Resume",
        }}
        onClick={() => console.log("shared successfully!")}
      >
        
                <Button>Share 🔗</Button>
      </RWebShare>

            </div>
          </div>
        </div>
            <div id='print-area' className="max-w-[900px] mx-auto">
               <ResumePreview/>
            </div>
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume