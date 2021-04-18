import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchData } from "./reduxState/test/test";

const App = () => {
  const dispatch = useDispatch();
  console.log("test", process.env.NODE_ENV);

  const testData = useSelector((state) => state.testData);

  useEffect(() => {
    dispatch(fetchData());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div className="App">{testData.data.title}</div>;
};

export default App;
