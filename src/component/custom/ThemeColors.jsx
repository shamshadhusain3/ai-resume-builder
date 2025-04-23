import React, { useContext, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { LayoutGridIcon } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from '../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
  
function ThemeColors() {
    const colors = [
        "#FF5733", // Bright Red
        "#33FF57", // Bright Green
        "#3357FF", // Bright Blue
        "#FF33A8", // Hot Pink
        "#33FFF0", // Aqua
        "#FFC300", // Yellow Gold
        "#C70039", // Deep Red
        "#900C3F", // Dark Purple
        "#581845", // Dark Violet
        "#2ECC71", // Emerald Green
        "#E74C3C", // Tomato Red
        "#8E44AD", // Purple
        "#3498DB", // Sky Blue
        "#F39C12", // Orange
        "#D35400", // Burnt Orange
        "#1ABC9C", // Turquoise
        "#34495E", // Dark Slate
        "#ECF85b", // Light Gray
        "#95A5A6", // Medium Gray
        "#2C3E50"  // Midnight Blue
    ];
    const {resumeId} = useParams()
    const [selectedColor, setselectedColor] = useState('')
    const {resumeInfo, setresumeInfo} = useContext(ResumeInfoContext);
    const onColorSelect=(color)=>{
        setselectedColor(color)
        setresumeInfo({...resumeInfo,themeColor:color})
        const data = {
            data:{
                themeColor:selectedColor
            }
        }
        GlobalApi.UpdateResumeDetail(resumeId,data).then(res=>{
            console.log(res)
            toast.success('Theme color Updated')
        },err=>{
            console.log(err)
        })
    }

  return (
    <Popover>
  <PopoverTrigger>
  <Button variant='outline' className='flex g-2'> <LayoutGridIcon/> Theme</Button>
    
  </PopoverTrigger>
  <PopoverContent>
    <h2 className="font-bold mt-2">Select theme color</h2>
    <div className="grid grid-cols-5 gap-2">
       <div className="">
       <input type="color" onChange={(e)=>onColorSelect(e.target.value)} className='w-8 h-8 rounded-full border-1 border-black' />
       <p className='text-sm text-gray-500'>custom</p>
       </div>
    {colors.map((color,index)=><div key={index} onClick={()=>onColorSelect(color)} className={`w-8 h-8 rounded-full cursor-pointer ${selectedColor==color ? 'border border-black':''}`} style={{backgroundColor:color}}></div>)}
    </div>

  </PopoverContent>
</Popover>

  )
}

export default ThemeColors