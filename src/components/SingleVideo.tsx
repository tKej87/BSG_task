import { FC, Fragment, useState } from "react";
import Heading from "../ui/Heading";
import styles from "./SingleVideo.module.css";
import VideoPlayer from "./VideoPlayer";

const SingleVideo: FC<{ title: string; cover: string | undefined; id: number }> = (props) => {
  const [playerVisible, setPlayervisible] = useState(false);

  const showPlayer = () => {
    setPlayervisible(true);
  };
  const hidePlayer = () => {
    setPlayervisible(false);
  };

  const imageSrc = props.cover || "https://via.placeholder.com/1920x1080/eee?text=16:9";

  return (
    <Fragment>
      <div className={styles["single-video"]} onClick={showPlayer}>
        <div className={styles["single-video__image"]}>
          <img alt={props.title} src={imageSrc} />
        </div>
        <Heading type="movie-title" text={props.title} />
      </div>
      {playerVisible && <VideoPlayer onClose={hidePlayer} id={props.id}/>}
    </Fragment>
  );
};

export default SingleVideo;
