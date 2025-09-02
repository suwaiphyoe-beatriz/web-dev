import Book from './Book';
import booksData from './booksData';
import './Book.css';

function App() {
  return (
    <div className="App">
      <h1>Book List</h1>
      <div className="book-list">
        {booksData.map((book) => (
          <Book book={book} />
        ))}
      </div>
    </div>
  );
}

export default App;