import { Notebook } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function ResumeCardItem({resume}) {
  console.log(resume,'card')
 
  return (
    <Link to={'/dashboard/resume/'+resume.documentId+'/edit'}>
        <div className="p-14 bg-secondary flex items-center justify-center h-[280px] border border-primary rounded-lg hover:scale-105 transition-all hover:shadow-lg shadow-primary bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 border-t-[5px] border-t-red-500">
            {/* <Notebook/> */}
            <img src="/cv.png" width={80} height={80} alt="" />
        </div>
        <h2 className="text-center my-1">{resume.title}</h2>
    </Link >
  )
}

export default ResumeCardItem