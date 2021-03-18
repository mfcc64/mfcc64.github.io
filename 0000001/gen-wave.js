
var wave_table = new Float32Array(sampleRate);
for (let k = 0; k < sampleRate; k++) {
    let m = Math.PI * 220 * k / sampleRate;
    wave_table[k] = 0.10 * Math.sin(m) +
                    0.20 * Math.sin(2 * m) +
                    0.05 * Math.sin(3 * m) +
                    0.03 * Math.sin(4 * m) +
                    0.07 * Math.sin(5 * m) +
                    0.01 * Math.sin(7 * m) +
                    0.03 * Math.sin(9 * m) +
                    0.04 * Math.sin(11 * m) +
                    0.03 * Math.sin(13 * m) +
                    0.02 * Math.sin(14 * m) +
                    0.01 * Math.sin(17 * m) +
                    0.02 * Math.sin(18 * m) +
                    0.01 * Math.sin(20 * m) +
                    0.02 * Math.sin(23 * m) +
                    0.01 * Math.sin(25 * m) +
                    0.01 * Math.sin(26 * m) +
                    0.01 * Math.sin(29 * m) +
                    0.01 * Math.sin(33 * m);
}

var index = 0;
var perf_increment = 1 / sampleRate;
var perf = 0;

function dummy_func(x) {
    return (x * x < 1.0) ? 0.0 : x;
}

class GenWave extends AudioWorkletProcessor {
    process(inputs, outputs, params) {
        var output = outputs[0];
        var len = output[0].length;
        for (let x = 0; x < len; x++) {
            output[0][x] = wave_table[index] * Math.min(1.0, 0.1 * perf);
            index++;
            index = (index < sampleRate) ? index : index - sampleRate;

            for (let u = 0; u < perf; u++)
                output[0][x] += dummy_func(output[0][x]);

            perf += perf_increment;
        }

        for (let i = 1; i < output.length; i++)
            for (let x = 0; x < len; x++)
                output[i][x] = output[0][x];

        return (perf < 1000);
    }
}

registerProcessor("gen-wave", GenWave);
