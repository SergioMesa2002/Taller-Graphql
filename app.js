import axios from 'axios';

// URL del servidor Apollo (cambia el puerto si estás usando uno diferente)
const apolloServerUrl = 'http://localhost:4000';

// Función para obtener todos los libros
async function getBooks() {
    try {
        const response = await axios.post(apolloServerUrl, {
            query: `
        query {
          books {
            id
            title
            author {
              name
              country
            }
            pages
            year
            genre
          }
        }
      `
        });
        console.log("Libros obtenidos:", response.data.data.books);
    } catch (error) {
        console.error("Error al obtener libros:", error.message);
    }
}

// Función para agregar un nuevo libro
async function addBook(id, title, authorName, authorCountry, pages, year, genre) {
    try {
        const response = await axios.post(apolloServerUrl, {
            query: `
        mutation {
          addBook(
            id: ${id},
            title: "${title}",
            authorName: "${authorName}",
            authorCountry: "${authorCountry}",
            pages: ${pages},
            year: ${year},
            genre: "${genre}"
          ) {
            id
            title
            author {
              name
              country
            }
            pages
            year
            genre
          }
        }
      `
        });
        console.log("Libro agregado:", response.data.data.addBook);
    } catch (error) {
        console.error("Error al agregar libro:", error.message);
    }
}

// Llamar a la función para obtener todos los libros
getBooks();

// Llamar a la función para agregar un libro nuevo
addBook(
    3,
    "Don Quijote",
    "Miguel de Cervantes",
    "España",
    500,
    1605,
    "Novela"
);
