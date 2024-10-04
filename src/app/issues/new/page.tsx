"use client";
import { TextArea, TextField, Button } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css"
import { useForm, Controller } from "react-hook-form";
import React, { useState } from 'react'
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
    const [error, setError] = useState('');


    return (
        <form className='max-w-xl space-y-3'
            onSubmit={handleSubmit(async (data) => {
                try {
                    await axios.post('/api/issues', data);
                    toast.success('Issue created successfully!');
                    router.push('/issues');
                } catch (error) {
                    console.error(error);
                    const errorMessage = (error as any).message || 'Unknown error';
                    toast.error('Failed to create issue: ' + errorMessage+ ". Check Inputs");
                }
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