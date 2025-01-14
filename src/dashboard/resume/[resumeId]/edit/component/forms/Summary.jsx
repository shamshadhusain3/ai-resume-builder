import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Brain, Loader2Icon } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../../../service/GlobalApi";
import {AIchatSession} from "../../../../../../../service/AiModel";

import { toast } from "sonner";

function Summary({setnextEnable}) {
  const { resumeInfo, setresumeInfo } = useContext(ResumeInfoContext);
  const [summery, setsummery] = useState();
  const [summeryLoading, setsummeryLoading] = useState(false);

 const [aiSummeryList, setaiSummeryList] = useState([])

  const [loading, setloading] = useState(false)
  const params=useParams()
  const prompt="Job Title: {jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format"

  useEffect(() => {
    summery &&
      setresumeInfo({
        ...resumeInfo,
        summery: summery,
      });
  }, [summery]);

  const OnGenerateAiSummery=async ()=>{
    setsummeryLoading(true)
    const PROMPT =prompt.replace('{jobTitle}',resumeInfo?.jobTitle);
    console.log(PROMPT)

    const result = await AIchatSession.sendMessage(PROMPT);
    const responseText = await result.response.text(); // Ensure to await the text response
    const parsedResult = JSON.parse(responseText);
    console.log(parsedResult.summaries)
    setaiSummeryList(parsedResult.summaries)
    setsummeryLoading(false)
    toast('Summary generated ')
    
    console.log(aiSummeryList);
}
const handleSummary=(value)=>{
    console.log(value.target.textContent)
  
    setsummery(value.target.textContent.replace('Summery :',''))
//   console.log(summery)
}

  const onSave = (e) => {
    e.preventDefault();
    setloading(true)
    const data={
       data:{
        summery:summery
       }
    }
    GlobalApi.UpdateResumeDetail(params?.resumeId,data).then((resp)=>{
       console.log(resp);

       setnextEnable(true)
       setloading(false)
       toast('Details Updated')
    },(error)=>setloading(false))

   
  }
  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summery</h2>
        <p className="">Add Summery for your job title </p>
        <form onSubmit={onSave} className="mt-7">
          <div className="flex justify-between items-end">
            <label htmlFor="">Add Summery</label>
            <Button 
            onClick={OnGenerateAiSummery}
            type='button'
              variant="outline"
              disabled={loading}
              size="sm"
              className="border-primary text-primary flex"
            >
              {summeryLoading?<Loader2Icon className='animate-spin'/>:
                <><Brain className="h-4 w-4"/>
              Generate from AI</>
              }
            </Button>
          </div>
          <Textarea
            required
            onChange={(e) => setsummery(e.target.value)}
            value={summery}
            className="mt-5"
          />
          <div className="flex justify-end mt-2">
          <Button disabled={loading} type='submit' className="">
               {loading?<Loader2Icon className='animate-spin'/>:'Save'}
               </Button>
          </div>
        </form>
      </div>
      {aiSummeryList && <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10 flex flex-col gap-4 overflow-auto  ">
        <h2 className="font-bold text-lg">Suggestions</h2>
        {aiSummeryList && aiSummeryList?.map((item,index)=>(
            <div className="shadow-md p-5" key={index}>
                <h2 className="text-sm font-bold"> Level : {item?.experience_level}</h2> <p onClick={(e)=>handleSummary(e)}> Summery : {item?.summary} </p>
            </div>
        ))}
        </div>}
    </div>
  );
}

export default Summary;
