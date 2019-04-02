import React, { Component } from "react";
import ReactDOM from "react-dom";
import RequestDemo from './request-demo';

const App = () => {
  return (
    <div>
      <RequestDemo />
    </div>
  );
};

// export default App;

ReactDOM.render(<App />, document.getElementById("app"));
