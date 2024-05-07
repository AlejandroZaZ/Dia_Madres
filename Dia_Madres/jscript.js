document.addEventListener('DOMContentLoaded', function () {
    const audioPlayer = document.getElementById('myAudio');
    const playButton = document.querySelector('.play-button');
    const progressBar = document.querySelector('.progress-bar');
    const currentTimeDisplay = document.querySelector('.progress-time-current');
    const totalTimeDisplay = document.querySelector('.progress-time-total');
    const backButton = document.querySelector('.back-button');
    const rewindButton = document.querySelector('.rewind-button');
    const fastForwardButton = document.querySelector('.fast-forward-button');
    const skipButton = document.querySelector('.skip-button');

    let isPlaying = false;
    let currentSongIndex = 0;
    const songs = [
        { title: 'Canción 1', source: 'music/1.mp3', duration: '3:04' },
        { title: 'Canción 2', source: 'music/2.mp3', duration: '3:14' }
    ];

    // Función para cargar y reproducir una canción
    function loadSong(index) {
        const song = songs[index];
        audioPlayer.src = song.source;
        audioPlayer.load();
        currentTimeDisplay.textContent = '0:00';
        totalTimeDisplay.textContent = song.duration;
    }

    // Función para reproducir o pausar la canción
    function togglePlay() {
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
    }

    // Función para avanzar a la siguiente canción
    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
        togglePlay();
    }

    // Función para retroceder a la canción anterior
    function previousSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(currentSongIndex);
        togglePlay();
    }

    // Evento click del botón de reproducción
    playButton.addEventListener('click', togglePlay);

    // Evento click del botón de avance rápido (fast forward)
    fastForwardButton.addEventListener('click', function () {
        audioPlayer.currentTime += 10; // Avanza 10 segundos
    });

    // Evento click del botón de retroceso (rewind)
    rewindButton.addEventListener('click', function () {
        audioPlayer.currentTime -= 10; // Retrocede 10 segundos
    });

    // Evento click del botón de salto (skip)
    skipButton.addEventListener('click', nextSong);

    // Evento click del botón de retroceso (back)
    backButton.addEventListener('click', previousSong);

    // Evento para actualizar la barra de progreso y tiempos de reproducción
    audioPlayer.addEventListener('timeupdate', function () {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;
        const progress = (currentTime / duration) * 100;
        progressBar.style.width = `${progress}%`;
        currentTimeDisplay.textContent = formatTime(currentTime);
    });

    // Función para dar formato al tiempo (mm:ss)
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Cargar la primera canción al iniciar
    loadSong(currentSongIndex);
});