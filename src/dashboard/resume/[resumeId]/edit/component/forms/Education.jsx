
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Loader2Icon } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import GlobalApi from '../../../../../../../service/GlobalApi';
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
function Education() {
    const params=useParams()
    const {resumeInfo,setresumeInfo}=useContext(ResumeInfoContext)

    const [loading, setloading] = useState(false)

    const [educationList, seteducationList] = useState([

        {
            universityName:'',
            degree:'',
            major:'',
            startDate:'',
            endDate:'',
            description:''
        }
    ])

    const handleInputChange=(e,index)=>{
        const newEntries=educationList.slice()
        const {name,value}=e.target;
        newEntries[index][name]=value;
       
        seteducationList(newEntries)
    }
    const AddMoreEd=()=>{
         seteducationList([...educationList,{
            universityName:'',
            degree:'',
            major:'',
            startDate:'',
            endDate:'',
            description:''
        }])
    }
    const removeEd=()=>{
        seteducationList(prev=>prev.slice(0,-1))

    }
    const onSave=()=>{
        console.log('first')
        setloading(true)
        const data={
            data:{
                education:educationList.map(({id ,...rest})=>rest)
            }
        }

       useEffect(()=>{
        resumeInfo&&seteducationList(resumeInfo.education)
       },[resumeInfo])

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
            education:educationList
        })
    },[educationList])
  return (
    <div>
        <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Education</h2>
        <p className="">Add your Education </p>
        <div className="">
            {educationList?.map((item,index)=>(
                
            <div className="">
                <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                    <div className="col-span-2">
                        <label htmlFor="universityName">University Name</label>
                        <Input name='universityName' id="universityName" defaultValue={item.universityName} onChange={(e)=>handleInputChange(e,index)}/>
                    </div>
                    <div className="">
                        <label htmlFor="degree">Degree</label>
                        <Input name='degree' id="degree" defaultValue={item.degree} onChange={(e)=>handleInputChange(e,index)}/>
                    </div>
                    <div className="">
                        <label htmlFor="major">Major</label>
                        <Input name='major' id="major" defaultValue={item.major} onChange={(e)=>handleInputChange(e,index)}/>
                    </div>
                    <div className="">
                        <label htmlFor="startDate">Start Date</label>
                        <Input type='date' name='startDate' id="startDate" defaultValue={item.startDate} onChange={(e)=>handleInputChange(e,index)}/>
                    </div>
                    <div className="">
                        <label htmlFor="endDate">End Date</label>
                        <Input type='date' name='endDate' id="endDate" defaultValue={item.endDate} onChange={(e)=>handleInputChange(e,index)}/>
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="description">Description</label>
                        <Textarea  name='description' id="description" defaultValue={item.description} onChange={(e)=>handleInputChange(e,index)}/>
                    </div>
                </div>
            </div>
            ))}
        </div>
        <div className="flex justify-between">
            <Button onClick={AddMoreEd} variant='outline' className='text-primary' >+ Add More Experience</Button>
            <Button onClick={removeEd} variant='outline' className='text-primary' >- Remove </Button>

            <div className=""></div>
            <Button onClick={onSave}  disabled={loading} type='submit' className="">
               {loading?<Loader2Icon className='animate-spin'/>:'Save'}
               </Button>
         </div>
        </div>
    </div>
  )
}

export default Education