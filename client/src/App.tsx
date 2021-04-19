import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchData } from "./reduxState/test/test";

import { RootState } from "./reduxState/store";

const App = () => {
  const dispatch = useDispatch();

  const testData = useSelector((state: RootState) => state.testData);

  useEffect(() => {
    dispatch(fetchData());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div className="App">{testData.data.title}</div>;
};

export default App;
