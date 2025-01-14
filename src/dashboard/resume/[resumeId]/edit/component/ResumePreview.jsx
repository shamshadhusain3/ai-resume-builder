import React, { useContext } from 'react'
import PersonalDetailsPreview from './preview/PersonalDetailsPreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import SummaryPreview from './preview/SummaryPreview';
import ExpreriencePreview from './preview/ExpreriencePreview';
import EducationalPreview from './preview/EducationalPreview';
import SkillsPreview from './preview/SkillsPreview';
import ProjectsPreview from './preview/ProjectsPreview';

function ResumePreview() {

    const {resumeInfo, setresumeInfo} = useContext(ResumeInfoContext);

  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]' 
    style={{borderColor:resumeInfo?.themeColor}}
    >
        {/* personal details  */}
        <PersonalDetailsPreview resumeInfo={resumeInfo}/>

        {/* summary */}
        <SummaryPreview resumeInfo={resumeInfo} />

        {/* professional experience */}
        <ExpreriencePreview resumeInfo={resumeInfo}/>

        {/* education */}
        <EducationalPreview resumeInfo={resumeInfo}/>

        {/* skills */}
        <SkillsPreview resumeInfo={resumeInfo}/>

        {/*projects  */}
        <ProjectsPreview resumeInfo={resumeInfo}/>
    </div>
  )
}

export default ResumePreview