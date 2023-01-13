import { useState, useCallback, useReducer } from "react";

function createAudioUrl(audioChunks: Blob[]) {
  console.info("Creating Audio...");
  const audioBlob = new Blob(audioChunks);
  return URL.createObjectURL(audioBlob);
}

function useAudioRecorder() {
  // const [activeAudioTrackIndex, setActiveAudioTrackIndex] = useState(-1);
  const [isRecording, setIsRecording] = useState(false);
  const [audioTrackUrls, setAudioTrackUrls] = useState<Array<string>>([]);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [recordedAudioChunks, setRecordedAudioChunks] = useState<Blob[]>([]);

  const saveRecordedAudioTrack = useCallback(() => {
    console.log("Saving recorded audio track");
    setAudioTrackUrls((prevState) => [
      ...prevState,
      createAudioUrl(recordedAudioChunks)
    ]);
    setRecordedAudioChunks([]);
  }, [recordedAudioChunks]);

  const initializeMediaRecorder = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mr = new MediaRecorder(stream);

    mr.addEventListener("dataavailable", (event) => {
      console.log("Adding chunk", event.data);
      setRecordedAudioChunks((prevState) => [...prevState, event.data]);
    });

    mr.addEventListener("stop", () => {
      saveRecordedAudioTrack();
    });

    setMediaRecorder(mr);
  }, [saveRecordedAudioTrack]);

  const startRecordingAudio = useCallback(() => {
    console.log("Starting recording...");
    mediaRecorder?.start();
    setIsRecording(true);
  }, [mediaRecorder]);

  const stopRecordingAudio = useCallback(() => {
    console.log("Stopping recording...");
    mediaRecorder?.stop();
    setIsRecording(false);
  }, [mediaRecorder]);

  const playAllAudioTracks = useCallback(async () => {
    console.log("Playing all audio tracks...");
    try {
      await Promise.all(
        audioTrackUrls.map((audioTrackUrl) => new Audio(audioTrackUrl).play())
      );
    } catch (err) {
      console.error("Something went wrong when trying to play the tracks", err);
    }
  }, [audioTrackUrls]);

  return {
    isRecording,
    audioTrackUrls,
    initializeMediaRecorder,
    startRecordingAudio,
    stopRecordingAudio,
    playAllAudioTracks
  };
}

export default useAudioRecorder;
