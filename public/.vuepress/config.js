module.exports = {
  description: '',
  base: '/',
  themeConfig: {
    logo: '/logo_text.png',
    search: false,
    nav: [
      { text: 'Horizon',
        link: '/horizon/',
      },
      {
        text: '(Documentation)',
        link: '/documentation/',
      },
      {
        text: 'Design Thinking',
        link: '/process/',
      },
      {
        text: 'Data Source',
        link: '/datasource/',
      },
      {
        text: 'Backend',
        link: '/backend/',
      },
      {
        text: 'Frontend',
        link: '/frontend/',
      },
      {
        text: 'How to deploy',
        link: '/instructions/',
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
