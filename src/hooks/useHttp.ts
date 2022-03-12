import axios from "axios";
import { useCallback } from "react";


export interface Error {
  config: {};
  status: number;
}

const useHttp = () => {
  const apiRequest = useCallback((request, successHandler, errorHandler) => {
    axios({
      method: 'POST',
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
        console.log(JSON.stringify(err));
        console.log(err.status);
        errorHandler(err.status);
      });
  }, []);
  return { apiRequest };
};

export default useHttp;

// const responseGuest = {
//   data: {
//     User: { Id: -999, UserName: "Anonymous", FullName: "Anonymous user", ClientRoles: [] },
//     AuthorizationToken: {
//       Token:
//         "eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwidHlwIjoiSldUIn0.MWpgA-K3v3Z90HVDoKchtW5HpzKtwVhxscj2vXoSl2qrNVhIplP9hQ.Wlw3izjgukXFQQFs5QvtCw.50GFbBTj6U9_tcKEvRXxw4YmALSET2JUyZKIiGth2qeTDKPTRBnD-v8TV6ePCSb0RiCm-4pHJBaATf1cqcA6WbZOr-2UUYYq34FJBgyN8bqI0sEyVPdtdyu2XNyTPTltZh4s8tID3ZvXNTgqNKO0vCKmwkQRYJgoZ27Huq-JSJtja774aTMpDYhSg-8Y1dHlYkRKnLRn06wILd2CJfxUjRH21FrlR2IIIg9Sn1v9m_E1xZWh2jcqA8Bs78CCO-BNAHcZcZeVmB5CcHrsNAthqEWFP6ubXlDsg0Gkf-v20FdFzj-_m1QpIMa-jl47xHg6RPtIXU4iqz76HOBzK9KYmH8UCBPfBuqXf2WTDPmQwFdUAEdmT12ejQg-Wd9caWFkVPEzTAea8yPwoip_Et1JXWLAdpOT7bDfAEbcgz6lQiFYWq4IzaVzlrq-K4CEhAYkfLll0dGMjLu0n94Wuk87iBzQbDwCBaOZeY4JEK8v1yrm-ysNXprS28bpJ0-bgy8CBf59pfiitDXOXREok-RouSeeRU7CZUZTZTL8nh6i6k79Y6k-hs0Q92_KNuZRhSMk7tlhSlbTBL3FmWwO0oTAROO5wONuChyr96JxT3Q45y81EYrOh3JmgdRykiUEzEPi.Xp5d9BG3G-VOovMAt5jspQ",
//       TokenExpires: "2022-03-11T09:11:18.6990271+00:00",
//     },
//   },
//   status: 200,
//   statusText: "",
//   headers: {
//     "cache-control": "no-cache",
//     "content-type": "application/json; charset=utf-8",
//     expires: "Thu, 01 Jan 1970 00:00:00 GMT",
//     pragma: "no-cache",
//   },
//   config: {
//     transitional: { silentJSONParsing: true, forcedJSONParsing: true, clarifyTimeoutError: false },
//     transformRequest: [null],
//     transformResponse: [null],
//     timeout: 0,
//     xsrfCookieName: "XSRF-TOKEN",
//     xsrfHeaderName: "X-XSRF-TOKEN",
//     maxContentLength: -1,
//     maxBodyLength: -1,
//     headers: { Accept: "application/json, text/plain, */*", "Content-Type": "application/json" },
//     method: "post",
//     url: "https://thebetter.bsgroup.eu/Authorization/SignIn",
//     data: '{"Device":{"PlatformCode":"WEB","Name":"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"}}',
//   },
//   request: {},
// };

// const responseRegistered = {
//   data: {
//     User: {
//       Products: [],
//       Id: 395,
//       FullName: "Test User",
//       Email: "test@bsgroup.eu",
//       Initials: "TU",
//       ClientRoles: [],
//     },
//     AuthorizationToken: {
//       Token:
//         "eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwidHlwIjoiSldUIn0.fq9mp-8dlvkyl6h1jLDAj3pXvYYCnBk70TgUJkM1N9LdQL27IanjEg.KyZXtLJ-BHRApFvWW18G0Q.q66t6AXJRq2lNeCRYmbrTVOUwIVOrNJihXDFEqQJdIijDfWl2sQw0N9ZiLjkMCdQfIpkr937MKnFFMIU27Cu0XKGqn8kXoNIRyBsN1Rl4taPWHp2qPXl4rRN3mF9E_d6rB8Ks9Q4LLAfQOSzCs9D-qXaGPzSHAm6kmLU2Yypb8KyEcNfjSLWEtXXjJe-8soumgfQ0hXBx8lk7dx10XAW0QdJU3v2rAqFYqWQ_2PuXkcU2oES_oSe9fvEY5OvKqx5KFIfjOxHyvpK6rKbgdgCrUoWs0UAdU1tcQsX6_iQuTOcyr2LUXlvIAVKi7VCP7UYedk8IXXdZzMcjCHf3sj1AWEwrGnxcY7glp29a79KNMoXuOGwx8IVeGLl3jf-_6Z5KT8qRFCsqQ6pu13JnnRqn9vnlcTTWyNq3DAfJ8JkdS0U3CpOOkSCpsVGNIDlsgj4uUCjtKzkEKBlB2pzi7ccyd12Kl69SWL8v8rVTtE6uzkhUv_RSqkkRUZgXOFt_dl511yHh8usaVLIkRTFUuuLjLPloBQnDa7F9HY7KfXZEK3IcpJWvshxLkjtqWkSusMekRk4aBWtxL6TI8ZyPAvxDXFukKso7725lbLMEg50CZM.UmMRGCNuP4pq4v0RlB_QSQ",
//       TokenExpires: "2022-03-11T09:34:35.6341204+00:00",
//       RefreshToken:
//         "eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwidHlwIjoiSldUIn0.JOdKePXT-Co3uVmnfKZ32ZTZwQHwBAQwJtvpi8zJ6rijko8DBcGiuA.W6vsJnxslVW31IdHjyCVhw.RvQ3r4pgpqBFmlPiMZns-aeEhdcXqayfKpco3rc50tQ0QG5o8pwx_l5C6myuLhrijSyLFhZSTIe8xrfiVyXhlncm22WGZSJ_39eZA5ZNHpD7H-i6gK1Aohp94zcx3P2nrjrkvAAE19JG3yKiC8v_afY4DgOe9_ImW6WgEYO0n4YG6eEJAY91j20LErriCXyFQUXa4fwoBq-bX7djnbTfm2q4Mt1F3lZFqcA94apWDCp46qh2sIW-UrQEdpn5vCgWPLiT76i9jHMALD8zi7BkrF2-5z5IuduEBU_BnOacGFBRZFombcmMooTIlHmaTBha0RcWBbwaPakv-wVhOLeMl70guti8ekeGgu0OTCtNM1q01ECGG-szOyCoxhQNbZL5S0w4YdToIiADquTvhXwapijzhogrBBedz1TeePdljKZH9P_jCAv7ZnbenWYHsXDl2ob4mbrt8PNAvo3JiojyIjTvRkuhHE8kg2j9rT1Q_lVVDSGaov0JrGnNWdCPxOEdbR7_xj1V1EnDU_yHaei-ePt3FQyhA18SnxIYTY2GBkOBZSC5N9L4j8zI2XRPYPtoxWO48YIg0Qa2fTqav0GxjZlxEBNSS3q6PthAOfLFRjw.2ikLyOX7QWWmeyV1_6PHKw",
//     },
//   },
//   status: 200,
//   statusText: "",
//   headers: { "content-type": "application/json; charset=utf-8" },
//   config: {
//     transitional: { silentJSONParsing: true, forcedJSONParsing: true, clarifyTimeoutError: false },
//     transformRequest: [null],
//     transformResponse: [null],
//     timeout: 0,
//     xsrfCookieName: "XSRF-TOKEN",
//     xsrfHeaderName: "X-XSRF-TOKEN",
//     maxContentLength: -1,
//     maxBodyLength: -1,
//     headers: { Accept: "application/json, text/plain, */*", "Content-Type": "application/json" },
//     method: "post",
//     url: "https://thebetter.bsgroup.eu/Authorization/SignIn",
//     data: '{"Username":"test@bsgroup.eu","Password":"Test12!@","Device":{"PlatformCode":"WEB","Name":"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"}}',
//   },
//   request: {},
// };

const Error = {
  message: "Request failed with status code 401",
  name: "Error",
  stack:
    "Error: Request failed with status code 401\n    at createError (http://localhost:3000/static/js/bundle.js:15700:15)\n    at settle (http://localhost:3000/static/js/bundle.js:15967:12)\n    at XMLHttpRequest.onloadend (http://localhost:3000/static/js/bundle.js:15035:7)",
  config: {
    transitional: { silentJSONParsing: true, forcedJSONParsing: true, clarifyTimeoutError: false },
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    headers: { Accept: "application/json, text/plain, */*", "Content-Type": "application/json" },
    method: "post",
    url: "https://thebetter.bsgroup.eu/Authorization/SignIn",
    data: '{"Username":"r","Password":"r","Device":{"PlatformCode":"WEB","Name":"12345678-1234-1234-1234-123456789012"}}',
  },
  status: 401,
};

console.log(Error.status);
