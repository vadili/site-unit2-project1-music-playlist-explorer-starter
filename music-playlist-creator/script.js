
document.addEventListener("DOMContentLoaded", function() {
    const playlistContainer = document.getElementById("playlist-cards");
    const cardTemplate = document.getElementById("playlist-card-template").content;

    data.playlists.forEach(playlist => {
        let count = playlist.likeCount
        console.log(count)
        const card = document.importNode(cardTemplate, true);
        
        card.querySelector(".playlist-cover").style = `background-image: url(${playlist.playlist_art})`;
        card.querySelector(".playlist-name").textContent = playlist.playlist_name;
        card.querySelector(".playlist-creator").textContent = `By: ${playlist.playlist_creator}`;
        const likeCount = card.querySelector(".like-count");
        const likeButton = card.querySelector(".like-button");
        likeCount.textContent = count;

        // Add event listener to the playlist cover
        card.querySelector(".playlist-cover").addEventListener("click", function() {
            displaySongs(playlist);
            modalOverlay.style.display = "flex"
        });
        likeButton.addEventListener("click", function() {
            count++;
            likeCount.textContent = count;
            likeButton.classList.add('liked');
            likeButton.classList.add('fa-solid');
            likeButton.classList.remove('fa-beat');
            // You can also update the playlist object if needed
            playlist.likeCount = count;
        });

        // delete playlist
        const deleteButton = card.querySelector('.delete-button');
        
        deleteButton.addEventListener('click', (event) => {
            console.log(card);
            event.stopPropagation();
            console.log("delete");
            card.remove();
        });
        playlistContainer.appendChild(card);
    });

    playlistContainer.appendChild(card);
});
const modalOverlay = document.querySelector(".modal-overlay");

const modalContent = document.querySelector(".modal-content");

    // Add event listener to the modal overlay to hide it when clicked
window.addEventListener('click', (event)=>{
    if (event.target === modalOverlay){
        modalOverlay.style.display = "none";
    }
})

// Example of the showModal function
function displaySongs(playlist){

        // Clear existing content
        modalContent.innerHTML = '';

        // Create modal heading
        const modalHeading = document.createElement("div");
        const heading = document.createElement("div");
        
        modalHeading.className = "modal-heading";
        heading.className = "heading";

        const img = document.createElement("img");
        const button = document.createElement("button");
        img.src = playlist.playlist_art;
        img.addEventListener("click", ()=>{
            window.location.href = 'featured.html'
        })
        button.textContent = 'Shuffle'
        button.addEventListener("click", function() {
            shuffleSongs(playlist.songs);
            // Update the modal content if the modal is open
            if (modalOverlay.style.display === "flex") {
                displaySongs(playlist);
            }
        });
        heading.appendChild(img);
        heading.appendChild(button);
        const playlistInfo = document.createElement("div");
        playlistInfo.className = "playlist-info";

        const h3 = document.createElement("h3");
        h3.textContent = playlist.playlist_name;

        const h5 = document.createElement("h5");
        h5.textContent = `Created by ${playlist.playlist_creator}`;

        playlistInfo.appendChild(h3);
        playlistInfo.appendChild(h5);
        modalHeading.appendChild(heading)
        modalHeading.appendChild(playlistInfo);
        modalContent.appendChild(modalHeading);

        // Create song cards
        const songCards = document.createElement("div");
        songCards.className = "song-cards";

        playlist.songs.forEach(song => {
            const songCard = document.createElement("div");
            songCard.className = "song";

            const songInfoContainer = document.createElement("div");
            songInfoContainer.className = "song-info-container";

            const songImg = document.createElement("img");
            songImg.src = song.cover_art ;

            const songInfo = document.createElement("div");
            songInfo.className = "song-info";

            const songTitle = document.createElement("p");
            songTitle.className = "song-title";
            songTitle.textContent = song.title;

            const artistName = document.createElement("p");
            artistName.textContent = song.artist;

            const albumName = document.createElement("p");
            albumName.textContent = song.album;

            songInfo.appendChild(songTitle);
            songInfo.appendChild(artistName);
            songInfo.appendChild(albumName);
            songInfoContainer.appendChild(songImg);
            songInfoContainer.appendChild(songInfo);

            const songDuration = document.createElement("span");
            songDuration.textContent = song.duration;

            songCard.appendChild(songInfoContainer);
            songCard.appendChild(songDuration);
            songCards.appendChild(songCard);
        });
        

        modalContent.appendChild(songCards);
}

function toggleModal() {
    //     const modal = document.querySelector(".modal-content");
//     modal.innerHTML = " ";
//     const modalHeading = document.createElement("div")
//     modalHeading.classList.add("modal-heading");
    
//     modalHeading.innerHTML = `
//     <img src ="${playlist.playlist_art}">

//     <div class="playlist-info">
//         <h3>${playlist.playlist_name}</h3>
//         <h5>Created by ${playlist.playlist_creator}</h5>

//     </div>
//     <span class = "close">&times</span>
    
//     `;

//     modal.appendChild(modalHeading)
//     modal.innerHTML += "<button class='btn'> Shuffle </button>"

//     const shuffleButton = document.querySelector('.btn');
//     shuffleButton.addEventListener('click', () => {

//     const shuffledSongs = shuffleArray(playlist.songs);
//     playlist.songs = shuffledSongs;
//     })
//     const songCards = document.querySelector(".song-cards");
//     songCards.innerHTML = "";
//     shuffledSongs.forEach(song => {
//         const song_det = document.createElement("div");
//         song_det.classList.add("song");
//         song_det.innerHTML = `
//             <img src = ${song.cover-art}>
//             <div class = "song-info">
//                 <p class = "song-title">${song.title}</p>
//                 <p>${song.artist}</p>
//                 <p>${song.album}</p>
//             </div>
//             <div class ="duration">
//                 <p> ${song.duration}</p>
//             </div>
//         `;
//         songCards.appendChild(song_det);
//     });
    // Implement the logic to show a modal with the playlist songs
    console.log(songs);  // For demonstration purposes, log the songs to the console
}

document.addEventListener('DOMContentLoaded', function() {
});
const likeButton = document.getElementById('like-button');
const likeCount = document.getElementById('like-count');
let isLiked = false;
let count = 0;

function shuffleSongs(songs) {
    for (let i = songs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [songs[i], songs[j]] = [songs[j], songs[i]];
    }
}

