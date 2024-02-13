'use client'

import { createChapterSchema } from '@/validators/link';
import React from 'react'
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button"
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
import { Separator } from './ui/separator';
import { Plus, Trash } from 'lucide-react';

type Props = {}

// Utilizing Zod's infer method to derive TypeScript types from our schema
type Input = z.infer<typeof createChapterSchema>;


const CreateCourseForm = (props: Props) => {
    // 1. Define your form.
    const form = useForm<Input>({
        resolver: zodResolver(createChapterSchema),
        // This sets the initial loading state for the form
        defaultValues: {
            link: '',
            topics: ['']
        },
    })

    function onSubmit(data: Input) {
        console.log(data);
    }

    form.watch()

    return (
        <div className="w-full mt-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <Button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Create</Button>
                    <FormField
                        control={form.control}
                        name="link"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Enter Youtube Link</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter a youtube link to get started." {...field} />
                                </FormControl>
                                <FormDescription>
                                    Enter the link of the video you would like to create content on.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <AnimatePresence>
                        {form.watch("topics").map((_, index) => {
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{
                                        opacity: { duration: 0.2 },
                                        height: { duration: 0.2 },
                                    }}
                                >
                                    <FormField
                                        key={index}
                                        control={form.control}
                                        name={`topics.${index}`}
                                        render={({ field }) => {
                                            return (
                                                <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row">
                                                    <FormLabel className="flex-[1] text-xl">
                                                        Topic {index + 1}
                                                    </FormLabel>
                                                    <FormControl className="flex-[6]">
                                                        <Input
                                                            placeholder="Enter additional topics to include"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            );
                                        }}
                                    />
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                    <div className="flex items-center justify-center mt-4">
                        <Separator className="flex-[1]" />
                        <div className="mx-4">
                            <Button
                                type="button"
                                variant="secondary"
                                className="font-semibold"
                                onClick={() => {
                                    form.setValue("topics", [...form.watch("topics"), '']);
                                }}
                            >
                                Add Additional Topic
                                <Plus className="w-4 h-4 ml-2 text-green-500" />
                            </Button>

                            <Button
                                type="button"
                                variant="secondary"
                                className="font-semibold ml-2"
                                onClick={() => {
                                    form.setValue("topics", form.watch("topics").slice(0, -1));
                                }}
                            >
                                Remove Topic
                                <Trash className="w-4 h-4 ml-2 text-red-500" />
                            </Button>
                        </div>
                        <Separator className="flex-[1]" />
                    </div>

                </form>

            </Form>
        </div>
    )
}

export default CreateCourseForm