import { Loader2, Loader2Icon, PlusSquare } from 'lucide-react'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Input } from "@/components/ui/input"

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import GlobalApi from '../../../service/GlobalApi'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

  

function AddResume() {
    const [openDialog, setopenDialog] = useState(false);
    const [resumeTitle, setresumeTitle] = useState();
    const {user}=useUser();
   const [loading, setloading] = useState(false)
   const navigate=useNavigate()

    const onCreate= ()=>{
        setloading(true)
        const resumeId= uuidv4()
        console.log(resumeId,resumeTitle)
        const data ={
            data:{
                title:resumeTitle,
                resumeId,
                userEmail:user?.primaryEmailAddress?.emailAddress,
                userName:user?.fullName
            }
        }
        GlobalApi.CreateNewResume(data).then(resp=>{
            console.log(resp)
            if (resp) {
                setloading(false)
                navigate('/dashboard/resume/'+resp.data._id+'/edit')

            }
        },(error)=>setloading(false))
    }
  return (
    <div>
        <Dialog open={openDialog}>
  <DialogTrigger>
        <div
        onClick={()=>setopenDialog(true)}
        className="p-24 py-24  border flex items-center justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed ">
            <PlusSquare/>
        </div>

  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create New Resume</DialogTitle>
      <DialogDescription>
        <p>Add a title for New Resume</p>
        <Input className='my-2 ' 
        onChange={((e)=>setresumeTitle(e.target.value))}
        placeholder='Ex. Full Stack Resume' />

      </DialogDescription>
      <div className="flex gap-5 justify-end ">
        <Button onClick={()=>setopenDialog(false)} variant='ghost' >Cancel</Button>
        <Button
        disabled={!resumeTitle||loading}
        onClick={onCreate} >
            {loading?<Loader2 className='animate-spin'/>:'Create'}
            </Button>
      </div>
    </DialogHeader>
  </DialogContent>
</Dialog>


    </div>
  )
}

export default AddResume