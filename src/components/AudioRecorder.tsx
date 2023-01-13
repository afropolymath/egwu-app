import { useEffect } from "react";
import styled from "styled-components";

import TrackList from "./TrackList";
import Toolbar from "./Toolbar";

import useAudioRecorder from "../hooks/useAudioRecorder";

const AudioRecorderLayout = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

function AudioRecorder() {
  const {
    isRecording,
    audioTrackUrls,
    initializeMediaRecorder,
    startRecordingAudio,
    stopRecordingAudio,
    playAllAudioTracks
  } = useAudioRecorder();

  useEffect(() => {
    try {
      initializeMediaRecorder();
    } catch (err) {
      console.error("Could not retrieve the required Audio permissions", err);
    }
  }, []);

  return (
    <AudioRecorderLayout>
      <Toolbar
        hasAudioTracks={!!audioTrackUrls.length}
        recordingStatus={isRecording}
        onPlayAllTracks={playAllAudioTracks}
        onStartRecording={startRecordingAudio}
        onStopRecording={stopRecordingAudio}
      />
      <TrackList audioTracks={audioTrackUrls} />
    </AudioRecorderLayout>
  );
}

export default AudioRecorder;
