const Query = {
  users(parent, args, { db }, info) {
      if (!args.query) return db.users

      return db.users.filter(user => user.name.toLowerCase().includes(args.query.toLowerCase()))
  },
  posts(parent, args, { db }, info) {
      if (!args.query) return db.posts
      
      return db.posts.filter(post => {
      const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
      const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
      return isBodyMatch || isTitleMatch
      })
  },
  comments(parent, args, { db }, info) {
      return db.comments
  },
  me() {
      return {
          id: '123456',
          name: 'Jerry',
          email: 'jerry@codes.com'
      }
  },
  post(p) {
      return {
          id: '093',
          title: 'GraphQL 101',
          body: '',
          published: false,
      }
  },
}

export { Query as default }