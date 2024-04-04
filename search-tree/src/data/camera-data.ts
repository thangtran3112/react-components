const cameraData = [
  {
    id: '1',
    name: 'JFK14', //site level
    children: [
      {
        id: '2', //recorder level
        name: 'JFK14-Front-Recorder-1',
        children: [
          {
            id: '3', //encoder level
            name: 'JFK14-Front-Encoder-1',
            children: [
              {
                id: '4', //camera level
                name: 'Seonmi Lee Camera',
              },
              {
                id: '5',
                name: 'Francois Camera',
              },
              {
                id: '6',
                name: 'Maury Camera',
              },
              {
                id: '7',
                name: 'Paulius Camera',
              },
            ],
          },
        ],
      },
      {
        id: '8',
        name: 'JFK14-Back-Recorder-1',
        children: [
          {
            id: '9',
            name: 'JFK14-Back-Encoder-1',
            children: [
              {
                id: '10',
                name: 'Donald Trump Camera',
              },
              {
                id: '11',
                name: 'Joe Biden Camera',
              },
              {
                id: '12',
                name: 'LeBron James Camera',
              },
              {
                id: '13',
                name: 'Taylor Swift Camera',
              },
            ],
          },
          {
            id: '15',
            name: 'JFK14-Washroom-Recorder-1',
            children: [
              {
                id: '16',
                name: 'Lady Washroom Camera',
              },
              {
                id: '17',
                name: 'Men Washroom Camera',
              },
              {
                id: '18',
                name: 'Toddler Washroom Camera',
              },
              {
                id: '19',
                name: 'Handicalf Washroom Camera',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '20',
    name: 'AAA1',
    children: [
      {
        id: '21',
        name: 'AAA1-Front-Recorder-1',
        children: [
          {
            id: '22',
            name: 'AAA1-Front-Encoder-1',
            children: [
              {
                id: '23',
                name: 'AAA1 Seonmi Lee Camera',
              },
              {
                id: '24',
                name: 'AAA1 Francois Camera',
              },
              {
                id: '25',
                name: 'AAA1 Maury Camera',
              },
              {
                id: '26',
                name: 'AAA1 Paulius Camera',
              },
            ],
          },
        ],
      },
      {
        id: '27',
        name: 'AAA1-Back-Recorder-1',
        children: [
          {
            id: '28',
            name: 'AAA1-Back-Encoder-1',
            children: [
              {
                id: '29',
                name: 'Spiderman Camera',
              },
              {
                id: '30',
                name: 'Superman Camera',
              },
              {
                id: '31',
                name: 'Wonderwoman Camera',
              },
              {
                id: '32',
                name: 'Batman Camera',
              },
            ],
          },
          {
            id: '33',
            name: 'AAA1-Kitchen-Encoder-1',
            children: [
              {
                id: '34',
                name: 'Lady Kitchen Camera',
              },
              {
                id: '35',
                name: 'Men Kitchen Camera',
              },
              {
                id: '36',
                name: 'Toddler Kitchen Camera',
              },
              {
                id: '37',
                name: 'Handicalf Kitchen Camera',
              },
            ],
          },
          {
            id: '34',
            name: 'Tiger Wood Camera',
          },
          {
            id: '35',
            name: 'Rozer Federer Camera',
          },
        ],
      },
    ],
  },
];

export function fetchData() {
  return new Promise((resolve) => {
    setTimeout(resolve, 100, cameraData);
  });
}
