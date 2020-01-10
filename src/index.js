import { GraphQLServer } from 'graphql-yoga'

// Scalar types - String, Boolean, Int, Float, ID

// Type definitions (schema)
const typeDefs = `
    type Query {
        greeting(name: String): String!
        me: User!
        grades: [Int!]!
        post: Post!
        add(numbers: [Float!]!): Float!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`

// Resolvers
const resolvers = {
    Query: {
        greeting(parent, args, ctx, info) {
            return `Hello ${args.name}`
        },
        grades(parent, args, ctx, info) {
            return [90, 88,99]
        },
        me() {
            return {
                id: '123456',
                name: 'Mike',
                email: 'mike@gmail.com'
            }
        },
        post() {
            return {
                id: '8765433',
                title: 'he lives on!',
                body: 'here',
                published: false
            }
        },
        add(parent, args, ctx, info) {
            console.log(args)
            if (args.length === 0) return 0

            return args.numbers.reduce((acc, val) => acc + val)
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up!')
})