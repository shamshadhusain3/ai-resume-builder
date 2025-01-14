import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Loader2Icon } from 'lucide-react'
import GlobalApi from '../../../../../../../service/GlobalApi';
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'


function Experience() {
    const {resumeInfo,setresumeInfo}=useContext(ResumeInfoContext)
  const [loading, setloading] = useState(false)
  

    const formField={
        title:'',
        companyName:'',
        city:'',
        state:'',
        startDate:'',
        endDate:'',
        workSummery:''
    }
    const [experienceList, setexperienceList] = useState([
     formField
    ])
    const params=useParams()

    const handleChange=(index,event)=>{
        const newEntries=experienceList.slice()
        const {name,value}=event.target;
        newEntries[index][name]=value;
       
        setexperienceList(newEntries)

    }
    const handleRichChange=(event,name,index)=>{
        const newEntries=experienceList.slice()
        newEntries[index][name]=event.target.value ;
       
        setexperienceList(newEntries)

    }

    const AddMoreExp=()=>{
        console.log('clk')
        setexperienceList([...experienceList,formField])
    }

    const removeExp=()=>{
        setexperienceList(prev=>prev.slice(0,-1))
    }
    const onSave=(e)=>{
      e.preventDefault();

        setloading(true)
        const data={
            data:{
                experience:experienceList
            }
        }

         console.log(experienceList)

        GlobalApi.UpdateResumeDetail(params?.resumeId,data).then(res=>{
            console.log('res',res);
            setloading(false);
            toast('Details updated !')
        },(error)=>{
            setloading(false);
            toast('Something went wrong')

        })

    }

    useEffect(()=>{
        setresumeInfo({...resumeInfo,experience:experienceList})
        // console.log(experienceList) 
    },[experienceList])
  return (
    <div>
        <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p className="">Add your previous work experience </p>
        
        <div className="">
            {experienceList.map((item,index)=>(
                <div key={index} className="">
                    <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                        <div className="">
                            <label className='text-xs' htmlFor="title">Position Title</label>
                            <Input name='title' id='title' onChange={(event)=>handleChange(index,event)} />
                        </div>
                        <div className="">
                            <label className='text-xs' htmlFor="companyName">Company Name</label>
                            <Input name='companyName' id='companyName' onChange={(event)=>handleChange(index,event)} />
                        </div>
                        <div className="">
                            <label className='text-xs' htmlFor="city">City</label>
                            <Input name='city' id='city' onChange={(event)=>handleChange(index,event)} />
                        </div>
                        <div className="">
                            <label className='text-xs' htmlFor="state">State</label>
                            <Input name='state' id='state' onChange={(event)=>handleChange(index,event)} />
                        </div>
                        <div className="">
                            <label className='text-xs' htmlFor="startDate">Start Date</label>
                            <Input type='date' name='startDate' id='startDate' onChange={(event)=>handleChange(index,event)} />
                        </div>
                        <div className="">
                            <label className='text-xs' htmlFor="endDate">End Date</label>
                            <Input type='date' name='endDate' id='endDate' onChange={(event)=>handleChange(index,event)} />
                        </div>
                       
                         <div className="col-span-2">
                             {/* work summery */}
                             <RichTextEditor
                             index={index}
                             RichTextEditorChange={(e)=>handleRichChange(e,'workSummery',index)}/>
                         </div>
                    </div>
                </div>
            ))}
        </div>
         <div className="flex justify-between">
            <Button onClick={AddMoreExp} variant='outline' className='text-primary' >+ Add More Experience</Button>
            <Button onClick={removeExp} variant='outline' className='text-primary' >- Remove </Button>

            <div className=""></div>
            <Button  onClick={onSave} disabled={loading} className="">
               {loading?<Loader2Icon className='animate-spin'/>:'Save'}
               </Button>
         </div>
        
        </div>
    </div>
  )
}

export default Experience