import { FC, Fragment, useCallback, useContext, useEffect, useMemo, useState } from "react";
import Heading from "../ui/Heading";
import SingleVideo from "./SingleVideo";
import styles from "./Category.module.css";
import useHttp from "../hooks/useHttp";
import { AuthContext } from "../store/auth-context";
import Spinner from "../ui/Spinner";
import ErrorMsg from "../ui/ErrorMsg";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const authCtx = useContext(AuthContext);
  const httpRequest = useHttp();
  const apiRequest = httpRequest.apiRequest;

  if (listIndex > 7) {
    setListIndex(2);
  }
  const successHandler = useCallback(
    (data: ResponseData) => {
      const videoContnent = ["VOD", "LIVE", "SERIES"];
      const onlyVideos = data.Entities.filter((el) => videoContnent.includes(el.MediaTypeCode));
      //check if the function was set for the first time
      if (listIndex === props.categoryID) {
        setVideos(onlyVideos);
        //check if list is long eneough
        if (onlyVideos.length < 15) {
          setListIndex(listIndex + 1);
        }
      } else {
        setVideos((currentVideos) => {
          const newVideos = currentVideos?.concat(onlyVideos);
          const uniqueVideos = Array.from(new Set(newVideos?.map((el) => el!.Id))).map((id) =>
            newVideos?.find((el) => el!.Id === id)
          );
          if (uniqueVideos.length < 15) {
            setListIndex(listIndex + 1);
          }
          return uniqueVideos;
        });
        //check if list is long eneough
      }
      setLoading(false);
    },
    [listIndex, props.categoryID]
    //callback is missing dependency, but unfortunately I couldn't find better solution for the code I wanted to develop
  );
  const errorHandler = useCallback((error: Error) => {
    setErrorMsg(JSON.stringify(error.message));
    setLoading(false);
  }, []);
  const request: RequestObject = useMemo(
    () => ({
      url: "Media/GetMediaList",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${authCtx.token}` },
      data: {
        MediaListId: listIndex,
        IncludeCategories: false,
        IncludeImages: true,
        IncludeMedia: false,
        PageNumber: 1,
        PageSize: 15,
      },
    }),
    [listIndex, authCtx.token]
  );

  useEffect(() => {
    setLoading(true);
    apiRequest(request, successHandler, errorHandler);
  }, [apiRequest, request, successHandler, errorHandler]);

  return (
    <div className={styles["category"]}>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className={styles["category__title"]}>
            <p>{videos && videos.length}</p>
            {errorMsg ? (
              <ErrorMsg message={errorMsg} />
            ) : (
              <Heading
                type="category"
                text={`Movies from list${props.categoryID !== listIndex && "s"} no ${
                  props.categoryID
                }  ${props.categoryID !== listIndex && "to no " + listIndex}`}
              />
            )}
          </div>
          <div className={styles["category__slider"]}>
            {videos &&
              videos.map((el, i) => {
                const image = el!.Images.find((image) => image.ImageTypeCode === "FRAME");
                const displayedVideos = i < 15 && (
                  <SingleVideo key={el!.Id} title={el!.Title} cover={image?.Url} id={el!.Id} />
                );
                return displayedVideos;
              })}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Category;

// useEffect( () => {
//   async function fetchData() {
//     const promise = await fetch(`test.json`);
//     const result = await promise.json();
//     const newForm = {...form};
//     newForm.data = result;
//     setForm(newForm);
//     console.log('executed');
//   }
//   fetchData();
// }, [])
// useEffect( () => {
//   async function fetchData() {
//     const promise = await fetch(`test.json`);
//     const result = await promise.json();
//     setForm(currentForm => {
//       const newForm = {...currentForm};
//       newForm.data = result;
//       return newForm;
//     });
//     console.log('executed');
//   }
//   fetchData();
// }, []
