import React, { useContext, useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2Icon } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from '../../../../../../../service/GlobalApi';
import { toast } from 'sonner'


function Skills() {
    const {resumeId}=useParams()
    const [skillsList, setskillsList] = useState([
        {
            name:'',
            rating:0
        }
    ])
    const [loading, setloading] = useState(false)
    const params=useParams()
    const {resumeInfo,setresumeInfo}=useContext(ResumeInfoContext)


    const handleChange=(value,name,index)=>{{
        const newEntries=skillsList.slice()
        newEntries[index][name]=value
        setskillsList(newEntries)

    }}

    const AddMoreSkills=()=>{
        setskillsList([...skillsList,{name:'',rating:0}])
    }
    const removeSkill=()=>{
        setskillsList(prev=>prev.slice(0,-1))

    }
    const onSave=()=>{
        console.log('first')
        setloading(true)
        const data={
            data:{
                skills:skillsList
            }
        }
        GlobalApi.UpdateResumeDetail(resumeId,data).then((resp)=>{
            setloading(false)
            console.log(resp)
            toast('Details updated')
            // setresumeInfo({...resumeInfo,
            //     skills:skillsList
            // })
        },(error) => {
            setloading(false)
            toast('Something went wrong')
        })
      

       

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
            skills:skillsList
        })
    },[skillsList])
  return (
    <div>
        <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Skills</h2>
        <p className="">Add your previous work experience </p>
        {skillsList?.map((item,index)=>(
            <div className="my-5 grid grid-cols-1 md:grid-cols-2 gap-10" key={index}>
                <div className="">
                    <label htmlFor="name" className='text-xs'>Name</label>
                    <Input  name="name" id="name"  onChange={(event)=>handleChange(event.target.value,'name',index)} /> 
                </div>
                <Rating className='md:py-6 mt-[-30px] md:mt-0' style={{ maxWidth: 180 }} value={item.rating} onChange={(v)=>handleChange(v,'rating',index)} />

            </div>
        ))}
        <div className="flex justify-between">
            <Button onClick={AddMoreSkills} variant='outline' className='text-primary' >+ Add More Skills</Button>
            <Button onClick={removeSkill} variant='outline' className='text-primary' >- Remove </Button>

            <div className=""></div>
            <Button onClick={onSave}  disabled={loading}  className="">
               {loading?<Loader2Icon className='animate-spin'/>:'Save'}
               </Button>
         </div>
        </div>
    </div>
  )
}

export default Skills