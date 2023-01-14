import { useState, useCallback, useEffect, useReducer } from "react";

interface AudioRecorderReducerAction {
  type:
    | "start-recording"
    | "stop-recording"
    | "update-recorded-chunks"
    | "save-audio-track"
    | "start-playing"
    | "stop-playing";
  payload?: Blob;
}

interface AudioRecorderReducerState {
  isRecording: boolean;
  isPlaying: boolean;
  audioTracks: HTMLAudioElement[];
  recordedAudioChunks: Blob[];
}

function createAudioTrack(audioChunks: Blob[]) {
  console.info("Creating Audio...");
  const audioBlob = new Blob(audioChunks, { type: "audio/ogg; codecs=vp8" });
  const audioTrack = new Audio(URL.createObjectURL(audioBlob));
  audioTrack.crossOrigin = "anonymous";
  return audioTrack;
}

function audioRecorderReducer(
  state: AudioRecorderReducerState,
  action: AudioRecorderReducerAction
): AudioRecorderReducerState {
  const { type, payload } = action;
  if (type === "start-recording") {
    return {
      ...state,
      isRecording: true,
    };
  }
  if (type === "update-recorded-chunks") {
    return {
      ...state,
      recordedAudioChunks: [
        ...state.recordedAudioChunks,
        ...(payload ? [payload] : []),
      ],
    };
  }
  if (type === "stop-recording") {
    return {
      ...state,
      isRecording: false,
    };
  }
  if (type === "save-audio-track") {
    return {
      ...state,
      audioTracks: [
        ...state.audioTracks,
        createAudioTrack(state.recordedAudioChunks),
      ],
      recordedAudioChunks: [],
      isRecording: false,
    };
  }
  if (type === "start-playing") {
    return {
      ...state,
      isPlaying: true,
    };
  }
  if (type === "stop-playing") {
    return {
      ...state,
      isPlaying: false,
    };
  }
  return state;
}

function useAudioRecorder() {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [state, dispatch] = useReducer(audioRecorderReducer, {
    recordedAudioChunks: [],
    audioTracks: [],
    isRecording: false,
    isPlaying: false,
  });

  const playAllAudioTracks = useCallback(() => {
    dispatch({ type: "start-playing" });
    console.log("Playing all audio tracks...");
    return Promise.all(state.audioTracks.map((audioTrack) => audioTrack.play()))
      .catch((err) => {
        console.error(
          "Something went wrong when trying to play the tracks",
          err
        );
      })
      .finally(() => {
        dispatch({ type: "stop-playing" });
      });
  }, [state.audioTracks]);

  const startRecordingAudio = useCallback(() => {
    dispatch({ type: "start-recording" });
    console.log("Starting recording...");
    playAllAudioTracks();
    mediaRecorder?.start();
  }, [mediaRecorder, playAllAudioTracks]);

  const stopRecordingAudio = useCallback(() => {
    console.log("Stopping recording...");
    mediaRecorder?.stop();
  }, [mediaRecorder]);

  useEffect(() => {
    console.log("Initializing microphone...");
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mr = new MediaRecorder(stream);

        mr.addEventListener("dataavailable", (event) => {
          console.log("Adding chunk...", event.data);
          dispatch({ type: "update-recorded-chunks", payload: event.data });
        });

        mr.addEventListener("stop", () => {
          console.log("Saving recorded audio track");
          dispatch({ type: "save-audio-track" });
        });

        console.log("Done initializing microphone...");

        setMediaRecorder(mr);
      })
      .catch((err) => {
        console.error("Could not retrieve the required Audio permissions", err);
      });
  }, []);

  return {
    isPlaying: state.isPlaying,
    isRecording: state.isRecording,
    audioTracks: state.audioTracks,
    startRecordingAudio,
    stopRecordingAudio,
    playAllAudioTracks,
  };
}

export default useAudioRecorder;
