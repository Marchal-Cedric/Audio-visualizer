const audioPlayer = document.querySelector('audio');


audioPlayer.addEventListener("play", () => {

    // Start
    const audio = new AudioContext();
    const src = audio.createMediaElementSource(audioPlayer);
    const analyser = audio.createAnalyser();

    const canvas = document.querySelector('#canvas');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    const ctx = canvas.getContext('2d');

    src.connect(analyser);
    analyser.connect(audio.destination);

    analyser.fftSize = 1024;
    const frequence = analyser.frequencyBinCount;
    
    const frequenceArray = new Uint8Array(frequence);
    
    const HEIGTH = canvas.height;
    const WIDTH = canvas.width;
    
    const size = (WIDTH / frequenceArray.length) + 2;
    let sizeUp;
    let x;

    function load(){

        // Dynamic animation
        requestAnimationFrame(load)

        x = 0;
        analyser.getByteFrequencyData(frequenceArray);

        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, WIDTH, HEIGTH);

        for (let i = 0; i < frequence; i++) {
            
            sizeUp = frequenceArray[i];

            let r = 250;
            let g = 50;
            let b = i;
            
            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            ctx.fillRect(x, HEIGTH, size, -sizeUp);

            x += size + 1;
        }
    }
    load();
})