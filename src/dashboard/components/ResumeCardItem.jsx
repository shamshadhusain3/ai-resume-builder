import { EllipsisVertical, Loader2Icon, Notebook } from 'lucide-react'
import React ,{useState}  from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


import { Link,useNavigate,useParams } from 'react-router-dom'
import GlobalApi from '../../../service/GlobalApi'
import { toast } from 'sonner'

function ResumeCardItem({resume,refreshData}) {
  console.log(resume,'card')
  const navigate=useNavigate()
  const {resumeId} = useParams();
  const [openAlert,setOpenAlert]=useState(false)
  const [loading, setloading] = useState(false)
  console.log('themeColor',resume?.themeColor)
  let borderColor = resume?.themeColor
  
  const onDelete=()=>{
    setloading(true)
    GlobalApi.DeleteResumeById(resume.documentId).then(res=>{
      console.log(res)
      toast.success('Resume Deleted')
      refreshData()
      setOpenAlert(false)
      setloading(false)
    },err=>{
      console.log(err)
      toast.error('Error Deleting Resume')
      setloading(false)
    })
    console.log('delete')
  }

 
  return (
    <div className="flex flex-col items-center hover:scale-105 transition-all hover:shadow-lg shadow-primary rounded-lg">
    <Link to={'/dashboard/resume/'+resume.documentId+'/edit'}>
        <div className={`p-14 bg-secondary flex items-center justify-center h-[280px] border border-primary rounded-lg  bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 border-t-[5px] border-t-[${borderColor}]`}>
            {/* <Notebook/> */}
            <img src="/cv.png" width={80} height={80} alt="" />
        </div>
        
    </Link >
    <div className="flex justify-between items-center  w-full px-4 py-2   rounded-b-lg rounded-lg  shadow-primary">
        <h2 className="text-center my-1">{resume.title}</h2>
        <DropdownMenu>
  <DropdownMenuTrigger>
        <EllipsisVertical />
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    
    <DropdownMenuItem onClick={()=>navigate('/dashboard/resume/'+resume.documentId+'/edit')}>Edit</DropdownMenuItem>
    <DropdownMenuItem onClick={()=>navigate('/my-resume/'+resume.documentId+'/view')}>View</DropdownMenuItem>
    <DropdownMenuItem onClick={()=>navigate('/my-resume/'+resume.documentId+'/view')}>Download</DropdownMenuItem>
    <DropdownMenuItem onClick={()=>setOpenAlert(true)}>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
<AlertDialog open={openAlert}>
  {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel onClick={()=>setOpenAlert(false)}>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={onDelete} disabled={loading}>{loading? <Loader2Icon/>:"Delete"}</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

        </div>
    </div>
  )
}

export default ResumeCardItem