import { FC, useContext, useState, useEffect } from "react";
import useHttp from "../hooks/useHttp";
import { AuthContext } from "../store/auth-context";
import styles from "./VideoModal.module.css";
import Heading from "../ui/Heading";
import OverlayModal from "../ui/OverlayModal";
import VideoPlayer from "./VideoPlayer";
import Spinner from "../ui/Spinner";
import ErrorMsg from "../ui/ErrorMsg";

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

const VideoModal: FC<{ onClose: () => void; id: number }> = (props) => {
  const [movieUrl, setMovieUrl] = useState<string>("");
  const [movieTitle, setMovieTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const authCtx = useContext(AuthContext);
  const httpRequest = useHttp();
  const apiRequest = httpRequest.apiRequest;

  const successHandler = (data: ResponseData) => {
    setMovieUrl(data.ContentUrl);
    setMovieTitle(data.Title);
    setLoading(false);
  };
  const errorHandler = (error: Error) => {
    if (error.message.includes("403")) {
      setErrorMsg("We're sorry, but your subscription is not valid.");
    } else {
      setErrorMsg(JSON.stringify(error.message));
    }
    setLoading(false);
  };
  const request: RequestObject = {
    url: "Media/GetMediaPlayInfo",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${authCtx.token}` },
    data: {
      MediaId: props.id,
      StreamType: authCtx.isGuest ? "TRIAL" : "MAIN",
    },
  };

  useEffect(() => {
    setLoading(true);
    apiRequest(request, successHandler, errorHandler);
  }, []);

  const videoError = (error: any) => {
    if (error.error.code === 25) {
      setErrorMsg("We're sorry, but the video is not available.");
    } else {
      setErrorMsg(JSON.stringify(error.error.message));
    }
  };

  return (
    <OverlayModal onClose={props.onClose}>
      {errorMsg && <ErrorMsg message={errorMsg} />}
      <Heading type="movie-title" text={movieTitle} />
      {loading ? (
        <Spinner />
      ) : movieUrl ? (
        <div className={styles["video-container"]}>
          <VideoPlayer src={movieUrl} onError={videoError} />
        </div>
      ) : (
        !errorMsg && <ErrorMsg message="Unfortunately, video's source is unavailable right now" />
      )}
    </OverlayModal>
  );
};

export default VideoModal;
