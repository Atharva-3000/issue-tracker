
"use client";
import { TextArea, TextField, Button, Text } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import React, { useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import { HashLoader } from 'react-spinners';

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
    const router = useRouter();

    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });

    const [loading, setLoading] = useState(false);



    return (
        <form className='max-w-xl space-y-3'
            onSubmit={handleSubmit(async (data) => {
                try {
                    setLoading(true);
                    await axios.post('/api/issues', data);
                    toast.success('Issue created successfully!');
                    router.push('/issues');
                } catch (error) {
                    setLoading(false);
                    console.error(error);
                    const errorMessage = (error as any).message || 'Unknown error';
                    toast.error('Failed to create issue: ' + errorMessage + ". Check Inputs");
                }
            })}>
            <TextField.Root size="2" placeholder="Title"{...register('title')} />
            {errors.title?.message &&
                <Text color='red' as="p">{errors.title.message}</Text>}
            <Controller
                name='description'
                control={control}
                render={({ field }) =>
                    <SimpleMDE placeholder='Description' {...field} />
                }
            />
            {errors.description?.message &&
                <Text color='red' as="p">{errors.description.message}</Text>}
            <Button disabled={loading} type="submit" className='w-full'>
                Submit new Issue
                {loading && <HashLoader color='white' size={20} />}
            </Button>
        </form>
    );
};

export default NewIssuePage;