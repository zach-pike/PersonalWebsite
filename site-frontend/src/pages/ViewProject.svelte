<script lang="ts">
    import { onMount } from "svelte";
    import type { Project } from "../lib/projects";
    import { getServerURL } from "../lib/utils";
    import SvelteMarkdown from "svelte-markdown";
    import { fixedRenderers } from "../md-renderers";
    import { Link } from "svelte-routing";

    let {
        projectId
    }: {
        projectId: string
    } = $props();

    let projectData = $state<Project | null>(null);

    onMount(async () => {
        let req = await fetch(
            `${getServerURL()}/projects/byId/${projectId}`
        );

        if (!req.ok) {
            console.log("Failed to load project id", projectId);
            return;
        }

        projectData = await req.json();
    });
</script>

<div>
    <Link to="/projects" class="text-blue-500">Back to projects</Link>

    <hr class="bg-black my-2">
    
    <div class="grid grid-cols-[3fr_1fr]">
        <div>
            <p class="text-2xl">
                <span class="font-bold">Project:</span> {projectData?.title}
            </p>
            
            <p>
                <span class="font-bold">Description:</span>    
                {projectData?.description}
            </p>
        </div>

        <div class="max-h-32 flex items-center justify-center">
            <img src="{getServerURL()}{projectData?.projectPhoto}" alt="Project" class="max-w-full max-h-full object-contain">
        </div>
    </div>

    <hr class="bg-black my-2">

    <SvelteMarkdown renderers={fixedRenderers} source={projectData?.content} />
</div>