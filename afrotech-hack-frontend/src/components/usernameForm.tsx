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
import { useEffect, useState, useRef } from "react"
import { LoadingButton } from "./ui/loading_button"
import { infinity } from "ldrs"


const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})

export function ProfileForm() {
    const [username, setUsername] = useState("");
    const [isUsernameValid, setIsUsernameValid] = useState(false);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    })

    // verify username using api
    useEffect(() => {
        const verifyUsername = async (username: string) => {
            const response = await fetch(`http://localhost:3000/user?username=${username}`);
            const data = await response.json();
            console.log("Data from verifyUsername on user ", username, ": ", data);
            setIsUsernameValid(data);
            if (data === true) {
                console.log("Username is valid");
                setIsLoading(true);
                setTimeout(() => {
                    setIsLoading(false);
                    window.location.href = `/loading?username=${encodeURIComponent(username)}`;
                }, 2000);
            }
        } 

        const checkUsername = async () => {
            await verifyUsername(username);
        }
        checkUsername(); // Invoke the async function
    }, [username]);

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {

        // console.log("Running in development mode");
        console.log("Values:", values);
        const currentUsername = values.username;

        setUsername(currentUsername);

        if (!isUsernameValid) {
            return;
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
