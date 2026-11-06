import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import DiscoverPage from "./pages/DiscoverPage";
import BookshelfPage from "./pages/BookshelfPage";
import BookDetailsPages from "./pages/BookDetailsPage";
import DiscoverBookDetailsPage from "./pages/DiscoverBookDetailsPage";
import EditBookPage from "./pages/EditBookPage";
import NotFoundPage from "./pages/NotFoundPage";
import AddBookPage from "./pages/AddBookPage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bookshelf" element={<BookshelfPage />} />
        <Route path="/bookshelf/:bookId" element={<BookDetailsPages />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/discover/:workId" element={<DiscoverBookDetailsPage />} />
        <Route path="/bookshelf/:bookId/edit" element={<EditBookPage />} />
        <Route path="/discover/:workId/add" element={<AddBookPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
