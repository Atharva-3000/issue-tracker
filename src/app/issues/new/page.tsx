"use client";
import { TextArea, TextField, Button } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css"
import React from 'react'

const NewIssuePage = () => {
    return (
        <div className='max-w-xl space-y-3'>
            <TextField.Root placeholder='Title'>
                <TextField.Slot>
                </TextField.Slot>
            </TextField.Root>
            <SimpleMDE placeholder='Description' />
        </div>
    );
};

export default NewIssuePage;