"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { LoadingButton } from "./ui/loading_button"
import { log } from "console"


const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})

export function ProfileForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        // submit to backend endpoint /profile

        // For development purposes only
        if (process.env.NODE_ENV === 'development') {
            console.log("Running in development mode");
            console.log("Values:", values);
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                console.log("Waiting for 5 seconds");
                window.location.href = "/loading";
                console.log("Redirected to loading page");
            }, 5000);
        } else {
            try {
                const response = await fetch("/profile", {
                    method: "POST",
                    body: JSON.stringify(values),
                });
                const data = await response.json()
                console.log(data)
            } catch (error) {
                console.log("Error fetching profile");
                console.error(error)
            }
        }

    }

    const [isLoading, setIsLoading] = useState(false)

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-md mx-auto">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className="my-4">
                            <FormLabel>Enter a Github Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Github Username" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the Github handle name for the user you want to search for e.g
                                <span className="italic"> torvalds</span>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {isLoading ?
                    <LoadingButton type="submit" variant="outline" disabled>Checking username</LoadingButton> :
                    <Button type="submit">Submit</Button>}
            </form>
        </Form>
    )
}

export default ProfileForm
