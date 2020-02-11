import { Page } from "../../entities/Page";
import { PageFactory } from "../PageFactory";

export function getDefaultPages():Page[] {
  return [
    fullPage(),
    new Page('PG_2', 'Page 2'),
  ];
}

export function fullPage():Page {
  const page = {
    id: 'PG_1',
    title: 'Talendor',
    summary: 'Long ago, the Talendorians lived together in harmony. Then, everything changed when the Fire Plane attacked.',
    properties: [
      {
        key: 'population',
        type: 'number',
        value: 100000
      },
      {
        key: 'banner',
        type: 'string',
        value: 'A mountain peak pinched by two suns'
      }
    ],
    details: [
      {
        id: 'DT_123456789012',
        title: 'The Bannerfold Barracks',
        summary: 'Belgon leads the barrack guards as the captain over the defense of the city and its kingdom.',
        partitions: [
          {
            type: 'h1',
            value: 'This is an h1 header'
          },
          {
            type: 'h2',
            value: 'This is an h2 header'
          },
          {
            type: 'h3',
            value: 'This is an h3 header'
          },
          {
            type: 'h4',
            value: 'This is an h4 header'
          },
          {
            type: 'h5',
            value: 'This is an h5 header'
          },
          {
            type: 'h6',
            value: 'This is an h6 header'
          },
          {
            type: 'p',
            partitions: [
              {
                type: 'text',
                value: 'This is regular text.'
              }
            ]
          },
          {
            type: 'p',
            partitions: [
              {
                type: 'text',
                value: 'It can be split on multiple lines.'
              }
            ]
          },
          {
            type: 'p',
            partitions: [
              {
                type: 'text',
                value: 'It '
              },
              {
                type: 'bold',
                value: 'can'
              },
              {
                type: 'text',
                value: ' '
              },
              {
                type: 'italics',
                value: 'also'
              },
              {
                type: 'text',
                value: ' '
              },
              {
                type: 'bold',
                partitions: [
                  {
                    type: 'italics',
                    value: 'contain'  
                  }
                ]
              },
              {
                type: 'text',
                value: ' '
              },
              {
                type: 'link',
                value: 'inline links',
                link: 'https://www.google.com'
              },
              {
                type: 'text',
                value: ' '
              }, 
              {
                type: 'relation',
                value: 'relations',
                relation: 'PG_123456789012345',
              },
              {
                type: 'text',
                value: ' or '
              },
              {
                type: 'color',
                value: 'colors',
                color: '#FF2200'
              },
              {
                type: 'text',
                value: '.'                        
              }
            ]
          },
          {
            type: 'ul',
            items: [
              {
                type: 'text',
                value: 'unordered list'
              }
            ]
          },
          {
            type: 'ol',
            items: [
              {
                type: 'bold',
                partitions: [
                  {
                    type: 'italics',
                    value: 'ordered list 1'  
                  }
                ]
              },
              {
                type: 'text',
                value: 'ordered list 2'
              }
            ]
          },
          {
            type: 'image',
            altText: 'The Dark Rider is coming',
            link: 'https://us.123rf.com/450wm/ibreaker213/ibreaker2131408/ibreaker213140800004/30989551-stock-illustration-black-horseman-castle-fantasy-black-horse-rider-with-background-castle-view-illustration-.jpg?ver=6'
          },
          {
            type: 'hr'
          },
          {
            type: 'image',
            altText: 'The forsaken city',
            link: 'https://ae01.alicdn.com/kf/HTB1Fb9zNpXXXXX8XXXXq6xXFXXXU/fantasy-art-paintings-landscapes-architecture-buildings-castles-surreal-waterrfalls-nature-scenic-Home-Decoration-Canvas-Poster.jpg'
          },
          {
            type: 'quotes',
            partitions: [
              {
                type: 'text',
                value: '"I tend to think to much, Bast. My greatest successes came from decisions I made when I stopped thinking and simply did what felt right. Even if there was no good explanation for what I did...Even if there were very good reasons for me '                    
              },
              {
                type: 'italics',
                value: 'not'
              },
              {
                type: 'text',
                value: ' to do what I did." -Kvothe; The Name of the Wind, p.25'
              }
            ]
          },
          {
            type: 'hr'
          },
          {
            type: 'quotes',
            value: 'or quoted paragraphs\nif it\'s more than one line'
          },
          {
            type: 'quotes',
            partitions: [
              {
                type: 'text',
                value: 'quoted paragraphs with\n',
              },
              {
                type: 'bold',
                value: 'inner partitions'
              },
              {
                type: 'text',
                value: ' in it'
              }
            ]
          },
          {
            type: 'image',
            altText: null,
            link: 'https://st2.depositphotos.com/3347209/6125/i/450/depositphotos_61250691-stock-photo-crows-in-the-forest.jpg'
          },
          {
            type: 'hr'
          }
        ]
      }
    ]
  }
  return PageFactory.buildPage(page);
}