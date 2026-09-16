<script lang="ts">
    import BlogWidget from "../components/widgets/BlogWidget.svelte";
    import LogbookWidget from "../components/widgets/LogbookWidget.svelte";
</script>

<div>
    <p class="text-2xl">Welcome!</p>
    <p>Hello, my name is Zachary and this is my website! I live on the eastern shore of Maryland, near Kent Island. My hobbies include; Computing, Radio, Engineering, and of course Programming.</p>

    <hr class="bg-gray-500">
            
    <p class="text-xl m-1">Updates</p>
    <BlogWidget />

    <!-- <hr class="bg-gray-500">

    <p class="text-xl m-1">QSO Logbook</p>
    <LogbookWidget /> -->
</div>