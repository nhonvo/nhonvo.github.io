import type { AccentColor, BaseColor } from "./colors";

// IMPORTANT SET THOSE TWO VARIABLES:
// NUMBER ONE:
// if deployed to github pages, set to https://<your-github-username>.github.io/
export const SITE = "https://nhonvo.github.io";

// NUMBER TWO:
// if repo name is <your-github-username>.github.io set to '/'
// otherwise set to '/<your-repo-name>'
export const BASE = "/algo-blog";

// MORE SETTINGS:

// will be used for the the title and meta tags and in the header (if SITE_NAME is left blank)
export const SITE_TITLE = "nhonvo's blog template";

// will be used in the meta tags (and for example shown in search results)
export const SITE_DESCRIPTION = "Welcome to my blog template! Fork it and make it your own.";

// will be used as the icon in the header and the favicon
export const SITE_FAVICON = "📖";

// will be used in the footer as the name of the author (c) <YEAR> <NAME> - LICENSE
export const NAME = "nhonvo";

// will be used in the footer as the license of the content (e.g. "All right reserved" or "CC-BY-SA 4.0")
export const LICENSE = "MIT licensed.";

// will be used to identify your bluesky account, so that likes and comments can be shown on your posts
export const BLUESKY_IDENTIFIER = "nhonvo.bsky.social";

export const SOURCE_LINK = 'https://github.com/nhonvo/algo-blog';

// will be used to set the base color of the blog
export const BASE_COLOR: BaseColor = "stone";

// will be used to set the accent color of the blog
export const ACCENT_COLOR: AccentColor = "pink";

// will show all icons that are not empty in the footer as links
export const SOCIAL_LINKS: {
  FACEBOOK_URL?: string;
  TWITTER_URL?: string;
  GITHUB_URL?: string;
  INSTAGRAM_URL?: string;
  LINKEDIN_URL?: string;
  YOUTUBE_URL?: string;
  SUBSTACK_URL?: string;
  EMAIL?: string;
  BLUESKY_URL?: string;
  SHOW_RSS?: boolean;
} = {
  FACEBOOK_URL: "https://www.facebook.com/NhonVTT/",
  GITHUB_URL: "https://github.com/nhonvo",
  INSTAGRAM_URL: "https://www.instagram.com/vothuongtruongnhon/",
  LINKEDIN_URL: "https://www.linkedin.com/in/truongnhon/",
  YOUTUBE_URL: "https://www.youtube.com/@nhonvo-dev",
  EMAIL: "vothuongtruongnhon2002@gmail.com",
  SHOW_RSS: true,
};



// EVEN MORE SETTINGS:

// if true, will show theme toggle in header (otherwise theme is automatically detected and can't be changed by the readers)
export const MANUAL_DARK_MODE = true;

// if true, will enable the search functionality
export const SEARCH_ENABLED = true;

// if true, will show images in the posts
export const SHOW_IMAGES = true;

// will be used to set the number of posts per page
export const POSTS_PER_PAGE = 8;

// will be shown in the header, if left blank will instead show the SITE_TITLE
export const SITE_NAME = "";

// if true, will show the SITE_FAVICON in the header
export const SHOW_FAVICON_IN_HEADER = true;
