const {ApolloServer, gql} = require('apollo-server');
const employees = require("../data/employees").employees;


const typeDefs = gql`
    type Query {
        info: String!
        employees: [Employee!]!
    }

    type Employee {
        id: ID!
        firstname: String!
        lastname: String!
        hobbies: [String!]!
    }
`;

const resolvers = {
    Query: {
        info: () => 'GraphQL CTD 2019',
        employees: () => employees,
    },
    Employee: {
        hobbies: (parent) => parent.hobbies || [],
    }
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});

