import { FC, useCallback, useContext, useEffect, useState } from "react";
import Heading from "../ui/Heading";
import SingleVideo from "./SingleVideo";
import styles from "./Category.module.css";
import useHttp from "../hooks/useHttp";
import { AuthContext } from "../store/auth-context";

interface RequestObject {
  url: string;
  headers: {};
  data: {
    MediaListId: number;
    IncludeCategories: boolean;
    IncludeImages: boolean;
    IncludeMedia: boolean;
    PageNumber: number;
    PageSize: number;
  };
}

interface Entity {
  Id: number;
  MediaTypeCode: string;
  Title: string;
  Images: { Id: number; ImageTypeCode: string; Url: string }[];
}
interface ResponseData {
  SourceType: string;
  Entities: Entity[];
}

const Category: FC<{
  categoryID: number;
}> = (props) => {
  const [videos, setVideos] = useState<(Entity | undefined)[]>();
  const [listIndex, setListIndex] = useState<number>(props.categoryID);
  const authCtx = useContext(AuthContext);
  const httpRequest = useHttp();
  const apiRequest = httpRequest.apiRequest;

  if (listIndex > 7) {
    setListIndex(2);
  }
  console.log(listIndex);
  const getVideos = useCallback(
    (listIndex: number) => {
      const requestData = {
        MediaListId: listIndex,
        IncludeCategories: false,
        IncludeImages: true,
        IncludeMedia: false,
        PageNumber: 1,
        PageSize: 15,
      };
      const successHandler = (data: ResponseData) => {
        const videoContnent = ["VOD", "LIVE", "SERIES"];
        const onlyVideos = data.Entities.filter((el) => videoContnent.includes(el.MediaTypeCode));
        const uniqueVideos = Array.from(new Set(onlyVideos?.map((el) => el.Id))).map((id) =>
          onlyVideos?.find((el) => el.Id === id)
        );
        setListIndex(listIndex + 1);
        //check if the function was set for the first time
        if (listIndex === props.categoryID) {
          setVideos(uniqueVideos);
          // if (uniqueVideos.length < 15) {
          //   setListIndex(listIndex + 1);
          // }
        } else {
          const newArray = videos?.concat(uniqueVideos);
          setVideos(newArray);
          // if (newArray!.length < 15) {
          //   setListIndex(listIndex + 1);
          // }
        }
        //check if list is long eneough
    
      };
      const errorHandler = (error: number) => {
        console.log(error);
      };
      const request: RequestObject = {
        url: "Media/GetMediaList",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${authCtx.token}` },
        data: requestData,
      };
      apiRequest(request, successHandler, errorHandler);
    },
    [apiRequest, authCtx.token, props.categoryID, videos]
  );
  console.log(listIndex);
  useEffect(() => {
    getVideos(listIndex);
  }, []);
  
  useEffect(() => {
    console.log(videos?.length)
    if (videos && videos?.length < 15) {
      getVideos(listIndex);
    }
  }, [listIndex]);

  // const uniqueVideos = Array.from(new Set(videos?.map((el) => el.Id))).map((id) =>
  //   videos?.find((el) => el.Id === id)
  // );

  return (
    <div className={styles["category"]}>
      <div className={styles["category__title"]}>
        <Heading type="category" text={`Movies from list no ${props.categoryID}`} />
        <p>{"only: " + videos?.length || 0}</p>
        <p>{"unique: " + videos?.length || 0}</p>
      </div>
      <div className={styles["category__slider"]}>
        {videos &&
          videos.map((el, i) => {
            const image = el!.Images.find((image) => image.ImageTypeCode === "FRAME");
            const displayed = i < 15 && (
              <SingleVideo key={el!.Id} title={el!.Title} cover={image?.Url} id={el!.Id} />
            );
            return displayed;
          })}
      </div>
    </div>
  );
};

export default Category;
