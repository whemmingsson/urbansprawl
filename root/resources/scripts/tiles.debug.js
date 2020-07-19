let tileDefinitions = [ 
{
    id : 'T',
    count: 10,
    shield : false,
    types: ['city', 'road'],
    connections: { North : 'city', East : 'city', South : 'roadend' , West : 'city'}
},
{
    id : 'U',
    count: 10,
    shield : false,
    types: ['road'],
    connections: { North : 'road', East : 'field', South : 'road' , West : 'field'}
},
{
    id : 'V',
    count: 15,
    shield : false,
    types: ['road'],
    connections: { North : 'field', East : 'field', South : 'road' , West : 'road'}
},
{
    id : 'W',
    count: 10,
    shield : false,
    types: ['road'],
    connections: { North : 'field', East : 'roadend', South : 'roadend' , West : 'roadend'}
},
{
    id : 'X',
    count: 5,
    shield : false,
    types: ['road'],
    connections: { North : 'roadend', East : 'roadend', South : 'roadend' , West : 'roadend'}
}
]