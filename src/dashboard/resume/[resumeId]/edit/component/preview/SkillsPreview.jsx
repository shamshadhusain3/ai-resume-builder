import React from 'react'

function SkillsPreview({resumeInfo}) {
  return (
    <div className="my-6">
    <h2
      className="text-center font-bold text-sm mb-2"
      style={{ color: resumeInfo?.themeColor }}
    >
      Skills
    </h2>
    <hr
      className="border-[1.5px] my-2"
      style={{ borderColor: resumeInfo?.themeColor }}
    />
    <div className="grid grid-cols-2 gap-3 my-4">
    {resumeInfo?.skills && resumeInfo?.skills.map((skill,index)=>(
        <div className="my-4 flex items-center justify-between" key={index}>
            <h2 className="text-xs"
            style={{color:resumeInfo?.themeColor}}
            >{skill?.name}</h2>
            <div className="h-2 bg-gray-200 w-[120px]">
                <div className="h-2" style={{backgroundColor:resumeInfo?.themeColor,
                    width:skill?.rating *20 +'%'
                }} ></div>
            </div>
            

        </div>
    ))}
    </div>
    </div>
  )
}

export default SkillsPreview