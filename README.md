# BookShelf - Online Book Reading Platform

A beginner-friendly full-stack app for a university assignment. Users can add books, browse the library, read a book, edit it and delete it.

- **Frontend:** React (Vite), React Router, one CSS file, Fetch API
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose

Data flow: `React -> Express API -> MongoDB -> Express API -> React`

To understand and explain the code, read **STUDY_NOTES.txt**.

## Project structure

```text
book-reading-platform/
├── backend/
│   ├── config/db.js          MongoDB connection
│   ├── models/Book.js        Mongoose schema and model
│   ├── routes/bookRoutes.js  The 5 CRUD routes
│   ├── server.js             Starts Express
│   ├── .env.example          Example settings (copy to .env)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/       Navbar.jsx, BookCard.jsx
│   │   ├── pages/            Home, BookDetails, AddBook, EditBook
│   │   ├── App.jsx           Routes
│   │   ├── main.jsx          Entry point
│   │   └── style.css         All styling
│   ├── index.html
│   └── package.json
├── STUDY_NOTES.txt
└── README.md
```

## 1. What you need installed

- **Node.js 18 or newer** (20 LTS recommended) - check with `node -v`
- **MongoDB 4.2 or newer** (local MongoDB Community Server, or a free MongoDB Atlas cluster)

## 2. Set up MongoDB

Pick ONE option.

**Option A - Local MongoDB**
1. Install MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Make sure it is running (on most systems it starts as a service). It listens on `127.0.0.1:27017`.
3. You do not need to create the database or collection by hand. Mongoose creates the `bookshelf` database and the `books` collection when you add the first book.

**Option B - MongoDB Atlas (cloud)**
1. Create a free cluster at https://www.mongodb.com/atlas
2. Create a database user and allow your IP address under "Network Access".
3. Click "Connect" -> "Drivers" and copy the connection string. Put your own username and password in it and add the database name `bookshelf` before the `?`.

## 3. Configure the backend `.env` file

```bash
cd backend
cp .env.example .env        # on Windows PowerShell: copy .env.example .env
```

Open `backend/.env` and check the values:

```text
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/bookshelf
```

For Atlas, replace `MONGODB_URI` with your Atlas connection string. The `.env` file is listed in `.gitignore`, so it is never uploaded to GitHub. Never put the connection string in the frontend code.

## 4. Install and start the backend

```bash
cd backend
npm install
npm start
```

You should see:

```text
MongoDB connected
Server running on http://localhost:5000
```

Open http://localhost:5000 - it should say "BookShelf API is running".
Open http://localhost:5000/api/books - it should show `[]` (an empty list) until you add books.

## 5. Install and start the frontend

Open a **second terminal** (leave the backend running):

```bash
cd frontend
npm install
npm run dev
```

Open the address Vite prints, normally http://localhost:5173

## 6. Test all CRUD operations

| Operation | What to do in the browser | What you should see |
|---|---|---|
| **Create** | Click "Add New Book", fill in the form (title, author and content are required), click "Save Book" | You return to the library and the new book card appears |
| **Read all** | Open "Home" or "Explore Books" | Every saved book is shown as a card. Refresh the page: the books are still there (they come from MongoDB) |
| **Read one** | Click "Read Book" on a card | The reading page shows the cover, title, author, genre and the full content. The URL looks like `/book/<id>` |
| **Update** | Click "Edit" (on a card or on the reading page), change something, click "Update Book" | You return to the reading page and see the changes |
| **Delete** | Click "Delete" on a card | The card disappears. Refresh: it stays gone |

You can also test the API without React, for example:

```bash
curl http://localhost:5000/api/books
curl -X POST http://localhost:5000/api/books -H "Content-Type: application/json" -d '{"title":"Test","author":"Me","content":"Hello"}'
```

## API summary

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/books` | Get all books (without the long content) |
| GET | `/api/books/:id` | Get one book (with content) |
| POST | `/api/books` | Create a book |
| PUT | `/api/books/:id` | Update a book |
| DELETE | `/api/books/:id` | Delete a book |

## Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `MongoDB connection failed` | MongoDB is not running, or `MONGODB_URI` in `.env` is wrong. For Atlas, check the password and the IP allow-list |
| `MONGODB_URI is missing` | You did not create `backend/.env` (copy it from `.env.example`) |
| Page says "Could not reach the server" | The backend is not running, or it uses a different port than `http://localhost:5000` |
| CORS error in the browser console | The backend must be running with `app.use(cors())` in `server.js` |
| `npm start` says "port already in use" | Change `PORT` in `.env`, and change `API_URL` in the four frontend files to the same port |
| Book changes do not show | Refresh the page and check the backend terminal for errors |
