import chords from './chords.js';

const chordNames = Object.keys(chords);
const buttonContainer = document.getElementById("buttonContainer");
chordNames.forEach(chordName =>{
    const button = document.createElement("button");
    button.textContent = chordName;
    button.id = chordName.toLowerCase() + "Button";
    buttonContainer.appendChild(button);
});

//音声の処理
chordNames.forEach(chordName => {
    const buttonId = chordName.toLowerCase() + "Button"; 
    const button = document.getElementById(buttonId);
    button.addEventListener('click',() =>{
        const frequencies = chords[chordName];
        playSound(frequencies);
    })
});

function playSound(frequencies) {
    const audioContext = new AudioContext();
    const destination = audioContext.destination;

    frequencies.forEach(frequency => {
        const osc = audioContext.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = frequency;
        const gain = audioContext.createGain();
        gain.gain.value = 0.1;
        osc.connect(gain);
        gain.connect(destination);
        osc.start();
        setTimeout(() => osc.stop(), 1000);
    });
}


