const {ApolloServer, gql, UserInputError} = require('apollo-server');
const {employees, projects} = require("../data/employees");


const typeDefs = gql`
    type Query {
        info: String!
        employees("Zero based offset for paging." offset: Int, "Amount of employees." limit: Int): [Employee!]!
    }

    type Mutation {
        addEmployee(firstname: String!, lastname: String!, hobbies: [String!]): Employee!
        updateEmployee(id: ID!, firstname: String, lastname: String, hobbies: [String!]): Employee!
    }

    type Employee {
        id: ID!
        firstname: String!
        lastname: String!
        fullname: String!
        hobbies: [String!]!
        projects: [Project!]!
    }

    type Project {
        id: ID!
        name: String!
        technologies: [String!]!
    }
`;

const resolvers = {
    Query: {
        info: () => 'GraphQL CTD 2019',
        employees: (parent, {offset, limit}) => {
            if (offset || limit) {
                return employees.slice(offset || 0, offset + (limit || employees.length));
            }
            return employees;
        },
    },
    Mutation: {
        addEmployee: (parent, {firstname, lastname, hobbies}, context, info) => {
            const newEmployee = {
                id: employees.length.toString(),
                firstname,
                lastname,
                hobbies: hobbies || [],
            };
            employees.push(newEmployee);
            return newEmployee;
        },
        updateEmployee: (parent, {id, firstname, lastname, hobbies}) => {
            const employeeToUpdate = employees.find(employee => employee.id === id);
            if (employeeToUpdate) {
                employeeToUpdate.firstname = firstname || employeeToUpdate.firstname;
                employeeToUpdate.lastname = lastname || employeeToUpdate.lastname;
                employeeToUpdate.hobbies = hobbies || employeeToUpdate.hobbies;
            } else {
                throw new UserInputError(`User with ID ${id} not found.`);
            }
            return employeeToUpdate;
        },
    },

    Employee: {
        hobbies: (parent) => parent.hobbies || [],
        fullname: (parent) => parent.firstname + ' ' + parent.lastname,
        projects: (employee) =>
            projects.filter(project => employee.projectIds.some(projectId => projectId === project.id)),

    }
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});

