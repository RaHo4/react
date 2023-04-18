import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MainMenu from "./App";
import reportWebVitals from "./reportWebVitals";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store__hw6 } from "./homework-6/store";
import { store__lab4 } from "./lab-4/redux/store";

const Homework11 = lazy(() => import("./homework-1.1/task1.js"));
const Homework12 = lazy(() => import("./homework-1.2/task2.js"));
const Homework13 = lazy(() => import("./homework-1.3/task3.js"));
const Homework14 = lazy(() => import("./homework-1.4/task4.js"));
const Homework21 = lazy(() => import("./homework-2.1/task.js"));
const Homework22 = lazy(() => import("./homework-2.2/phonebook.js"));
const Homework32 = lazy(() => import("./homework-3.2/images"));
const Homework4 = lazy(() => import("./homework-4/App"));
const Homework6 = lazy(() => import("./homework-6/phonebook.js"));
const Lab4 = lazy(() => import("./lab-4/lab.js"));
const Lab5 = lazy(() => import("./lab-5/lab.js"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <MainMenu />
            </Suspense>
          }
        />
        <Route
          path="homework-1.1"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Homework11 />
            </Suspense>
          }
        />
        <Route
          path="homework-1.2"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Homework12 />
            </Suspense>
          }
        />
        <Route
          path="homework-1.3"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Homework13 />
            </Suspense>
          }
        />
        <Route
          path="homework-1.4"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Homework14 />
            </Suspense>
          }
        />
        <Route
          path="homework-2.1"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Homework21 />
            </Suspense>
          }
        />
        <Route
          path="homework-2.2"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Homework22 />
            </Suspense>
          }
        />
        <Route
          path="homework-3.2"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Homework32 />
            </Suspense>
          }
        />
        <Route
          path="homework-4/*"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Homework4 />
            </Suspense>
          }
        />
        <Route
          path="homework-6"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Provider store={store__hw6}>
                <Homework6 />
              </Provider>
            </Suspense>
          }
        />
        <Route
          path="homework-7"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <MainMenu />
            </Suspense>
          }
        />
        <Route
          path="homework-8"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <MainMenu />
            </Suspense>
          }
        />
        <Route
          path="lab-4"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Provider store={store__lab4}>
                <Lab4 />
              </Provider>
            </Suspense>
          }
        />
        <Route
          path="lab-5"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Lab5 />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
