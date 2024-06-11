import { Component, Fragment } from "react";
import { Toolbar } from "./components/Toolbar";
import Draw from "./app/Draw";
import React from "react";
import styled from "styled-components";
import { ContainerStyled } from "./components/Toolbar/styles";

interface AppState {
  color: string;
  thickness: number;
}

export class App extends Component<{}, AppState> {
  
  canvasRef: React.RefObject<HTMLCanvasElement>;
  draw: Draw | null = null;

  constructor(props: any) {
    super(props);
    this.canvasRef = React.createRef();
    this.state = {
      color: '#000000',
      thickness: 1
    };
  }

  componentDidMount() {
    this.draw = new Draw(this.canvasRef.current as HTMLCanvasElement);
  }

  componentDidUpdate(prevProps: {}, prevState: AppState) {
    if (this.draw && prevState.color !== this.state.color) {
      this.draw.setColor(this.state.color);
    }
    if (this.draw && prevState.thickness !== this.state.thickness) {
      this.draw.setThickness(this.state.thickness);
    }
  }

  onCanvasMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (this.draw !== null) {
      this.draw.startPainting(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    }
  };

  onCanvasMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (this.draw !== null) {
      this.draw.paint(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    }
  };

  onCanvasMouseUp = () => {
    if (this.draw !== null) {
      this.draw.stopPainting();
    }
  };

  onCanvasMouseLeave = () => {
    if (this.draw !== null) {
      this.draw.stopPainting();
    }
  };

  onClear = () => {
    if (this.draw !== null) {
      this.draw.clear();
    }
  };

  handleColorChange = (color: string) => {
    this.setState({ color });
  };

  handleThicknessChange = (thickness: number) => {
    this.setState({ thickness });
  };

  render() {
    return (
      <ContainerStyled>
        <CanvasStyled
          ref={this.canvasRef}
          onMouseDown={this.onCanvasMouseDown}
          onMouseMove={this.onCanvasMouseMove}
          onMouseUp={this.onCanvasMouseUp}
        />
        <Toolbar onClear={this.onClear} onThicknessChange={this.handleThicknessChange} onColorChange={this.handleColorChange} />
      </ContainerStyled>
    );
  }
};

const CanvasStyled = styled.canvas`
  border: 1px solid #000;
  cursor: crosshair;
  touch-action: none;
  outline: none;
  border: 2px solid #eee;
`;
