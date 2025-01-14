import React from "react";

function ExpreriencePreview({ resumeInfo }) {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: resumeInfo?.themeColor }}
      >
        Profesional experience
      </h2>
      <hr
        className="border-[1.5px] my-2"
        style={{ borderColor: resumeInfo?.themeColor }}
      />

      {resumeInfo?.experience &&
        resumeInfo?.experience.map((exp, index) => (
          <div className="" key={index}>
            <h2
              className="text-sm font-bold"
                   style={{color:resumeInfo?.themeColor}
              }
            >
              {exp?.title}
            </h2>
            <h2 className="text-xs flex justify-between font-medium">
              {exp?.companyName}  {exp?.city}  {exp?.state} 
              <span className="text-xs font-normal ml-1">
                {exp?.startDate } - 
                {exp?.currentlyWorking ? " Present " : " " + exp?.endDate}
              </span>
            </h2>
            {/* <p className="text-xs my-2">{exp?.workSummery}</p> */}
            <div className="text-xs my-2" dangerouslySetInnerHTML={{__html:exp.workSummery}}/>
          </div>
        ))}
    </div>
  );
}

export default ExpreriencePreview;
