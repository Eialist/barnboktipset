import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import getTime from './utils/setDate.js';
//and this path
import path from 'path';

dotenv.config();
const app = express();

//and these
import { fileURLToPath } from 'url';
import { dirname } from 'path';

//and these two 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/', express.static('dist'));

const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, console.log("client"));
let db = undefined;

app.use(express.json());

function fetchDb() {
    db = client.db("barnboktipset");
    return db;
}

//added this
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});


app.get("/api/users", async (req, res) => {
    let data = await fetchDb().collection("users").find().toArray();
    console.log(data);
    return res.send(data);
})

app.get("/api/getBooks", async (req, res) => {
    let data = await fetchDb().collection("books").find().toArray();
    console.log(data);
    return res.send(data);
})

app.post("/api/getBook", async (req, res) => {
    const { bookId } = req.body;
    console.log(bookId);
    const getBook = async (req, res) => {

        if (bookId == undefined) {
            return res.status(403).send({ error: "BokId saknas" })
        }
        try {
            const data = await fetchDb().collection("reviews").aggregate([
                {
                    $match: {
                        book: new ObjectId(bookId),
                    }
                },
                {
                    $lookup: {
                        from: "books",
                        localField: "book",
                        foreignField: "_id",
                        as: "books"
                    }
                },
                {
                    $unwind: "$books"
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "user",
                        foreignField: "_id",
                        as: "user"
                    }
                },
                {
                    $unwind: "$user"
                },
                {
                    $project: {
                        "_id": 1,
                        "reviewText": 2,
                        "bookScore": 3,
                        "username": "$user.username",
                        "userId": "$user._id",
                        "userAvatar": "$user.avatar",
                        "title": "$books.title",
                        "author": "$books.author",
                        "year": "$books.year",
                        "pages": "$books.pages",
                        "genre": "$books.genre",
                        "description": "$books.description",
                        "img": "$books.img",
                        "bookId": "$books._id",
                    }
                }
            ]).toArray();
            return res.send(data);
        }
        catch (error) {
            return res.status(403).send({ error: error.message });
        }
    }
    getBook(req, res);
})

app.post("/api/getLibrary", async (req, res) => {
    const { userId } = req.body;
    console.log(userId);
    const getUserLibrary = async (req, res) => {
        if (userId == undefined) {
            return res.status(403).send({ error: "BokId saknas" })
        }
        try {
            const data = await fetchDb().collection("users").aggregate([
                {
                    $match: {
                        _id: new ObjectId(userId),
                    }
                },
                {
                    $unwind: "$library"
                },
                {
                    $lookup: {
                        from: "books",
                        localField: "library.bookId",
                        foreignField: "_id",
                        as: "books"
                    }
                },
                {
                    $unwind: "$books"
                },
                {
                    $project: {
                        "title": "$books.title",
                        "author": "$books.author",
                        "genre": "$books.genre",
                        "description": "$books.description",
                        "img": "$books.img",
                        "bookId": "$books._id",
                    }
                }
            ]).toArray();
            return res.send(data);
        }
        catch (error) {
            return res.status(403).send({ error: error.message });
        }
    }
    getUserLibrary(req, res)
})

app.post("/api/auth/registerUser", async (req, res) => {
    const { username, password, secretword } = req.body;
    const registerUser = (req, res) => {
        console.log(req.body);

        if (username == undefined || password == undefined || secretword == undefined) {
            return res.status(403).send({ error: "Användarnamn, lösenord eller hemligtord saknas." });
        }
        try {
            const userCred = { username: username, password: password, secretword: secretword, createdDate: getTime(), title: "newbie", avatar: "", points: 50, currentRead: "", library: [] };
            console.log(userCred);
            fetchDb().collection("users").insertOne(userCred, { upsert: true })
            return res.status(200).send({ msg: 'Ny användare skapad' })
        }
        catch (error) {
            return res.status(403).send({ error: error.message });
        }
    }
    registerUser(req, res);
})
// getLibrary och getCurrentRead should be in this one. One end point for fetch user?
app.post("/api/auth/login", async (req, res) => {
    const { username, password } = req.body;
    let data;
    const fetchUser = async (req, res) => {
        console.log(req.body);

        if (username == undefined || password == undefined) {
            return res.status(403).send({ error: "Inloggningsuppgift saknas" });
        }
        try {
            data = await fetchDb().collection("users").findOne({ username: username, password: password });
            const library = await fetchDb().collection("users").aggregate([
                {
                    $match: {
                        _id: new ObjectId(data._id),
                    }
                },
                {
                    $unwind: "$library"
                },
                {
                    $lookup: {
                        from: "books",
                        localField: "library.bookId",
                        foreignField: "_id",
                        as: "books"
                    }
                },
                {
                    $unwind: "$books"
                },
                {
                    $project: {
                        "title": "$books.title",
                        "author": "$books.author",
                        "genre": "$books.genre",
                        "description": "$books.description",
                        "pages": "$books.pages",
                        "img": "$books.img",
                        "bookId": "$books._id",
                    }
                }
            ]).toArray();
            const currentRead = await fetchDb().collection("users").aggregate([
                {
                    $match: {
                        _id: new ObjectId(data._id),
                    }
                },
                {
                    $unwind: "$currentRead"
                },
                {
                    $lookup: {
                        from: "books",
                        localField: "currentRead",
                        foreignField: "_id",
                        as: "books"
                    }
                },
                {
                    $unwind: "$books"
                },
                {
                    $project: {
                        "title": "$books.title",
                        "author": "$books.author",
                        "genre": "$books.genre",
                        "description": "$books.description",
                        "img": "$books.img",
                        "pages": "$books.pages",
                        "bookId": "$books._id",
                    }
                }
            ]).toArray();
            data.currentRead = currentRead;
            data.library = library;
            if (!data) {
                return res.status(400).send({ error: "Fel användarnamn eller lösenord" })
            } else {
                return res.send(data);
            }
        }
        catch (error) {
            return res.status(403).send({ error: error.message });
        }
    }
    fetchUser(req, res);
})

app.patch("/api/postReview", async (req, res) => {
    const { userId, bookId, reviewText, bookScore, points } = req.body;
    //genre att lägga i en array och ta fram den vanligast förekommande genren. Favvo. 

    const handlePostReview = async (req, res) => {

        if (userId == undefined || bookId == undefined || reviewText == undefined || bookScore == undefined) {
            return res.status(403).send({ error: "Viktig information saknas för att kunna posta recenssionen" });
        }
        try {
            const reviewObject = { user: new ObjectId(userId), book: new ObjectId(bookId), reviewText: reviewText, bookScore: bookScore }
            const book = { $push: { ["library"]: { bookId: new ObjectId(bookId) } } };
            let newPoints = { $set: { points: points + 300 } }
            let addRating = { $push: { ["rating"]: bookScore } }
            await fetchDb().collection("reviews").insertOne(reviewObject, { upsert: true });
            await fetchDb().collection("users").updateOne({ _id: new ObjectId(userId) }, book, { upsert: true });
            await fetchDb().collection("users").updateOne({ _id: new ObjectId(userId) }, newPoints, { upsert: true });
            await fetchDb().collection("books").updateOne({ _id: new ObjectId(bookId) }, addRating, { upsert: true });
            await fetchDb().collection("users").updateOne({ _id: new ObjectId(userId) }, { $unset: { currentRead: "" } }, { upsert: true });
            console.log("ny recenssion skapad")
            return res.status(200).send({ msg: 'Ny recenssion skapad!' });
        }
        catch (error) {
            return res.status(403).send({ error: error.message })
        }
    }
    handlePostReview(req, res);
})

app.patch("/api/avatar", async (req, res) => {
    const { userId, avatar } = req.body;

    const changeAvatar = async (req, res) => {
        const updateAvatar = { $set: { avatar: avatar } };
        if (avatar == undefined || userId == undefined) {
            return res.status(400).send({ error: "Avatar saknas" });
        }
        try {
            await fetchDb().collection("users").updateOne({ _id: new ObjectId(userId) }, updateAvatar, { upsert: true })
            return res.status(200).send({ msg: "Avatar ändrad!" })
        }
        catch (error) {
            return res.status(403).send({ error: error.message })
        }
    }
    changeAvatar(req, res);
})

app.patch("/api/points", async (req, res) => {
    const { userId, points } = req.body;

    const setPoints = async (req, res) => {
        const updatePoints = { $set: { points: points } };

        if (points == undefined || userId == undefined) {
            res.status(400).send({ error: "Poäng saknas" });
        }
        try {
            await fetchDb().collection("users").updateOne({ _id: new ObjectId(userId) }, updatePoints, { upsert: true });
            return res.status(200).send({ msg: "Poäng tillagda!" });
        }
        catch (error) {
            return res.status(403).send({ error: error.message })
        }
    }
    setPoints(req, res);
})

app.patch("/api/currentRead", async (req, res) => {
    const { userId, bookId } = req.body;
    console.log(req.body);

    const setCurrentRead = async (req, res) => {
        const updateBook = { $set: { currentRead: new ObjectId(bookId) } };

        if (userId == undefined || bookId == undefined) {
            return res.status(400).send({ error: "Användare eller bok saknas" });
        }
        try {
            await fetchDb().collection("users").updateOne({ _id: new ObjectId(userId) }, updateBook, { upsert: true });
            return res.status(200).send({ msg: "Ny läsbok!" });
        }
        catch (error) {
            return res.status(403).send({ error: error.message })
        }
    }
    setCurrentRead(req, res);
})

app.patch("/api/updateLibrary", async (req, res) => {
    const { userId, bookId } = req.body;

    const setCurrentRead = async (req, res) => {
        const updateBook = { $set: { currentRead: new ObjectId(bookId) } };

        if (userId == undefined || bookId == undefined) {
            res.status(400).send({ error: "Användare eller bok saknas" });
        }
        try {
            await fetchDb().collection("users").updateOne({ _id: new ObjectId(userId) }, updateBook, { upsert: true });
            return res.status(200).send({ msg: "Ny läsbok!" });
        }
        catch (error) {
            return res.status(403).send({ error: error.message })
        }
    }
    setCurrentRead(req, res);
})



async function connectToDb() {
    try {
        await client.connect()
            .then(app.listen(PORT, () => {
                console.log("Listening on " + PORT);
            }))
    } catch (error) {
        console.log(error('Error connecting to database', error))
    }
}

connectToDb();
