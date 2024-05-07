document.addEventListener('DOMContentLoaded', function () {
    const audioPlayer = document.getElementById('myAudio');
    const playButton = document.querySelector('.play-button');
    const progressBar = document.querySelector('.progress-bar');
    const currentTimeDisplay = document.querySelector('.progress-time-current');
    const totalTimeDisplay = document.querySelector('.progress-time-total');

    let isPlaying = false;

    // Función para actualizar la barra de progreso y los tiempos de reproducción
    function updateProgress() {
        const duration = audioPlayer.duration;
        const currentTime = audioPlayer.currentTime;
        const progress = (currentTime / duration) * 100;
        progressBar.style.width = `${progress}%`;

        // Actualizar el tiempo actual de reproducción
        currentTimeDisplay.textContent = formatTime(currentTime);

        // Actualizar el tiempo total de la canción
        totalTimeDisplay.textContent = formatTime(duration);

        // Si la canción ha terminado, detener la reproducción
        if (currentTime >= duration) {
            audioPlayer.pause();
            isPlaying = false;
            playButton.querySelector('i').classList.remove('fa-pause');
            playButton.querySelector('i').classList.add('fa-play');
        }
    }

    // Función para dar formato al tiempo (mm:ss)
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Evento click del botón de reproducción
    playButton.addEventListener('click', function () {
        if (!isPlaying) {
            audioPlayer.play();
            isPlaying = true;
            playButton.querySelector('i').classList.remove('fa-play');
            playButton.querySelector('i').classList.add('fa-pause');
        } else {
            audioPlayer.pause();
            isPlaying = false;
            playButton.querySelector('i').classList.remove('fa-pause');
            playButton.querySelector('i').classList.add('fa-play');
        }
    });

    // Evento para actualizar la barra de progreso cuando se reproduce la música
    audioPlayer.addEventListener('timeupdate', updateProgress);

    // Evento para actualizar la barra de progreso al hacer clic en la misma
    progressBar.addEventListener('click', function (e) {
        const barWidth = progressBar.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;
        const newTime = (clickX / barWidth) * duration;
        audioPlayer.currentTime = newTime;
        updateProgress();
    });
});