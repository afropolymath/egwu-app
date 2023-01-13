import AudioTrack from "./AudioTrack";

type TrackListProps = {
  audioTracks: string[];
};

function TrackList({ audioTracks }: TrackListProps) {
  return (
    <div id="track-list">
      {audioTracks.map((audioTrack, index) => (
        <AudioTrack
          key={`track-at-${index}`}
          position={index}
          trackUrl={audioTrack}
        />
      ))}
    </div>
  );
}

export default TrackList;
