import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Brain, Loader2Icon } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnRedo, BtnStrikeThrough, BtnStyles, BtnUnderline, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg'
import {AIchatSession} from "../../../../../../service/AiModel";

import { toast } from 'sonner'

  

function RichTextEditor({RichTextEditorChange,index,defaultValue}) {
    const [value, setvalue] = useState(defaultValue)
    const PROMPT='position titile: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result in HTML tags'
    const {resumeInfo,setresumeInfo}=useContext(ResumeInfoContext)
  const [summeryLoading, setsummeryLoading] = useState(false);


    const GenerateAiSummary=async()=>{
      try {
        setsummeryLoading(true)
        console.log(resumeInfo.experience[index].title )
        if(!resumeInfo?.experience[index].title){
          toast('Please Add Position Title First')
          setsummeryLoading(false)
  
          return
        }
        const prompt=PROMPT.replace('{positionTitle}',resumeInfo.experience[index].title);
        const result = await AIchatSession.sendMessage(prompt);
      const responseText = await result.response.text(); // Ensure to await the text response
      const parsedResult = JSON.parse(responseText);
      setvalue(parsedResult.bulletPoints[0])
      setsummeryLoading(false)
      toast('Summery generated')

      } catch (error) {
        toast.error(error.message)
        setsummeryLoading(false)

      }
    }
    
  return (
    <div>
      <div className="flex justify-between my-2">
        <label htmlFor="" className="text-xs">Summary</label>
        <Button onClick={GenerateAiSummary} variant='outline' size='sm' className='flex gap-2 border-primary text-primary'>
          {summeryLoading?<Loader2Icon className='animate-spin'/>:<><Brain/>Generate from AI</>}
          </Button>
    </div>
    <EditorProvider>
      <Editor value={value} onChange={(e)=>{setvalue(e.target.value)
      RichTextEditorChange(e)
      }}>
        <Toolbar>
        
          <BtnRedo />
          <BtnBold/>
          
         
          <BtnItalic />
          <Separator/>
          <BtnUnderline />
          <BtnStrikeThrough />
          
          <BtnNumberedList />
          <Separator/>

          <BtnBulletList />
         
          <BtnLink />
          <Separator/>

          
         

        </Toolbar>
      </Editor>
    </EditorProvider>
    </div>
  )
}

export default RichTextEditor