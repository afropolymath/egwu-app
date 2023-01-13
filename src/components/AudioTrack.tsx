type AudioTrackProps = {
  name?: string;
  position: number;
  trackUrl: string;
};

function AudioTrack({ name, position, trackUrl }: AudioTrackProps) {
  return (
    <div>
      <span>{name || `Track ${position + 1}`}</span>
      <audio src={trackUrl} />
    </div>
  );
}

export default AudioTrack;
