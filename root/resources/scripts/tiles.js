// Contains the tile definitions

let tileDefinitions = [ 
{
    id : 'A',
    count: 2,
    shield:false,
    types: ['chapel', 'road'],
    connections: { North : 'field', East : 'field', South : 'road', West : 'field'}
},
{
    id : 'B',
    count: 4,
    shield:false,
    types: ['chapel'],
    connections: { North : 'field', East : 'field', South : 'field', West : 'field'}
},
{
    id : 'C',
    count: 1,
    types: ['citycenter'],
    shield: true,
    connections: { North : 'citycenter', East : 'citycenter', South : 'citycenter', West : 'citycenter'}
},
{
    id : 'D',
    count: 4, // Includes starting square
    shield:false,
    types: ['cityedge', 'road'],
    connections: { North : 'road', East : 'cityedge', South : 'road', West : 'field'}
},
{
    id : 'E',
    count: 5, 
    shield:false,
    types: ['cityedge'],
    connections: { North : 'cityedge', East : 'field', South : 'field', West : 'field'}
},
{
    id : 'F',
    count: 2,
    types: ['citycenter'],
    shield: true,
    connections: { North : 'field', East : 'citycenter', South : 'field', West : 'citycenter'}
},
{
    id : 'G',
    count: 1,
    shield:false,
    types: ['citycenter'],
    connections: { North : 'citycenter', East : 'field', South : 'citycenter', West : 'field'}
},
{
    id : 'H',
    count: 3,
    shield:false,
    types: ['cityedge'],
    connections: { North : 'field', East : 'cityedge', South : 'field', West : 'cityedge'}
},
{
    id : 'I',
    count: 2,
    shield:false,
    types: ['citycenter'],
    connections: { North : 'field', East : 'citycenter', South : 'citycenter', West : 'field'}
},
{
    id : 'J',
    count: 3,
    shield:false,
    types: ['cityedge', 'road'],
    connections: { North : 'cityedge', East : 'road', South : 'road', West : 'field'}
},
{
    id : 'K',
    count: 3,
    shield:false,
    types: ['cityedge', 'road'],
    connections: { North : 'road', East : 'cityedge', South : 'field' , West : 'road'}
},
{
    id : 'L',
    count: 3,
    shield:false,
    types: ['cityedge', 'road'],
    connections: { North : 'road', East : 'cityedge', South : 'road' , West : 'road'}
},
{
    id : 'M',
    count: 2,
    shield:true,
    types: ['city'],
    connections: { North : 'city', East : 'field', South : 'field' , West : 'city'}
},
{
    id : 'N',
    count: 3,
    shield:false,
    types: ['city'],
    connections: { North : 'city', East : 'field', South : 'field' , West : 'city'}
},
{
    id : 'O',
    count: 2,
    shield : true,
    types: ['city', 'road'],
    connections: { North : 'city', East : 'road', South : 'road' , West : 'city'}
},
{
    id : 'P',
    count: 3,
    shield : false,
    types: ['city', 'road'],
    connections: { North : 'city', East : 'road', South : 'road' , West : 'city'}
},
{
    id : 'Q',
    count: 1,
    shield : true,
    types: ['city'],
    connections: { North : 'city', East : 'city', South : 'field' , West : 'city'}
},
{
    id : 'R',
    count: 3,
    shield : false,
    types: ['city'],
    connections: { North : 'city', East : 'city', South : 'field' , West : 'city'}
},
{
    id : 'S',
    count: 2,
    shield : true,
    types: ['city', 'road'],
    connections: { North : 'city', East : 'city', South : 'road' , West : 'city'}
},
{
    id : 'T',
    count: 1,
    shield : false,
    types: ['city', 'road'],
    connections: { North : 'city', East : 'city', South : 'road' , West : 'city'}
},
{
    id : 'U',
    count: 8,
    shield : false,
    types: ['road'],
    connections: { North : 'road', East : 'field', South : 'road' , West : 'field'}
},
{
    id : 'V',
    count: 9,
    shield : false,
    types: ['road'],
    connections: { North : 'field', East : 'field', South : 'road' , West : 'road'}
},
{
    id : 'W',
    count: 4,
    shield : false,
    types: ['road'],
    connections: { North : 'field', East : 'road', South : 'road' , West : 'road'}
},
{
    id : 'X',
    count: 1,
    shield : false,
    types: ['road'],
    connections: { North : 'road', East : 'road', South : 'road' , West : 'road'}
}
]