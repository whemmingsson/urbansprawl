// Contains the tile definitions

let tiles = [ 
{
    id : 'A',
    count: 2,
    type: ['chapel', 'road'],
    connections: { North : null, East : null, South : 'road', West : null}
},
{
    id : 'B',
    count: 4,
    type: ['chapel'],
    connections: { North : null, East : null, South : null, West : null}
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
    types: ['cityedge', 'road'],
    connections: { North : 'road', East : 'cityedge', South : 'road', West : null}
},
{
    id : 'E',
    count: 5, 
    types: ['cityedge'],
    connections: { North : 'cityedge', East : null, South : null, West : null}
},
{
    id : 'F',
    count: 2,
    types: ['citycenter'],
    shield: true,
    connections: { North : null, East : 'citycenter', South : null, West : 'citycenter'}
},
{
    id : 'G',
    count: 1,
    types: ['citycenter'],
    connections: { North : 'citycenter', East : null, South : null, West : 'citycenter'}
},
{
    id : 'H',
    count: 3,
    types: ['cityedge'],
    connections: { North : 'cityedge', East : null, South : null, West : 'cityedge'}
},
{
    id : 'I',
    count: 2,
    types: ['citycenter'],
    connections: { North : 'citycenter', East : null, South : null, West : 'citycenter'}
},
{
    id : 'J',
    count: 3,
    types: ['cityedge', 'road'],
    connections: { North : 'cityedge', East : 'road', South : 'road', West : null}
},
{
    id : 'K',
    count: 3,
    types: ['cityedge', 'road'],
    connections: { North : 'road', East : 'cityedge', South : null , West : 'road'}
}]