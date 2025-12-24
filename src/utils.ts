import { getCollection } from "astro:content";

export const getBlogPosts = async (showHidden = false) => {
  const posts = (await getCollection("blog"))
    .filter((post: any) => post.data.published !== false && (showHidden || !post.data.hidden))
    .sort(
      (a: any, b: any) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
    );

  return posts;
};

export const getReadingTime = (content: string | undefined) => {
  if (!content) return "0 min read";
  const wordsPerMinute = 200;
  const noOfWords = content.split(/\s/g).length;
  const minutes = noOfWords / wordsPerMinute;
  const readTime = Math.ceil(minutes);
  return `${readTime} min read`;
};

