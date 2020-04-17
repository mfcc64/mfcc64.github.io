
var global_audio_ctx = null;

async function run_test() {
    if (global_audio_ctx)
        return;

    var ctx = global_audio_ctx = new AudioContext();
    await ctx.audioWorklet.addModule("gen-wave.js");
    var gen_wave = new AudioWorkletNode(ctx, "gen-wave",
                                        {numberOfInputs: 0, numberOfOutputs: 1, outputChannelCount: [2]});
    gen_wave.connect(ctx.destination);
    gen_wave.port.onmessage = (v) => {
        document.getElementById("test-level").textContent = v.data;
    }

    var test_level = 0;
    var test_level_max = 10;
    function increment_test_level() {
        if (test_level < test_level_max) {
            test_level++;
            gen_wave.port.postMessage("increment");
            setTimeout(increment_test_level, 10000);
        }
    }

    setTimeout(increment_test_level, 100);
}
