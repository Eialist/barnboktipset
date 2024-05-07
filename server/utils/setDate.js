const monthsOfTheYear = [
    "januari",
    "februari",
    "mars",
    "april",
    "maj",
    "juni",
    "juli",
    "augusti",
    "september",
    "oktober",
    "november",
    "december",
];


const getTime = () => {
    let currentDay = new Date();
    let date = currentDay.getDate();
    let month = monthsOfTheYear[currentDay.getMonth()];
    // let hour = currentDay.getHours();
    let year = currentDay.getFullYear();
    // let minutes = currentDay.getMinutes();
    // minutes = minutes < 10 ? "0" + minutes : minutes;
    let todaysDate =
        date + " " + month + " " + year
    return todaysDate;
};

export default getTime;