import { Component, Fragment, ReactNode } from "react";
import Canvas from "./components/Canvas";

export class App extends Component {

  render(): ReactNode {
      return (
        <Fragment>
          <h1>Paint App</h1>
          <Canvas />
        </Fragment>
      );
  }
}