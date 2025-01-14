import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, LayoutGridIcon } from 'lucide-react'
import React, { useState } from 'react'
import PersonalDetails from './forms/PersonalDetails'
import Summary from './forms/Summary'
import Experience from './forms/Experience'
import Education from './forms/Education'
import Skills from './forms/Skills'
import Projects from './forms/Projects'

function FormSection() {
  const [activeFormIndex, setactiveFormIndex] = useState(1)
  const [nextEnable, setnextEnable] = useState(false)

  return (
    <div>
      <div className="flex items-center justify-between">
        <Button variant='outline' className='flex g-2'> <LayoutGridIcon/> Theme</Button>
        <div className="flex gap-2">
          {activeFormIndex>1&& <Button onClick={()=>setactiveFormIndex(activeFormIndex-1)}  size='sm'><ArrowLeft/></Button>}

          <Button
          disabled={!nextEnable}
          onClick={()=>setactiveFormIndex(activeFormIndex+1)} className="flex gap-2" size='sm'>Next 
            <ArrowRight/>
          </Button>
          </div>
      </div>
      {/* {personal  details} */}
      {activeFormIndex==1&& <PersonalDetails setnextEnable={setnextEnable} />}

      {/* Summary */}
      {activeFormIndex==2&& <Summary setnextEnable={setnextEnable} />}

      {/* Experience */}
      {activeFormIndex==3&& <Experience setnextEnable={setnextEnable} />}



      {/* Educational Details  */}
      {activeFormIndex==4&& <Education setnextEnable={setnextEnable} />}


      {/* Skills */}
      {activeFormIndex==5 && <Skills setnextEnable={setnextEnable} />}

      {/* Projects */}

      {activeFormIndex==6 && <Projects setnextEnable={setnextEnable} />}

    </div>  
  )
}

export default FormSection