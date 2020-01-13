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

const db = {
  users,
  posts,
  comments
}

export { db as default }
