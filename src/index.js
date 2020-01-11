import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4'

const users = [{
    id: '1',
    name: "Lanre",
    email: 'lan@gmail.com',
    age: 44
} , {
    id: '2',
    name: "Dare",
    email: 'dan@gmail.com',
    age: 42
}, {
    id: '3',
    name: "Dre",
    email: 'den@gmail.com',
    age: 34
}]

const posts = [{
    id: '1',
    title: 'Hello',
    body: 'This is the famous slug to new in programming!',
    published: true,
    author: '1'
}, {
    id: '2',
    title: 'How are you',
    body: 'This is the famous greeting to show familiarity although the question isn"t actually about how you feel!',
    published: true,
    author: '2'
}, {
    id: '3',
    title: 'What Next',
    body: 'This is the famous question to propel to action!',
    published: false,
    author: '2'
}]

const comments = [{
    id: '1a',
    text: 'Getting better daily is key',
    author: '1',
    post: '3'
}, {
    id: '2a',
    text: 'Daily jugging is vital for the body',
    author: '2',
    post: '2'
}, {
    id: '3a',
    text: 'Keep focus',
    author: '3',
    post: '3'
}, {
    id: '4a',
    text: 'Yes is like that idea',
    author: '1',
    post: '3'
}]

// Type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        me: User!
        posts(query: String): [Post!]!
        post: Post!
        comments: [Comment!]!
    }

    type Mutation {
        createUser(name: String!, email: String!, age: Int): User!
        createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
        createComment(text: String!, author: ID!, post: ID!): Comment!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }
`

// Resolvers
const resolvers = {
    Query: {
        me() {
            return {
                id: '123456',
                name: 'Mike',
                email: 'mike@gmail.com'
            }
        },
        posts(parent, args, ctx, info) {
            if (!args.query) return posts
            
            return posts.filter(post => {
            const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
            const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
            return isBodyMatch || isTitleMatch
            })
        },
        post(parent, args, ctx, info) {
            return posts.filter(post => post.id === args.query)
        },
        users(parent, args, ctx, info) {
            if (!args.query) return users

            return users.filter(user => user.name.toLowerCase().includes(args.query.toLowerCase()))
        },
        comments(parent, args, ctx, info) {
            return comments
        }
    },
    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.some(user => user.email === args.email)

            if (emailTaken) {
                throw new Error("Email taken.")
            }

            const user= {
                id: uuidv4(),
                name: args.name,
                email: args.email,
                age: args.age
            }

            users.push(user)

            return user
        },
        createPost(parent, args, ctx, info) {
            const userExists = users.some(user => user.id === args.author)

            if (!userExists) {
                throw new Error("User not found")
            }

            const post = {
                id: uuidv4(),
                title: args.title,
                body: args.body,
                published: args.published,
                author: args.author
            }

            posts.push(post)

            return post
        },
        createComment(parent, args, ctx, info) {
            const userExits = users.some(user => user.id === args.author)
            const postExists = posts.some(post => post.id === args.post && post.published)

            if (!userExits || !postExists) {
                throw new Error("Unable to find user and post.")
            }

            const comment = {
                id: uuidv4(),
                text: args.text,
                author: args.author,
                post: args.post
            }

            comments.push(comment);

            return comment;
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find(user => user.id === parent.author)
        },
        comments(parent, args, ctx, info) {
            return comments.filter(comment => comment.post === parent.id)
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter(post => post.author === parent.id)
        },
        comments(parent, args, ctx, info) {
            return comments.filter(comment => comment.author === parent.id)
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find(user => user.id === parent.author)
        },
        post(parent, args, ctx, info) {
            return posts.find(post => post.id === parent.post)
        }
    },
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up!')
})