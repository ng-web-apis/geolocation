AudioContext = globalThis.AudioContext || globalThis.webkitAudioContext;

const context = new AudioContext();

try {
    const gain = new GainNode(context);
} catch (e) {
    // Constructor for AudioNode not supported, probably running Safari
    globalThis.BiquadFilterNode = function(context) {
        return context.createBiquadFilter();
    };
    globalThis.ConvolverNode = function(context) {
        return context.createConvolver();
    };
    globalThis.DelayNode = function(context) {
        return context.createDelay();
    };
    globalThis.DynamicsCompressorNode = function(context) {
        return context.createDynamicsCompressor();
    };
    globalThis.GainNode = function(context) {
        return context.createGain();
    };
    globalThis.PannerNode = function(context) {
        return context.createPanner();
    };
    globalThis.StereoPannerNode = function(context) {
        return context.createStereoPanner();
    };
    globalThis.WaveShaperNode = function(context) {
        return context.createWaveShaper();
    };
    globalThis.AudioBufferSourceNode = function(context) {
        return context.createBufferSource();
    };
    globalThis.MediaElementAudioSourceNode = function(context, element) {
        return context.createMediaElementSource(element);
    };
    globalThis.OscillatorNode = function(context) {
        return context.createOscillator();
    };
}

context.close();
