
let songBody = document.querySelector("#song-list-body")

songBody.innerHTML = songs.map((v) => {

    return `
   
    <div class="song-list-item ">
                <div class="song-image">song image</div>
                <p>${v.name}</p>
            </div>

    `
   
})