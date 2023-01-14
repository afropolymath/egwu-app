import styled from "styled-components";

type AudioTrackProps = {
  name?: string;
  position: number;
};

const AudioTrackLayout = styled.div`
  padding: 0.5em 0.7em;
  border: solid 1px gray;
  margin-top: 0.4em;
`;

function AudioTrack({ name, position }: AudioTrackProps) {
  return (
    <AudioTrackLayout>
      <span>{name || `Track ${position + 1}`}</span>
    </AudioTrackLayout>
  );
}

export default AudioTrack;
