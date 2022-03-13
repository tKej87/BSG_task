import axios from "axios";
import { useCallback } from "react";


const useHttp = () => {
  const apiRequest = useCallback((request, successHandler, errorHandler) => {
    axios({
      method: "POST",
      url: `https://thebetter.bsgroup.eu/${request.url}`,
      headers: request.headers,
      data: request.data,
    })
      .then((response) => {
        if (response.status === 200) {
          successHandler(response.data);
        } else {
          console.log(response.data);
        }
      })
      .catch((err: Error) => {
        errorHandler(err);
      });
  }, []);
  return { apiRequest };
};

export default useHttp;
