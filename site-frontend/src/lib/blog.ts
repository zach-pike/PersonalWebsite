export interface BlogPost {
    title: string,
    time: number,
    content: string
}

export async function getRecentBlogPosts(server: string, n?: number): Promise<BlogPost[]> {
    let req = await fetch(`${server}/blog/recent`);
    return await req.json();
}