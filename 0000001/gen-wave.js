
var frequencies = [ 440,  880, 660, 1100, 220, 330, 550, 770, 990, 110];
var ts          = [   0,    0,   0,    0,   0,   0,   0,   0,   0,   0];
var num_freqs   = 0;

class GenWave extends AudioWorkletProcessor {
    constructor(...args) {
        super(...args);

        this.port.onmessage = (v) => {
            num_freqs = Math.min(frequencies.length, num_freqs + 1);
            var txt = "Freq:";
            for (var x = 0; x < num_freqs; x++) {
                txt += " " + frequencies[x] + (x < num_freqs - 1 ? " Hz," : " Hz.");
            }
            this.port.postMessage(txt);
        }
    }

    process(inputs, outputs, params) {
        var output = outputs[0];
        var len = output[0].length;
        for (let x = 0; x < len; x++) {
            let v = 0;
            for (let i = 0; i < num_freqs; i++) {
                let f = frequencies[i];
                let t = ts[i] / sampleRate;
                let a = 0.05 * (t < 1 ? t : 1);
                v += a * Math.sin(2 * Math.PI * f * t);
                ts[i]++;
            }
            output[0][x] = v;
        }

        for (let i = 1; i < output.length; i++)
            for (let x = 0; x < len; x++)
                output[i][x] = output[0][x];

        return true;
    }
}

registerProcessor("gen-wave", GenWave);
