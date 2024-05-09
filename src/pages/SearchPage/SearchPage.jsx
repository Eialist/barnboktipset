import { useState, useEffect } from "react";
import "./search-page.css";
import ratingIcon from "../../assets/icons/star.png";
import Navbar from "../../components/Navbar/Navbar";
import goblin from "../../assets/images/avatars/a1.png";
import avatar from "../../assets/images/avatars/a2.png";
import chick from "../../assets/images/avatars/a3.png";
import ghosty from "../../assets/images/avatars/a4.png";
import yellow from "../../assets/images/avatars/a5.png";
import girl from "../../assets/images/avatars/a6.png";
import hoodie from "../../assets/images/avatars/a7.png";
import blueBear from "../../assets/images/avatars/a8.png";
import drake from "../../assets/images/avatars/a9.png";
import pip from "../../assets/images/avatars/a10.png";
import a11 from "../../assets/images/avatars/a11.png";
import a12 from "../../assets/images/avatars/a12.png";
import a13 from "../../assets/images/avatars/a13.png";
import a14 from "../../assets/images/avatars/a14.png";
import a15 from "../../assets/images/avatars/a15.png";
import a16 from "../../assets/images/avatars/a16.png";
import a17 from "../../assets/images/avatars/a17.png";
import a18 from "../../assets/images/avatars/a18.png";
import a19 from "../../assets/images/avatars/a19.png";
import a20 from "../../assets/images/avatars/a20.png";
import a21 from "../../assets/images/avatars/a21.png";
import a22 from "../../assets/images/avatars/a22.png";
import a23 from "../../assets/images/avatars/a24.png";
import a24 from "../../assets/images/avatars/a25.png";
import { useNavigate } from "react-router-dom";

const avatarImages = {
  goblin: goblin,
  avatar: avatar,
  chick: chick,
  ghosty: ghosty,
  yellow: yellow,
  girl: girl,
  hoodie: hoodie,
  blueBear: blueBear,
  drake: drake,
  pip: pip,
  a11: a11,
  a12: a12,
  a13: a13,
  a14: a14,
  a15: a15,
  a16: a16,
  a17: a17,
  a18: a18,
  a19: a19,
  a20: a20,
  a21: a21,
  a22: a22,
  a23: a23,
  a24: a24,
};

const SearchPage = () => {
  const [library, setLibrary] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [reviews, setReviews] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const navigate = useNavigate();

  let user = sessionStorage.getItem("userInfo");
  user = JSON.parse(user);
  console.log(user);

  useEffect(() => {
    const fetchBooks = async () => {
      let res = await fetch("/api/getBooks", {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });

      let data = await res.json();
      setLibrary(data);
      console.log(data);
    };
    fetchBooks();
  }, []);

  const countRating = (rating) => {
    if (rating.length === 0) {
      return 0;
    } else {
      let score = rating;

      const countedScore = score.reduce((acc, score) => {
        acc[score] = (acc[score] || 0) + 1;
        return acc;
      }, {});

      const mostOccuringScore = Object.keys(countedScore).reduce((a, b) =>
        countedScore[a] > countedScore[b] ? a : b
      );
      return mostOccuringScore;
    }
  };

  const handleFilterByGenre = (genre) => {
    setSelectedGenre(genre);
  };

  const fetchReviews = async (id) => {
    console.log(id);
    let res = await fetch("/api/getBook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookId: id }),
    });
    let data = await res.json();
    setReviews(data);
    setSelectedBookId(id);
  };

  const setCurrentRead = async (userId, bookId) => {
    console.log(userId, bookId);
    let res = await fetch("/api/currentRead", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId, bookId: bookId }),
    });
    let data = await res.json();
    console.log(data);
    navigate("/user");
  };

  return (
    <>
      <Navbar props={"search"} />
      <div className="book-card-container container fade-container">
        <div className="book-search-container">
          <input
            className="book-search"
            placeholder="Sök efter bok"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="book-btn-container d-flex flex-wrap">
          <button
            className="btn btn-dark m-1"
            onClick={() => handleFilterByGenre(null)}>
            Alla böcker
          </button>
          <button
            className="btn btn-dark m-1"
            onClick={() => handleFilterByGenre("Fantasy")}>
            Fantasy
          </button>
          <button
            className="btn btn-dark m-1"
            onClick={() => handleFilterByGenre("Äventyr")}>
            Äventyr
          </button>
          <button
            className="btn btn-dark m-1"
            onClick={() => handleFilterByGenre("Ung vuxen")}>
            Ung vuxen
          </button>
          <button
            className="btn btn-dark m-1"
            onClick={() => handleFilterByGenre("Barn")}>
            Barn
          </button>
          <button
            className="btn btn-dark m-1"
            onClick={() => handleFilterByGenre("Rysare")}>
            Rysare
          </button>
        </div>
        {library
          .filter((book) => {
            if (selectedGenre === null || book.genre === selectedGenre) {
              return (
                book.title.toLowerCase().includes(query.toLowerCase()) ||
                book.author.toLowerCase().includes(query.toLowerCase())
              );
            }
            return false;
          })
          .map((book) => (
            <div key={book._id} className="card">
              <div className="card-body book-cards">
                <img src={book.img} alt={`${book.title} cover`} />
                <div
                  className="book-text-container"
                  onClick={() => fetchReviews(book._id)}>
                  <p className="book-title">{book.title}</p>
                  <p className="book-author">{book.author}</p>
                  <p className="book-text">{book.description}</p>
                  <div className="book-info-container">
                    <p>
                      {countRating(book.rating)}
                      <img
                        className="book-card-rating-icon"
                        src={ratingIcon}
                        alt=""
                      />
                    </p>
                    <p className="ml mr-1">{book.genre}</p>
                    <p className="ml mr-1">{book.pages} sidor</p>
                    <p className="ml mr-1">{book.year}</p>
                  </div>
                </div>
                {user ? (
                  <button
                    className="btn book-btn btn-dark"
                    style={{ padding: "5px 12px", height: "40px" }}
                    onClick={() => setCurrentRead(user.userId, book._id)}>
                    Läser
                  </button>
                ) : (
                  false
                )}
              </div>
              {selectedBookId === book._id && (
                <div>
                  <span className="book-review-title">Kommentarer</span>
                  {reviews.map((review) => (
                    <div key={review._id} className="book-review">
                      <span className="avatar-container">
                        <img
                          src={
                            !review.userAvatar
                              ? avatar
                              : avatarImages[review.userAvatar]
                          }
                          alt=""
                          className="book-review-avatar"
                        />
                      </span>
                      <div className="book-review-text-container">
                        <p>{review.username}</p>
                        <p>{review.reviewText}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default SearchPage;
