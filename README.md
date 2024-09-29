Library Management System - Frontend
This project is a web application designed for library management, allowing users to handle operations such as managing books, authors, publishers, and categories, as well as handling book borrowing and return processes. This documentation focuses on the frontend part of the system, built with React, and explains its setup, features, and structure.

Technologies Used
React: For building the user interface.
Material-UI: For modern UI components.
Axios: For handling HTTP requests.
React-Router: For routing and navigation.
React Hooks: For state management and lifecycle methods.
Node.js & npm: For package management and development tools.
Setup Instructions
1. Clone the Repository
bash

git clone https://github.com/gorbadil/LibraryAppReact.git
cd LibraryAppReact
2. Install Dependencies
bash

npm install
3. Start the Project
bash

npm start
By default, the application will run at http://localhost:3000.

Features
Manage Books: Add, update, or delete books along with their stock, publication year, and associated categories, authors, and publishers.
Manage Authors: Add, update, or delete authors with details such as name, birthdate, and country.
Manage Publishers: Add, update, or delete publishers with details like name, establishment year, and address.
Manage Categories: Add, update, or delete categories with name and description.
Book Borrowing: Handle book borrowing and return processes with borrower details, borrowing and return dates.
Frontend Structure
The frontend project is structured into several components for easier management:

Pages:

BooksPage.js: Displays a list of books, allows adding, editing, and deleting books.
AuthorsPage.js: Displays a list of authors, allows adding, editing, and deleting authors.
CategoriesPage.js: Displays a list of categories, allows adding, editing, and deleting categories.
PublishersPage.js: Displays a list of publishers, allows adding, editing, and deleting publishers.
BorrowsPage.js: Displays book borrow records, allows adding and managing borrow operations.
Components:

BookForm.js, AuthorForm.js, etc.: Reusable form components for adding and editing records.
NavBar.js: Navigation bar for easy access between different sections of the system.
Table.js: Generic table component for displaying lists of items with actions like edit and delete.
APIs:

Axios is used to interact with the backend RESTful API. Example endpoints include:
/api/v1/books
/api/v1/authors
/api/v1/categories
/api/v1/publishers
/api/v1/borrows
State Management:

Each page uses React's useState and useEffect hooks to manage local state and fetch data from the API.
Axios is used to make GET, POST, PUT, and DELETE requests to the backend API for each resource.
API Endpoints (For Frontend Integration)
Here are the key API endpoints that the frontend interacts with:

Authors
Endpoint	HTTP Method	Description
/api/v1/authors/{id}	GET	Fetch author by ID
/api/v1/authors/{id}	PUT	Update author by ID
/api/v1/authors/{id}	DELETE	Delete author by ID
/api/v1/authors	GET	Fetch all authors
/api/v1/authors	POST	Add a new author
Publishers
Endpoint	HTTP Method	Description
/api/v1/publishers/{id}	GET	Fetch publisher by ID
/api/v1/publishers/{id}	PUT	Update publisher by ID
/api/v1/publishers/{id}	DELETE	Delete publisher by ID
/api/v1/publishers	GET	Fetch all publishers
/api/v1/publishers	POST	Add a new publisher
Categories
Endpoint	HTTP Method	Description
/api/v1/categories/{id}	GET	Fetch category by ID
/api/v1/categories/{id}	PUT	Update category by ID
/api/v1/categories/{id}	DELETE	Delete category by ID
/api/v1/categories	GET	Fetch all categories
/api/v1/categories	POST	Add a new category
Books
Endpoint	HTTP Method	Description
/api/v1/books/{id}	GET	Fetch book by ID
/api/v1/books/{id}	PUT	Update book by ID
/api/v1/books/{id}	DELETE	Delete book by ID
/api/v1/books	GET	Fetch all books
/api/v1/books	POST	Add a new book
Borrowing
Endpoint	HTTP Method	Description
/api/v1/borrows/{id}	GET	Fetch borrow record by ID
/api/v1/borrows/{id}	PUT	Update borrow record by ID
/api/v1/borrows/{id}	DELETE	Delete borrow record by ID
/api/v1/borrows	GET	Fetch all borrow records
/api/v1/borrows	POST	Add a new borrow record
How to Use the Frontend
Navigating the App:

The navigation bar allows you to quickly switch between the Books, Authors, Publishers, Categories, and Borrows sections.
CRUD Operations:

Each section allows you to create, update, and delete records. Forms are used for adding or editing, and tables display the current records in the system.
Book Borrowing:

In the "Borrows" section, you can manage the borrowing and return process for books. This section is directly linked with the book and borrower data.
