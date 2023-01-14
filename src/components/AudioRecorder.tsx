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
    isPlaying,
    audioTracks,
    startRecordingAudio,
    stopRecordingAudio,
    playAllAudioTracks,
  } = useAudioRecorder();

  return (
    <AudioRecorderLayout>
      <Toolbar
        hasAudioTracks={!!audioTracks.length}
        playingStatus={isPlaying}
        recordingStatus={isRecording}
        onPlayAllTracks={playAllAudioTracks}
        onStartRecording={startRecordingAudio}
        onStopRecording={stopRecordingAudio}
      />
      <TrackList audioTracks={audioTracks} />
    </AudioRecorderLayout>
  );
}

export default AudioRecorder;
