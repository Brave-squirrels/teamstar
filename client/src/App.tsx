import React from "react";

import ProtectedRoute from "./containers/protectedRoute/protectedRoute";

const Hello = () => {
  return <span>YO YO YO</span>;
};

const App = () => {
  return (
    <div className="App">
      <ProtectedRoute path="/test" component={Hello} />
    </div>
  );
};

export default App;
