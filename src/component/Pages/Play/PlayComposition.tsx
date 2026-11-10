import {Interactive, useVideoConfig} from 'remotion';

const PlayComposition: React.FC = () => {
  const {fps, durationInFrames, width, height} = useVideoConfig();

  return (
    <Interactive.Div
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 60,
        backgroundColor: 'white',
        position: 'absolute',
        height: '100%',
        width: '100%',
      }}
    >
      This {width}x{height}px video is {durationInFrames / fps} seconds long.
    </Interactive.Div>
  );
};

export default PlayComposition;