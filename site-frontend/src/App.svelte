<script lang="ts">
  import BlogWidget from "./BlogWidget.svelte";
    import LogbookWidget from "./LogbookWidget.svelte";
</script>

<div class="bg-slate-700 w-full h-full flex flex-col items-center p-4 overflow-y-scroll">
  <p class="w-full md:w-3/4 text-white text-3xl m-2">zpike.net</p>
  <div class="w-full md:w-3/4 flex-col sm:flex-row flex gap-1">

    <div class="p-4 sm:w-3/4 w-full h-full bg-white">
      <p class="text-2xl">Welcome!</p>
      <p>Hello, my name is Zachary and this is my website! I live on the eastern shore of Maryland, near Kent Island. My hobbies include; Computing, Radio, Engineering, and of course Programming. I am interested in pursuing a Computer Science Degree from Salisbury Univerity, for now I work at a marina doing boat related stuff.</p>
    
      <div class="w-full bg-gray-500 h-[1px] m-2"></div>
      
      <p class="text-xl m-1">Updates</p>
      <BlogWidget />

      <div class="w-full bg-gray-500 h-[1px] m-2"></div>

      <p class="text-xl m-1">QSO Logbook</p>
      <LogbookWidget />
    </div>

    <div class="p-4 sm:w-1/4 w-full h-full bg-white flex flex-col items-center">
      <p>Navigation</p>

      <ul class="underline">
        <li><a href="https://github.com/zach-pike">My Github</a></li>
        <li><a href="#">Go to a random project</a></li>
        <li><a href="#">QSO book</a></li>
      </ul>
    </div>
  </div>
</div>