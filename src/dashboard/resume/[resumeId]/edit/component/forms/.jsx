import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react';
import RichTextEditor from '../RichTextEditor';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Loader2Icon } from 'lucide-react';
import GlobalApi from '../../../../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

function Experience() {
    const { resumeInfo, setresumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);
    const [localExperienceList, setLocalExperienceList] = useState([]);

    const formField = {
        title: '',
        companyName: '',
        city: '',
        state: '',
        startDate: '',
        endDate: '',
        workSummery: '',
    };
    useEffect(() => {
        if (resumeInfo?.experience) {
            setLocalExperienceList(resumeInfo.experience);

        }
        // console.log('experience: ' +localExperienceList);
    }, [resumeInfo?.experience]);

    const handleChange = (index, event) => {
        const newEntries = [...localExperienceList];
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setLocalExperienceList(newEntries);
    };

    const handleRichChange = (event, name, index) => {
        const newEntries = [...localExperienceList];
        newEntries[index][name] = event.target.value;
        setLocalExperienceList(newEntries);
    };

    const AddMoreExp = () => {
        setLocalExperienceList([...localExperienceList, formField]);
    };

    const removeExp = () => {
        setLocalExperienceList((prev) => prev.slice(0, -1));
    };

    const onSave = async (e) => {
      e.preventDefault();
        setLoading(true);

        try {
            const response = await GlobalApi.UpdateResumeDetail(params?.resumeId, {
                data: {
                    experience: localExperienceList,
                },
            });
            console.log('res', response);
            setLoading(false);
            toast('Details updated!');
            setresumeInfo({ ...resumeInfo, experience: localExperienceList });
        } catch (error) {
            setLoading(false);
            toast('Something went wrong');
            console.error("Error updating resume:", error);
    }
    };

    const params = useParams();
  return (
    <div>
        <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p className="">Add your previous work experience </p>

        <div className="">
                    {localExperienceList.map((item, index) => (
                        console.log('experienceList: ', item),
                <div key={index} className="">
                    <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                        <div className="">
                            <label className='text-xs' htmlFor="title">Position Title</label>
                                    <Input name='title' id='title' defaultValue={item.title} onChange={(event) => handleChange(index, event)} />
                        </div>
                        <div className="">
                            <label className='text-xs' htmlFor="companyName">Company Name</label>
                                    <Input name='companyName' id='companyName'defaultValue={item.companyName} onChange={(event) => handleChange(index, event)} />
                        </div>
                        <div className="">
                            <label className='text-xs' htmlFor="city">City</label>
                                    <Input name='city' id='city' defaultValue={item.city} onChange={(event) => handleChange(index, event)} />
                        </div>
                        <div className="">
                            <label className='text-xs' htmlFor="state">State</label>
                                    <Input name='state' id='state' defaultValue={item.state} onChange={(event) => handleChange(index, event)} />
                        </div>
                        <div className="">
                            <label className='text-xs' htmlFor="startDate">Start Date</label>
                                    <Input type='date' name='startDate'defaultValue={item.startDate} id='startDate' onChange={(event) => handleChange(index, event)} />
                        </div>
                        <div className="">
                            <label className='text-xs' htmlFor="endDate">End Date</label>
                                    <Input type='date' name='endDate' defaultValue={item.endDate} id='endDate' onChange={(event) => handleChange(index, event)} />
                        </div>

                         <div className="col-span-2">
                                    <RichTextEditor
                                        index={index}
                                        defaultValue={item.title}
                                        RichTextEditorChange={(e) => handleRichChange(e, 'workSummery', index)} />
                         </div>
                    </div>
                </div>
            ))}
        </div>
         <div className="flex justify-between">
                    <Button onClick={AddMoreExp} variant='outline' className='text-primary'>+ Add More Experience</Button>
                    <Button onClick={removeExp} variant='outline' className='text-primary'>- Remove </Button>

            <div className=""></div>
                    <Button onClick={onSave} disabled={loading} className="">
                        {loading ? <Loader2Icon className='animate-spin' /> : 'Save'}
               </Button>
         </div>

        </div>
    </div>
    );
}

export default Experience;
