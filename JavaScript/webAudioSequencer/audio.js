const audioCtx = new AudioContext();

const wave = new PeriodicWave(audioCtx, {
    real: wavetable.real,
    imag: wavetable.imag,
  });

  function playSweep(time) {
    const osc = new OscillatorNode(audioCtx, {
      frequency: 380,
      type: "custom",
      periodicWave: wave,
    });
    osc.connect(audioCtx.destination);
    osc.start(time);
    osc.stop(time + 1);
  }

let attackTime = 0.2;
const attackControl = document.querySelector("#attack");
attackControl.addEventListener(
    "input",
    (ev) => {
        attackTime = parseInt(ev.target.value, 10);
    },
    false,
);

let releaseTime = 0.5;
const releaseControl = document.querySelector("#release");
releaseControl.addEventListener(
    "input",
    (ev) => {
        releaseTime = parseInt(ev.target.value, 10);
    },
    false,
);

const sweepLength = 2;
function playSweep(time) {
  const osc = new OscillatorNode(audioCtx, {
    frequency: 380,
    type: "custom",
    periodicWave: wave,
  });

  const sweepEnv = new GainNode(audioCtx);
  sweepEnv.gain.cancelScheduledValues(time);
  sweepEnv.gain.setValueAtTime(0, time);
  sweepEnv.gain.linearRampToValueAtTime(1, time + attackTime);
  sweepEnv.gain.linearRampToValueAtTime(0, time + sweepLength - releaseTime);

  osc.connect(sweepEnv).connect(audioCtx.destination);
  osc.start(time);
  osc.stop(time + sweepLength);
}