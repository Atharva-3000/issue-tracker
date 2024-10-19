"use client";

import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { register, Hanko } from "@teamhanko/hanko-elements";

const hankoApi = process.env.NEXT_PUBLIC_HANKO_API_URL as string;

export default function HankoAuth() {
    const router = useRouter();
    const [hanko, setHanko] = useState<Hanko>();
    useEffect(() => setHanko(new Hanko(hankoApi)), []);
    const redirectAfterLogin = useCallback(() => {
        router.replace("/dashboard");
    }, [router]);
    useEffect(
        () =>
            hanko?.onSessionCreated(() => {
                redirectAfterLogin();
            }),
        [hanko, redirectAfterLogin]
    );
    useEffect(() => {
        register(hankoApi).catch((error) => {
            // handle error
            console.error(error);
        });
    }, []);
    return <hanko-auth />;
}
