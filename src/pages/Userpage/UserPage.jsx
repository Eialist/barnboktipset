import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./user-page.css";
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
// import question from "../../assets/icons/question.png";
import changeImg from "../../assets/icons/change-img.png";
import { useFilterGenre } from "../../hooksAndUtils/useFilterGenre";
import { useSetUserTitle } from "../../hooksAndUtils/useSetUserTitle";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const [user, setUser] = useState({});
  const [active, setActive] = useState(false);
  const [review, setReview] = useState("");
  const [bookScore, setBookScore] = useState();
  const [avatarLibrary, setAvatarLibrary] = useState(false);
  const [userAvatar, setUserAvatar] = useState("");
  // const [nextXPReward, setNextXPReward] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const credentials = sessionStorage.getItem("userInfo");

      let headersList = { "Content-Type": "application/json" };
      let bodyContent = credentials;

      let res = await fetch("/api/auth/login", {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      });

      let data = await res.json();
      setUser(data);
      console.log(data);
    };
    fetchUser();
  }, []);

  const postReview = async () => {
    try {
      let headersList = { "Content-Type": "application/json" };
      let bodyContent = JSON.stringify({
        userId: user._id,
        bookId: user.currentRead[0].bookId,
        reviewText: review,
        bookScore: parseInt(bookScore),
        points: user.points,
      });
      console.log(bodyContent);

      let res = await fetch("/api/postReview", {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      if (res.ok) {
        navigate("/user");
      }

      let data = await res.json();
      console.log(data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handlePostReview = async () => {
    await postReview();
  };

  const countReadPages = (user) => {
    if (user && user.library && Array.isArray(user.library)) {
      return user.library.reduce((total, book) => {
        if (book && typeof book.pages === "number") {
          return total + book.pages;
        } else {
          return total;
        }
      }, 0);
    } else {
      return 0;
    }
  };
  const totalNoOfPages = countReadPages(user);

  let genreArray = [];
  const getMostCommonGenre = () => {
    if (user && user.library && Array.isArray(user.library)) {
      user.library.forEach((book) => {
        genreArray.push(book.genre);
      });
    }
  };
  getMostCommonGenre();

  const handleAvatarChange = async () => {
    let headersList = { "Content-Type": "application/json" };
    let bodyContent = JSON.stringify({
      userId: user._id,
      avatar: userAvatar,
    });
    console.log(bodyContent);

    let res = await fetch("/api/avatar", {
      method: "PATCH",
      body: bodyContent,
      headers: headersList,
    });

    let data = await res.json();
    console.log(data);
    location.reload();
  };

  let xpBarStyle, xpBarFilledStyle, lvl;
  const XPbar = (user) => {
    const lvlRange = 500;
    const maxPoints = 500;
    lvl = Math.ceil(user.points / lvlRange);

    const filledWidth = (user.points % maxPoints) * (100 / maxPoints);

    xpBarStyle = {
      width: "380px",
      height: "15px",
      backgroundColor: "#ddd",
      border: "1px solid #333",
      borderRadius: "15px",
    };

    xpBarFilledStyle = {
      width: `${filledWidth}%`,
      height: "100%",
      // backgroundImage: `url(${mana})`,
      backgroundColor: "green",
    };
  };

  XPbar(user);

  const avatars = {
    1: { name: "hoodie", img: hoodie, unlocked: lvl >= 0 },
    2: { name: "chick", img: chick, unlocked: lvl >= 0 },
    3: { name: "blueBear", img: blueBear, unlocked: lvl >= 0 },
    4: { name: "avatar", img: avatar, unlocked: lvl >= 0 },
    5: { name: "ghosty", img: ghosty, unlocked: lvl >= 0 },
    6: { name: "drake", img: drake, unlocked: lvl >= 0 },
    7: { name: "goblin", img: goblin, unlocked: lvl >= 1 },
    8: { name: "yellow", img: yellow, unlocked: lvl >= 1 },
    9: { name: "girl", img: girl, unlocked: lvl >= 2 },
    10: { name: "pip", img: pip, unlocked: lvl >= 2 },
    11: { name: "a11", img: a11, unlocked: lvl >= 3 },
    12: { name: "a12", img: a12, unlocked: lvl >= 3 },
    13: { name: "a13", img: a13, unlocked: lvl >= 4 },
    14: { name: "a14", img: a14, unlocked: lvl >= 4 },
    15: { name: "a15", img: a15, unlocked: lvl >= 5 },
    16: { name: "a16", img: a16, unlocked: lvl >= 5 },
    17: { name: "a17", img: a17, unlocked: lvl >= 6 },
    18: { name: "a18", img: a18, unlocked: lvl >= 6 },
    19: { name: "a19", img: a19, unlocked: lvl >= 7 },
    20: { name: "a20", img: a20, unlocked: lvl >= 7 },
    21: { name: "a21", img: a21, unlocked: lvl >= 8 },
    22: { name: "a22", img: a22, unlocked: lvl >= 8 },
    23: { name: "a23", img: a23, unlocked: lvl >= 9 },
    24: { name: "a24", img: a24, unlocked: lvl >= 9 },
    // Add more avatars as needed
  };

  const selectedAvatarIndex = Object.keys(avatars).find(
    (key) => avatars[key].name === user.avatar
  );

  return (
    <>
      <Navbar props={"profile"} />
      <div className="user-container container">
        <div className="user-info-card">
          <div className="card-body d-flex p-4 pb-2 pt-2">
            <div className="user-avatar-card d-flex flex-column align-items-center">
              <div className="position-relative">
                <img
                  src={!user.avatar ? avatar : avatars[selectedAvatarIndex].img}
                  alt=""
                  width={110}
                  // height={130}
                  onClick={() => setAvatarLibrary((prevState) => !prevState)}
                />
                <img
                  src={changeImg}
                  alt=""
                  width={20}
                  style={{ position: "absolute", bottom: 0, right: "-3%" }}
                />
              </div>
              <div className="user-info-text-container">
                <h2>{user.username}</h2>
                <p className="user-title">
                  {useSetUserTitle(user)}{" "}
                  {/* <img src={question} alt="" width={13} /> */}
                </p>
              </div>
            </div>
            <div className="user-info-stats-container ml-4 mt-2">
              <p>Stats</p>
              <p>Lästa böcker: {user.library && user.library.length}</p>
              <p>Sidor lästa: {totalNoOfPages}</p>
              <p>Favoritgenre: {useFilterGenre(genreArray)}</p>
              <p>Medlem sedan: {user.createdDate}</p>
              <p>Poäng samlade: {user.points}</p>
              <p>Level: {lvl}</p>
            </div>
          </div>
          <div className="user-xp-container mb-0 mt-0">
            <div style={xpBarStyle} className="m-auto d-flex position-relative">
              <p
                style={{
                  position: "absolute",
                  fontSize: "7px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  left: 0,
                  right: 0,
                  paddingTop: ".3em",
                  textAlign: "center",
                }}>
                XP-bar
              </p>
              <div style={xpBarFilledStyle}></div>
            </div>
          </div>
          {avatarLibrary ? (
            <div className="p-1">
              <h2 className="text-center mt-3">Byt avatar</h2>
              <hr />
              <div className="d-flex flex-wrap justify-content-center">
                {Object.values(avatars).map((avatar, index) => (
                  <div key={index} className="avatar-library p-2">
                    <img
                      src={avatar.img}
                      alt={avatar.name}
                      height={60}
                      style={{
                        display: "block",
                        opacity: avatar.unlocked ? 1 : 0.5,
                        filter: avatar.unlocked ? "none" : "grayscale(100%)",
                      }}
                      onClick={
                        lvl === avatar.unlocked
                          ? () => setUserAvatar(user.avatar)
                          : () => setUserAvatar(avatar.name)
                      }
                    />
                  </div>
                ))}
                <div>
                  <br />
                </div>
              </div>
              <button
                className="btn btn-dark m-3 mb-0"
                onClick={() => handleAvatarChange()}>
                Byt Avatar
              </button>
            </div>
          ) : (
            false
          )}
        </div>
        <div className="p-2">
          <div className="mt-2 mb-3">
            <h3>Läser just nu</h3>
            {user.currentRead && user.currentRead.length == 0 ? (
              <div className="d-flex flex-column align-items-center bg-light p-2 rounded">
                <p className="h4 pb-1">Du läser ingen bok just nu!</p>
                <button
                  className="btn btn-dark"
                  onClick={() => navigate("/search")}>
                  Hitta ny bok
                </button>
              </div>
            ) : (
              user.currentRead &&
              user.currentRead.map((book) => (
                <div key={book.title} className="d-flex flex-column">
                  <div
                    className="d-flex user-read-card"
                    style={{ overflow: "hidden" }}>
                    <img
                      src={book.img}
                      alt={book.title}
                      className="user-read-img"
                    />
                    <div className="user-read-text-container d-flex flex-column justify-content-between m-1">
                      <p className="user-read-title">{book.title}</p>
                      <p className="user-read-text">{book.description}</p>
                      <div className="d-flex justify-content-between">
                        <p>{book.author}</p>
                        <p>{book.genre}</p>
                        <p>{book.pages} sidor</p>
                      </div>
                    </div>
                    <button
                      className="btn btn-dark user-review-btn"
                      onClick={() => setActive((prevState) => !prevState)}>
                      Skriv recension
                    </button>
                  </div>

                  <div>
                    {active ? (
                      <form>
                        <div className="form-group">
                          <label htmlFor="reviewText">
                            Vad tyckte du om boken?
                          </label>
                          <textarea
                            className="form-control"
                            id="reviewText"
                            rows="3"
                            onChange={(e) =>
                              setReview(e.target.value)
                            }></textarea>
                          <label>Betyg mellan 1 och 5. 5 = Jättebra!</label>
                          <input
                            type="text"
                            maxLength={1}
                            style={{ width: "40px" }}
                            onChange={(e) => setBookScore(e.target.value)}
                          />
                          <button
                            className="btn btn-dark user-send-review-btn mt-1"
                            onClick={() => handlePostReview()}>
                            Skicka
                          </button>
                        </div>
                      </form>
                    ) : (
                      false
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="">
            <h3>Bibliotek</h3>
            <div
              style={{
                display: "flex",
                flex: "wrap",
                overflow: "scroll",
                backgroundColor: "rgba(19,51,58, 0.8)",
                padding: ".5em 0",
              }}>
              {user.library &&
                user.library.map((book) => (
                  <span key={book.title} className="mr-2">
                    <img
                      src={book.img}
                      alt=""
                      width={65}
                      height={100}
                      style={{ borderRadius: ".15em" }}
                    />
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
