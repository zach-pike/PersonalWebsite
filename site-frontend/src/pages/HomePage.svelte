<script lang="ts">
    import BlogWidget from "../components/BlogWidget.svelte";
    import LogbookWidget from "../components/LogbookWidget.svelte";

</script>

<div>
    <p class="text-2xl">Welcome!</p>
    <p>Hello, my name is Zachary and this is my website! I live on the eastern shore of Maryland, near Kent Island. My hobbies include; Computing, Radio, Engineering, and of course Programming. I am interested in pursuing a Computer Science Degree from Salisbury Univerity, for now I work at a marina doing boat related stuff.</p>

    <div class="w-full bg-gray-500 h-[1px] m-2"></div>
            
    <p class="text-xl m-1">Updates</p>
    <BlogWidget />

    <div class="w-full bg-gray-500 h-[1px] m-2"></div>

    <p class="text-xl m-1">QSO Logbook</p>
    <LogbookWidget />
</div>