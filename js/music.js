const bgm = document.getElementById("bgm");
const musicBtn = document.getElementById("musicBtn");
const musicIcon = document.getElementById("musicIcon");
const musicProgress = document.getElementById("musicProgress");

let isPlaying = false;
let animationId = null;

// 노래 길이
const MUSIC_DURATION = 362;


// progress bar 업데이트
function updateProgress() {
    const percent =
        bgm.currentTime / MUSIC_DURATION;

    musicProgress.style.width = (percent * 100) + "%";
    if (isPlaying) {
        animationId = requestAnimationFrame(updateProgress);
    }
}


// 버튼 재생/정지
musicBtn.addEventListener("click", async () => {
    if (!isPlaying) {
        await bgm.play();
        musicIcon.className = "ri-pause-fill";
        isPlaying = true;
        updateProgress();

    } else {
        bgm.pause();
        musicIcon.className = "ri-play-fill";
        isPlaying = false;
        cancelAnimationFrame(animationId);
    }
});

//음악바에서 위치 수정
const musicBar = document.getElementById("musicBar");

musicBar.addEventListener("click", (e) => {
    const rect = musicBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;

    bgm.currentTime = percent * MUSIC_DURATION;
    musicProgress.style.width = (percent * 100) + "%";
});


// 음악 끝났을 때
bgm.addEventListener("ended", () => {
    bgm.currentTime = 0;
    musicProgress.style.width = "0%";
    musicIcon.className = "ri-play-fill";
    isPlaying = false;
    cancelAnimationFrame(animationId);
});


// home → archive 넘어왔을 때 자동재생
window.addEventListener("load", async () => {
    musicProgress.style.width = "0%";
    const shouldPlay =
        localStorage.getItem("autoPlayBgm");
    if (shouldPlay === "true") {
        try {
            bgm.currentTime = 0;
            await bgm.play();
            musicIcon.className = "ri-pause-fill";
            isPlaying = true;
            updateProgress();

        } catch (err) {
            console.log("자동재생 차단");
        }
        localStorage.removeItem("autoPlayBgm");
    }
});