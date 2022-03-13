import { FC } from "react";
import ReactPlayer from "react-player";

const VideoPlayer: FC<{ onError: (error: any) => void; src: string }> = (props) => {
  return (
    <ReactPlayer
      url={props.src}
      playing={true}
      controls={true}
      width="100%"
      height="100%"
      onError={props.onError}
    />
  );
};
export default VideoPlayer;
