import { TbPlayerRecord, TbPlayerPlay, TbPlayerStop } from "react-icons/tb";
import { ToolbarButton, ToolbarIcon, ToolbarLayout } from "./styles";

const DEFAULT_ICON_SIZE = 30;

type ToolbarProps = {
  hasAudioTracks?: boolean;
  recordingStatus: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onPlayAllTracks: () => void;
};

function Toolbar({
  hasAudioTracks = false,
  recordingStatus,
  onStartRecording,
  onStopRecording,
  onPlayAllTracks
}: ToolbarProps) {
  return (
    <ToolbarLayout>
      <ToolbarButton
        blinking={recordingStatus}
        onClick={() => !recordingStatus && onStartRecording()}
      >
        <ToolbarIcon
          as={TbPlayerRecord}
          size={DEFAULT_ICON_SIZE}
          disabled={recordingStatus}
        />
      </ToolbarButton>
      <ToolbarButton onClick={() => recordingStatus && onStopRecording()}>
        <ToolbarIcon
          as={TbPlayerStop}
          size={DEFAULT_ICON_SIZE}
          disabled={!recordingStatus}
        />
      </ToolbarButton>
      <ToolbarButton onClick={() => hasAudioTracks && onPlayAllTracks()}>
        <ToolbarIcon
          as={TbPlayerPlay}
          size={DEFAULT_ICON_SIZE}
          disabled={!hasAudioTracks}
        />
      </ToolbarButton>
    </ToolbarLayout>
  );
}

export default Toolbar;
