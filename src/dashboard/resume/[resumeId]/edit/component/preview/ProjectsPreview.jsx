import { Link } from 'lucide-react'
import React from 'react'

function ProjectsPreview({resumeInfo}) {
  return (
    <div className="my-6">
    <h2
      className="text-center font-bold text-sm mb-2"
      style={{ color: resumeInfo?.themeColor }}
    >
      Projects
    </h2>
    <hr
      className="border-[1.5px] my-2"
      style={{ borderColor: resumeInfo?.themeColor }}
    />
    <div className="my-4">
    {resumeInfo?.projects && resumeInfo?.projects.map((project,index)=>(
        <div className="my " key={index}>
            <a href={project.projectLink} target='__blank' ><h2 className="text-xs my-1 flex "
            style={{color:resumeInfo?.themeColor}}
            >{project?.title} {project.projectLink.length>0?<Link className="ml-1 pt-" size={12}/>:null } </h2></a>
            <p className="text-xs">{project.description}</p>
           
            

        </div>
    ))}
    </div>
    </div>
  )
}

export default ProjectsPreview