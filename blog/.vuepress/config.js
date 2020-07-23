module.exports = {
  publicPath: 'horizonfleet',
  description: '',
  base: '/',
  "scripts": {
    "blog:build": "vuepress build blog"
  },
  themeConfig: {
    logo: '/logo_text.png',
    search: false,
    nav: [
      { text: 'Horizon',
        link: '/horizon/',
      },
      {text: 'Instructions',
        link: '/instructions/',
      },
      {
        text: 'Documentation',
        link: '/documentation/',
      },
      {
        text: 'About',
        link: '/about/',
      },
    ],
    sidebar: {
      '/about/' : [
       ''
      ],
      '/horizon/': [
        ''
      ],
      '/instructions/': [
        ''
      ],
      '/documentation/': [
        ''
      ],
  },
    footer: {
      contact: [
        {
          type: 'github',
          link: 'https://github.com/',
        },
      ],
      copyright: [
        {
          text: 'Privacy Policy',
          link: 'https://policies.google.com/privacy?hl=en-US',
        },
        {
          text: 'MIT Licensed | Copyright © 2020-present Anja Stütz',
          link: '',
        },
      ],
    },
  },
}
