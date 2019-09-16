const employees = [{
    id: '0',
    firstname: 'Hugo',
    lastname: 'Walker',
    hobbies: ['Dart', 'Computer'],
    projectIds: ['P1'],
}, {
    id: '1',
    firstname: 'Quentin',
    lastname: 'Tarantino',
    hobbies: ['Movies',],
    projectIds: ['P1', 'P2'],
}, {
    id: '2',
    firstname: 'Paul',
    lastname: 'Hobyless',
    projectIds: [],
},];

const projects = [{
    id: 'P1',
    name: 'NASA',
    technologies: ['Javascript', 'Rockets'],
}, {
    id: 'P2',
    name: 'Tesla',
    technologies: ['Batteries', 'C'],
}];

module.exports = {
    employees,
    projects,
};