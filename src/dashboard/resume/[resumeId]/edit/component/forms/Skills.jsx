import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from '../../../../../../../service/GlobalApi';
import { toast } from 'sonner';

function Skills() {
    const { resumeId } = useParams();
    const { resumeInfo, setresumeInfo } = useContext(ResumeInfoContext);

    const [skillsList, setSkillsList] = useState([
        { name: '', rating: 0 }
    ]);
    const [loading, setLoading] = useState(false);

    // Initialize skillsList when component mounts (only once)
    useEffect(() => {
        if (resumeInfo?.skills?.length) {
            setSkillsList(resumeInfo.skills);
        }
    }, [resumeInfo]);

    const handleChange = useCallback((value, name, index) => {
        setSkillsList(prevSkills => 
            prevSkills.map((skill, i) => i === index ? { ...skill, [name]: value } : skill)
        );
    }, []);

    const addMoreSkills = useCallback(() => {
        setSkillsList(prevSkills => [...prevSkills, { name: '', rating: 0 }]);
    }, []);

    const removeSkill = useCallback(() => {
        setSkillsList(prevSkills => prevSkills.slice(0, -1));
    }, []);

    const onSave = useCallback(() => {
        setLoading(true);
        const data = { data: { skills: skillsList.map(({id ,...rest})=>rest) } };

        GlobalApi.UpdateResumeDetail(resumeId, data)
            .then(() => {
                toast('Details updated!');
                setresumeInfo(prev => ({ ...prev, skills: skillsList }));
            })
            .catch(() => toast('Something went wrong'))
            .finally(() => setLoading(false));
    }, [resumeId, skillsList, setresumeInfo]);

    return (
        <div>
            <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
                <h2 className="font-bold text-lg">Skills</h2>
                <p className="">Add your previous work experience</p>

                {skillsList.map((item, index) => (
                    <div key={index} className="my-5 grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div>
                            <label htmlFor="name" className="text-xs">Name</label>
                            <Input name="name" id="name" value={item.name} onChange={e => handleChange(e.target.value, 'name', index)} />
                        </div>
                        <Rating 
                            className="md:py-6 mt-[-30px] md:mt-0" 
                            style={{ maxWidth: 180 }} 
                            value={item.rating} 
                            onChange={v => handleChange(v, 'rating', index)} 
                        />
                    </div>
                ))}

                <div className="flex justify-between">
                    <Button onClick={addMoreSkills} variant="outline" className="text-primary">+ Add More Skills</Button>
                    <Button onClick={removeSkill} variant="outline" className="text-primary">- Remove</Button>

                    <Button onClick={onSave} disabled={loading} className="">
                        {loading ? <Loader2Icon className="animate-spin" /> : 'Save'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Skills;
