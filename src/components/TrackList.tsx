import AudioTrack from "./AudioTrack";

type TrackListProps = {
  audioTracks: HTMLAudioElement[];
};

function TrackList({ audioTracks }: TrackListProps) {
  return (
    <div id="track-list">
      {audioTracks.map((audioTrack, index) => (
        <AudioTrack key={audioTrack.id} position={index} />
      ))}
    </div>
  );
}

export default TrackList;
