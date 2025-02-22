class AudioWorker extends AudioWorkletProcessor {
    constructor() {
        super();
    }
    process(inputs, outputs, parameters) {
        /**
         *  pass-through
         *  아웃풋 커스텀은 다음에
         */
        for (let channel = 0; channel < inputs[0].length; channel++) {
            outputs[0][channel].set(inputs[0][channel]);
        }
        return true;
    }
}

registerProcessor('audio-worker', AudioWorker);
