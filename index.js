// Importar Apollo Server y el soporte para un servidor independiente
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';

// Definir el esquema de GraphQL (schema)
const typeDefs = `#graphql
type Author {
    name: String
    country: String
}

type Book {
    id: Int
    title: String
    author: Author
    pages: Int
    year: Int
    genre: String
}

type Query {
    books: [Book]
    findById(id: Int!): Book
    findByAuthor(name: String!): [Book]
    findByGenre(genre: String!): [Book]
}

type Mutation {
    addBook(id: Int!, title: String!, authorName: String!, authorCountry: String!, pages: Int!, year: Int!, genre: String!): Book
    updateBook(id: Int!, title: String, authorName: String, authorCountry: String, pages: Int, year: Int, genre: String): Book
}
`

let books = [
    {
        id: 1,
        title: "Juego de Tronos",
        author: { name: "George R.R. Martin", country: "EEUU" },
        pages: 829,
        year: 1996,
        genre: "Medieval",
    },
    {
        id: 2,
        title: "Cien años de Soledad",
        author: { name: "Gabriel García Márquez", country: "Colombia" },
        pages: 417,
        year: 1967,
        genre: "Novela",
    }
];

const resolvers = {
    Query: {
        books: () => books,
        findById: (parent, args) => books.find(book => book.id === args.id),
        findByAuthor: (parent, args) => books.filter(book => book.author.name === args.name),
        findByGenre: (parent, args) => books.filter(book => book.genre === args.genre),
    },
    Mutation: {
        addBook: (parent, args) => {
            const newBook = {
                id: args.id,
                title: args.title,
                author: { name: args.authorName, country: args.authorCountry },
                pages: args.pages,
                year: args.year,
                genre: args.genre,
            };
            books.push(newBook);
            return newBook;
        },
        updateBook: (parent, args) => {
            const book = books.find(book => book.id === args.id);
            if (!book) return null;

            if (args.title) book.title = args.title;
            if (args.authorName) book.author.name = args.authorName;
            if (args.authorCountry) book.author.country = args.authorCountry;
            if (args.pages) book.pages = args.pages;
            if (args.year) book.year = args.year;
            if (args.genre) book.genre = args.genre;

            return book;
        },
    },
};

// Crear la instancia del servidor Apollo
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Iniciar el servidor y especificar el puerto
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`Server ready at: ${url}`);
