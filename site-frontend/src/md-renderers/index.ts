import BlockQuote from "./BlockQuote.svelte";
import Code from "./Code.svelte";
import Codespan from "./Codespan.svelte";
import Heading from "./Heading.svelte";
import Hr from "./Hr.svelte";
import Link from "./Link.svelte";
import List from "./List.svelte";

export const fixedRenderers = {
    heading: Heading,
    link: Link,
    list: List,
    hr: Hr,
    code: Code,
    codespan: Codespan,
    blockquote: BlockQuote,
    // listitem: ,
}