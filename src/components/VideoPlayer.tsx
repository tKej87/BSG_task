import { FC, Fragment, useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ReactPlayer from "react-player";
import Modal from "../ui/Modal";
import useHttp from "../hooks/useHttp";
import { AuthContext } from "../store/auth-context";
import styles from "./VideoPlayer.module.css";
import Heading from "../ui/Heading";
import OverlayModal from "../ui/OverlayModal";

interface RequestObject {
  url: string;
  headers: {};
  data: {
    MediaId: number;
    StreamType: string;
  };
}
interface ResponseData {
  MediaId: number;
  Title: string;
  ContentUrl: string;
}

const VideoPlayer: FC<{ onClose: () => void; id: number }> = (props) => {
  const [movieUrl, setMovieUrl] = useState<string>("");
  const [movieTitle, setMovieTitle] = useState<string>("");

  const authCtx = useContext(AuthContext);
  const httpRequest = useHttp();
  const apiRequest = httpRequest.apiRequest;

  const requestData = {
    MediaId: props.id,
    StreamType: "TRIAL",
  };
  const successHandler = (data: ResponseData) => {
    console.log(JSON.stringify(data));
    setMovieUrl(data.ContentUrl);
    setMovieTitle(data.Title);
  };
  const errorHandler = (error: number) => {
    console.log(error);
  };
  const request: RequestObject = {
    url: "Media/GetMediaPlayInfo",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${authCtx.token}` },
    data: requestData,
  };

  useEffect(() => {
    apiRequest(request, successHandler, errorHandler);
  }, []);

  return (
    <OverlayModal onClose={props.onClose}>
      <Heading type="movie-title" text={movieTitle} />
      {movieUrl ? (
        <div className={styles["video-container"]}>
          <ReactPlayer url={movieUrl} playing={true} controls={true} width="100%" height="100%" />
        </div>
      ) : (
        <Heading type="error" text="Unfortunately, video's source is unavailable right now" />
      )}
    </OverlayModal>
  );
};

export default VideoPlayer;
