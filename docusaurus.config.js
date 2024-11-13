const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

module.exports = {
  title: "Code with Nolan",
  tagline: "Becoming the Senior Developer",
  url: "https://nhonvo.github.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "images/favicon.ico",
  organizationName: "nhonvo",
  projectName: "nhonvo.github.io",
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: false,
        pages: false,
        blog: {
          routeBasePath: '/',
          path: 'blog',
          editUrl: "https://github.com/nhonvo/nhonvo.github.io/edit/main/blog/",
          include: ['**/*.{md,mdx}'],
          exclude: ['**/_*.{md,mdx}'],
          showReadingTime: true,
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'All Posts',
          postsPerPage: 5,
          blogTitle: 'My Blog',
          blogDescription: 'A place to share my knowledge',
          feedOptions: {
            type: 'all',
            title: 'Code with Nolan Blog',
            description: 'Stay updated with the latest posts from Code with Nolan.',
            copyright: `Copyright © ${new Date().getFullYear()} Nhonvo`,
          },
          remarkPlugins: [],
          rehypePlugins: [],
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: "Code with Nolan",
      hideOnScroll: true,
      logo: {
        alt: "Nolan Logo",
        src: "images/128.png",
        srcDark: "images/128.png",
      },
      items: [
        {
          to: '/', 
          label: 'Blog',
          position: 'left',
          activeBaseRegex: '^/$',
        },
        {
          to: 'tags',
          label: 'Tags',
          position: 'left',
          activeBasePath: 'tags',
        },
        {
          label: 'More',
          position: 'left',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/nhonvo',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/truongnhon/',
            },
            // {
            //   label: 'Phonemic Chart',
            //   href: '/PhonemicChart'
            // }
          ],
        },
        {
          href: 'https://nhonvo.github.io/profile/',
          label: 'Profile',
          position: 'right',
        },
      ],
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  plugins: [
    'docusaurus-lunr-search',
  ],
};
