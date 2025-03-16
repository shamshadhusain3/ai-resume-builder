import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Loader2Icon } from 'lucide-react'
import React, { useContext, useEffect, useState, useCallback } from 'react'
import GlobalApi from '../../../../../../../service/GlobalApi';
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

function Education() {
    const params = useParams();
    const { resumeInfo, setresumeInfo } = useContext(ResumeInfoContext);

    const [loading, setloading] = useState(false);
    const [educationList, seteducationList] = useState([
        {
            universityName: '',
            degree: '',
            major: '',
            startDate: '',
            endDate: '',
            description: ''
        }
    ]);

    // Load existing education data
    useEffect(() => {
        if (resumeInfo?.education) {
            seteducationList(resumeInfo.education);
        }
    }, [resumeInfo]);

    // Handle input change with useCallback to avoid unnecessary re-renders
    const handleInputChange = useCallback((e, index) => {
        const { name, value } = e.target;
        seteducationList(prev => prev.map((entry, i) => i === index ? { ...entry, [name]: value } : entry));
    }, []);

    // Add More Education
    const AddMoreEd = useCallback(() => {
        seteducationList(prev => [
            ...prev,
            { universityName: '', degree: '', major: '', startDate: '', endDate: '', description: '' }
        ]);
    }, []);

    // Remove Last Education
    const removeEd = useCallback(() => {
        seteducationList(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
    }, []);

    // Save Education
    const onSave = async () => {
        setloading(true);
        const data = { data: { education: educationList.map(({id ,...rest})=>rest) } };

        try {
            await GlobalApi.UpdateResumeDetail(params?.resumeId, data);
            setresumeInfo(prev => ({ ...prev, education: educationList })); // Update context after saving
            toast('Details updated!');
        } catch (error) {
            toast('Server error');
        } finally {
            setloading(false);
        }
    };

    return (
        <div>
            <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
                <h2 className="font-bold text-lg">Education</h2>
                <p className="">Add your Education</p>
                <div className="">
                    {educationList.map((item, index) => (
                        <div key={index} className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                            <div className="col-span-2">
                                <label htmlFor="universityName">University Name</label>
                                <Input name='universityName' id="universityName" value={item.universityName} onChange={(e) => handleInputChange(e, index)} />
                            </div>
                            <div className="">
                                <label htmlFor="degree">Degree</label>
                                <Input name='degree' id="degree" value={item.degree} onChange={(e) => handleInputChange(e, index)} />
                            </div>
                            <div className="">
                                <label htmlFor="major">Major</label>
                                <Input name='major' id="major" value={item.major} onChange={(e) => handleInputChange(e, index)} />
                            </div>
                            <div className="">
                                <label htmlFor="startDate">Start Date</label>
                                <Input type='date' name='startDate' id="startDate" value={item.startDate} onChange={(e) => handleInputChange(e, index)} />
                            </div>
                            <div className="">
                                <label htmlFor="endDate">End Date</label>
                                <Input type='date' name='endDate' id="endDate" value={item.endDate} onChange={(e) => handleInputChange(e, index)} />
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="description">Description</label>
                                <Textarea name='description' id="description" value={item.description} onChange={(e) => handleInputChange(e, index)} />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between">
                    <Button onClick={AddMoreEd} variant='outline' className='text-primary'>+ Add More</Button>
                    <Button onClick={removeEd} variant='outline' className='text-primary'>- Remove</Button>
                    <Button onClick={onSave} disabled={loading} type='submit' className="">
                        {loading ? <Loader2Icon className='animate-spin' /> : 'Save'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Education;
