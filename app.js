const app = () => {
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle")
    const video = document.querySelector(".vid-container video");

    const sounds = document.querySelectorAll(".sound-picker button");

    const timeDisplay = document.querySelector(".time-display");
    const timeSelect = document.querySelectorAll(".time-select button");
    const outlineLength = outline.getTotalLength();

    let fakeDuration = 900;
    let minutes = Math.floor(fakeDuration / 60);
    let seconds = Math.floor(fakeDuration % 60);
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    timeDisplay.textContent = `${minutes}:${seconds}`;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    sounds.forEach(sound => {
        sound.addEventListener("click", function () {
            // if (this.getAttribute("id") == "lluvia") {
                // document.getElementById("lluvia").style.display = "none";
                // document.getElementById("playa").style.display = "none";
                // document.getElementById("lluvia").style.opacity = "0.3";
                // document.getElementById("playa").style.opacity = "0.3";
                // document.querySelector(".sound-picker").innerHTML += `
                //  <button id="lluvia" data-sound="./sounds/lluvia4.mp3" data-video="./video/rain.mp4" data-stroke="#4972a1"><img src="./svg/rain.svg" alt="rain"></button>
                //  <button id="playa" data-sound="./sounds/beach.mp3" data-video="./video/beach.mp4" data-stroke="#a14f49"><img src="./svg/beach.svg" alt="beach"></button>`;
                // return;
            // }
            song.src = this.getAttribute("data-sound");
            video.src = this.getAttribute("data-video");
            outline.style.stroke = this.getAttribute("data-stroke");
            checkPlaying(song);
            // play.src = "./svg/play.svg"
        })
    })

    play.addEventListener("click", () => {
        checkPlaying(song);
    });

    timeSelect.forEach(option => {
        option.addEventListener("click", function () {
            fakeDuration = this.getAttribute("data-time");
            let seconds = Math.floor(fakeDuration % 60);
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${seconds}`
            song.currentTime = 0;
            timeSelect.forEach(option => {
                option.style.background = "none";
                option.style.color = "white";
            })
            option.style.background = "white";
            option.style.color = "black";
        });
    });

    const checkPlaying = song => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = "./svg/pause.svg"
        } else {
            song.pause();
            video.pause();
            play.src = "./svg/play.svg"
        }
    };

    song.ontimeupdate = () => {
        // console.log(song.currentTime);
        // var buffer = 0.5;
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let minutes = Math.floor(elapsed / 60);
        let seconds = Math.floor(elapsed % 60);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        timeDisplay.textContent = `${minutes}:${seconds}`;

        // if(song.currentTime > song.duration - 2){
        //     song.currentTime = 2;
        //     song.play();
        // }

        if (currentTime >= fakeDuration) {
            video.pause();
            song.pause();
            song.currentTime = 0;
            play.src = "./svg/play.svg";
        }
    };
}

app();