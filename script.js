// const API_KEY = "2f4cff71";
// const input = document.getElementById("moviename")
// const button = document.getElementById("fetchbtn")
// const info = document.getElementById("info")
// const poster = document.getElementById("poster")
// const errorEl = document.getElementById("info")

// const showError = (msg) => {
//     errorEl.textContent = msg
// };

// const clearUI = () => {
//     showError("");
//     poster.style.display = "none";
//     info.innerHTML = "";
// };

// async function fetchMovie() {
//     clearUI();
//     const name = input.value.trim();
//     if (!name) {
//         showError("please enter a movie name")
//         return;
//     }
//     const url = `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(name)}&plot=short`

//     try {
//         const res = await fetch(url, { cache: "no-store" });
//         const text = await res.text();

//         let data;
//         try {
//             data = JSON.parse(text)
//         }
//         catch {
//             throw new Error("bad response");
//         }
//         if (!res.ok || data.Response === "False") {
//             throw new Error(data.Error || `HTTP ${res.status}`)
//         }
//         if (data.Poster && data.Poster !== "N/A") {
//             poster.src = data.Poster;
//             poster.style.display = "block";
//         }

//         info.innerHTML = `
//           <strong>${data.Title || "-"}</strong> (${data.Year || "-"})<br>
//           IMDB: ${data.imdbRating || "-"}<br>
//            Genre: ${data.Genre || "-"}<br>
//             Language: ${data.Language || "-"}<br>
//              Plot: ${data.Plot || "-"}<br>
//           `
//     }
//     catch (err) {
//         showError(err.message || "something went wrong");
//         console.log(err)
//     }
// }


// input.addEventListener("keydown", (e) => e.key === "Enter" && fetchMovie());

const API_KEY = "2f4cff71";
const input = document.getElementById("moviename");
const button = document.getElementById("fetchbtn");
const info = document.getElementById("info");
const poster = document.getElementById("poster");
const errorEl = document.getElementById("error");

const showError = (msg) => {
    errorEl.textContent = msg;
};

const clearUI = () => {
    errorEl.textContent = "";
    poster.style.display = "none";
    info.innerHTML = "";
};

async function fetchMovie() {
    clearUI();
    const name = input.value.trim();
    if (!name) {
        showError("Please enter a movie name");
        return;
    }
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(name)}&plot=short`;

    try {
        const res = await fetch(url, { cache: "no-store" });
        const text = await res.text();

        let data;
        try {
            data = JSON.parse(text);
        } catch {
            throw new Error("Bad response from server");
        }
        
        if (data.Response === "False") {
            throw new Error(data.Error || "Movie not found");
        }
        
        if (data.Poster && data.Poster !== "N/A") {
            poster.src = data.Poster;
            poster.style.display = "block";
        } else {
            poster.style.display = "none";
        }

        info.innerHTML = `
            <strong>${data.Title || "-"}</strong> (${data.Year || "-"})<br>
            IMDB: ${data.imdbRating || "-"}<br>
            Genre: ${data.Genre || "-"}<br>
            Language: ${data.Language || "-"}<br>
            Plot: ${data.Plot || "-"}<br>
        `;
    } catch (err) {
        showError(err.message || "Something went wrong");
        console.error(err);
    }
}

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        fetchMovie();
    }
});