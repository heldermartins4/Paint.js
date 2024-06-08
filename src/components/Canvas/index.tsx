import React from "react";

import Draw from "../../app/Draw";

import { CanvasStyled } from "./styles";

class Canvas extends React.Component {

  canvasRef: React.RefObject<HTMLCanvasElement>;
  draw: Draw | null = null;

  constructor(props: any) {
    super(props);
    this.canvasRef = React.createRef();
  };

  componentDidMount() {
    this.draw = new Draw(this.canvasRef.current as HTMLCanvasElement);
  }

  onCanvasMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (this.draw !== null) {
      this.draw.startPainting(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    }
  }

  onCanvasMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (this.draw !== null) {
      this.draw.paint(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    }
  }

  onCanvasMouseUp = () => {
    if (this.draw !== null) {
      this.draw.stopPainting();
    }
  }

  onCanvasMouseLeave = () => {
    if (this.draw !== null) {
      this.draw.stopPainting();
    }
  }

  render() {
    return (
      <CanvasStyled 
        ref={this.canvasRef} 
        onMouseDown={this.onCanvasMouseDown}
        onMouseMove={this.onCanvasMouseMove}
        onMouseUp={this.onCanvasMouseUp}
      />
    );
  }
}

export default Canvas;