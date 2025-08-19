import React from "react";
// import { useAuth } from "../auth/AuthContext";
// import api from "../api/axios";
// import { useTranslation } from "react-i18next";

// export default function ErrorPage() {
//   // const { user, logout } = useAuth();
//   // const { t } = useTranslation();

//   // const handleParse = async () => {
//   //   try {
//   //     const res = await api.post("/heroes/parse");
//   //     alert(res.data.message);
//   //   } catch (err) {
//   //     alert(err.response?.data?.message || "Parsing failed");
//   //   }
//   // };

//   return (
//     <>
//       <div>
//         <div>
//           <span className="neon">
//             4<span>4</span>
//           </span>
//           <span className="neon">
//             0<span>0</span>
//           </span>
//           <span className="neon">
//             4<span>4</span>
//           </span>
//         </div>
//       </div>
//       <div className="base">
//         <div className="error"></div>
//         <span className="message">Page Not Find</span>
//         <br />
//         <span className="message">Sorry about This</span>
//       </div>
//     </>
//   );
// }


export default function ErrorPage() {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </a>
            <a href="#" className="text-sm font-semibold text-gray-900">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}