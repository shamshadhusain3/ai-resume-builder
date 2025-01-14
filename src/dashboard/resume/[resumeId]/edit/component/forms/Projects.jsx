import React, { useContext, useEffect, useState } from 'react'
import '@smastrom/react-rating/style.css'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2Icon } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from '../../../../../../../service/GlobalApi';
import { toast } from 'sonner'
import { Textarea } from '@/components/ui/textarea'


function Projects() {
    const [projectList, setprojectList] = useState([
        {
            title:'',
            description:'',
            projectLink:''

        }
    ])
    const [loading, setloading] = useState(false)
    const params=useParams()
    const {resumeInfo,setresumeInfo}=useContext(ResumeInfoContext)


    const handleChange=(value,name,index)=>{{
        const newEntries=projectList.slice()
        newEntries[index][name]=value
        setprojectList(newEntries)

    }}

    const AddMoreProjects=()=>{
        setprojectList([...projectList,{name:'',description:'',
            projectLink:''}])
    }
    const removeProjects=()=>{
        setprojectList(prev=>prev.slice(0,-1))

    }
    const onSave=()=>{
        console.log('first')
        setloading(true)
        const data={
            data:{
                projects:projectList
            }
        }

        GlobalApi.UpdateResumeDetail(params?.resumeId,data).then(res=>{
            console.log('res',res);
            setloading(false);
            toast('Details updated !')
        },(error)=>{
            toast('server error')
            setloading(false);

        })
    }
    useEffect(()=>{
        setresumeInfo({...resumeInfo,
            projects:projectList
        })
    },[projectList])
  return (
    <div>
        <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Projects</h2>
        <p className="">Add your previous work experience </p>
        {projectList?.map((item,index)=>(
            <div className="my-5 grid grid-cols-1 md:grid-cols-2 gap-10" key={index}>
                <div className="">
                    <label htmlFor="title" className='text-xs'>Title</label>
                    <Input  name="title" id="title"  onChange={(event)=>handleChange(event.target.value,'title',index)} /> 
                </div>
               

                <div className="">
                    <label htmlFor="projectLink" className='text-xs'>Project Link</label>
                    <Input  name="projectLink" id="projectLink"  onChange={(event)=>handleChange(event.target.value,'projectLink',index)} /> 
                </div>
                <div className="">
                    <label htmlFor="description" className='text-xs'>Description</label>
                    <Textarea  name="description" id="description"  onChange={(event)=>handleChange(event.target.value,'description',index)} /> 
                </div>
            </div>
        ))}
        <div className="flex justify-between">
            <Button onClick={AddMoreProjects} variant='outline' className='text-primary' >+ Add More project</Button>
            <Button onClick={removeProjects} variant='outline' className='text-primary' >- Remove </Button>

            <div className=""></div>
            <Button onClick={onSave}  disabled={loading}  className="">
               {loading?<Loader2Icon className='animate-spin'/>:'Save'}
               </Button>
         </div>
        </div>
    </div>
  )
}

export default Projects