import React from 'react'

function EducationalPreview({resumeInfo}) {
  return (
    <div className="my-6">
    <h2
      className="text-center font-bold text-sm mb-2"
      style={{ color: resumeInfo?.themeColor }}
    >
      Education
    </h2>
    <hr
      className="border-[1.5px] my-2"
      style={{ borderColor: resumeInfo?.themeColor }}
    />

    {resumeInfo?.education && resumeInfo?.education.map((edu,index)=>(
        <div className="my-5" key={index}>
            <h2 className="text-sm font-bold"
            style={{color:resumeInfo?.themeColor}}
            >{edu?.universityName}</h2>
            <h2 className="text-xs flex justify-between ">{edu?.degree} in  {edu?.major} <span className="">{edu?.startDate} - {edu?.endDate}</span></h2>
            <p className="text-xs my-2">{edu?.description}</p>

        </div>
    ))}
    </div>
  )
}

export default EducationalPreview