import { writable } from "svelte/store";

export interface ProjectEditInfo {
    title: string;
    description: string;
    projectPhoto: string;
    content: string;
    _id: string;
}

export const projectEditWritable = writable<ProjectEditInfo | null>(null);