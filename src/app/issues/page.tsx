"use client";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";

type Issue = {
    id: number;
    title: string;
    description: string;
    createdAt: string;
};

export default function Issues() {
    const [allIssues, setAllIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        const data = axios.get('/api/issues').then((res) => {
            setAllIssues(res.data);
        });
        return () => {
            data;
        };
    }, []);

    return (
        <div>
            <ul className="gap-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {allIssues.map((issue) => (
                    <Card key={issue.id} title={issue.title} description={issue.description} time={issue.createdAt} />
                ))}
            </ul>

            <Button className="mt-4">
                <Link href={"/issues/new"}>
                    New Issue
                </Link>
            </Button>
        </div>
    );
}