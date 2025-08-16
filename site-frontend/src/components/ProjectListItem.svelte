<script lang="ts">
    import { navigate } from "svelte-routing";
    import type { Project } from "../lib/projects";
    import { getServerURL } from "../lib/utils";

    let {
        data
    }: { data: Project } = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="w-full h-32 bg-gray-200 p-2 flex gap-4 hover:bg-gray-300 cursor-pointer" onclick={() => navigate(`/projects/${data._id}`)}>
    <div class="w-3/4 h-full">
        <p class="font-bold text-xl">{data.title}</p>

        <hr class="bg-black">

        <p>{data.description}</p>
    </div>
    <div class="w-1/4 h-full flex items-center justify-center">
        <!-- Image will go here -->
        <img src="{getServerURL()}{data.projectPhoto}" alt="Project" class="max-w-full max-h-full object-contain">
    </div>
</div>