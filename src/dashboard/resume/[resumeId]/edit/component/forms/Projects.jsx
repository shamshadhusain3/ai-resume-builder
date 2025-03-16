import React, { useContext, useEffect, useState, useCallback } from 'react';
import '@smastrom/react-rating/style.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from '../../../../../../../service/GlobalApi';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';

function Projects() {
    const [projectList, setProjectList] = useState([
        {
            title: '',
            description: '',
            projectLink: ''
        }
    ]);
    const [loading, setLoading] = useState(false);
    const { resumeId } = useParams();
    const { resumeInfo, setresumeInfo } = useContext(ResumeInfoContext);

    // UseCallback to prevent unnecessary re-renders
    const handleChange = useCallback((value, name, index) => {
        setProjectList(prevProjects => {
            const newProjects = [...prevProjects];
            newProjects[index] = { ...newProjects[index], [name]: value };
            return newProjects;
        });
    }, []);

    const AddMoreProjects = () => {
        setProjectList(prevProjects => [...prevProjects, { title: '', description: '', projectLink: '' }]);
    };

    const removeProjects = () => {
        setProjectList(prevProjects => (prevProjects.length > 1 ? prevProjects.slice(0, -1) : prevProjects));
    };

    const onSave = () => {
        setLoading(true);
        const data = {
            data: { projects: projectList }
        };

        GlobalApi.UpdateResumeDetail(resumeId, data)
            .then(() => {
                setLoading(false);
                toast('Details updated!');
                setresumeInfo(prevInfo => ({
                    ...prevInfo,
                    projects: projectList
                }));
            })
            .catch(() => {
                setLoading(false);
                toast('Server error');
            });
    };

    useEffect(() => {
        if (resumeInfo?.projects && JSON.stringify(resumeInfo.projects) !== JSON.stringify(projectList)) {
            setProjectList(resumeInfo.projects);
        }
    }, [resumeInfo]);

    return (
        <div>
            <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
                <h2 className="font-bold text-lg">Projects</h2>
                <p className="">Add your previous projects</p>
                {projectList.map((item, index) => (
                    <div className="my-5 grid grid-cols-1 md:grid-cols-2 gap-10" key={index}>
                        <div>
                            <label htmlFor={`title-${index}`} className="text-xs">Title</label>
                            <Input
                                name="title"
                                id={`title-${index}`}
                                value={item.title}
                                onChange={(event) => handleChange(event.target.value, 'title', index)}
                            />
                        </div>
                        <div>
                            <label htmlFor={`projectLink-${index}`} className="text-xs">Project Link</label>
                            <Input
                                name="projectLink"
                                id={`projectLink-${index}`}
                                value={item.projectLink}
                                onChange={(event) => handleChange(event.target.value, 'projectLink', index)}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor={`description-${index}`} className="text-xs">Description</label>
                            <Textarea
                                name="description"
                                id={`description-${index}`}
                                value={item.description}
                                onChange={(event) => handleChange(event.target.value, 'description', index)}
                            />
                        </div>
                    </div>
                ))}
                <div className="flex justify-between">
                    <Button onClick={AddMoreProjects} variant="outline" className="text-primary">
                        + Add More Project
                    </Button>
                    <Button onClick={removeProjects} variant="outline" className="text-primary" disabled={projectList.length === 1}>
                        - Remove
                    </Button>
                    <Button onClick={onSave} disabled={loading} className="">
                        {loading ? <Loader2Icon className="animate-spin" /> : 'Save'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Projects;
