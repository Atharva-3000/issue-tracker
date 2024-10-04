"use client";
import { TextArea, TextField, Button } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css"
import { useForm, Controller } from "react-hook-form";
import React from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface IssueForm {
    title: string;
    description: string;
}

const NewIssuePage = () => {
    const router = useRouter();
    const { register, control, handleSubmit } = useForm<IssueForm>();
    // console.log(register('title'));
    return (
        <form className='max-w-xl space-y-3'
            onSubmit={handleSubmit(async (data) => {
                // console.log(data)
                await axios.post('/api/issues', data);
                toast.success('Issue created successfully!');
                router.push('/issues');
            })}>
            <TextField.Root size="2" placeholder="Title"{...register('title')} />
            <Controller
                name='description'
                control={control}
                render={({ field }) =>
                    <SimpleMDE placeholder='Description' {...field} />
                }
            />
            <Button>Submit New Issue</Button>
        </form>
    );
};

export default NewIssuePage;