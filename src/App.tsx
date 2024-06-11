import React, { Component, Fragment } from "react";
import { Toolbar } from "./components/Toolbar";
import Draw from "./app/Draw";
import styled from "styled-components";
import { ContainerStyled } from "./components/Toolbar/styles";

interface AppState {
  color: string;
  thickness: number;
  draw: Draw | null;
}

export class App extends Component<{}, AppState> {
  canvasRef: React.RefObject<HTMLCanvasElement>;

  constructor(props: any) {
    super(props);
    this.canvasRef = React.createRef();
    this.state = {
      color: '#000000',
      thickness: 1,
      draw: null
    };
  }

  componentDidMount() {
    const draw = new Draw(this.canvasRef.current as HTMLCanvasElement);
    this.setState({ draw });
  }

  componentDidUpdate(prevProps: {}, prevState: AppState) {
    if (this.state.draw) {
      if (prevState.color !== this.state.color) {
        this.state.draw.setColor(this.state.color);
      }
      if (prevState.thickness !== this.state.thickness) {
        this.state.draw.setThickness(this.state.thickness);
      }
    }
  }

  onCanvasMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (this.state.draw) {
      this.state.draw.startPainting(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    }
  };

  onCanvasMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (this.state.draw) {
      this.state.draw.paint(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    }
  };

  onCanvasMouseUp = () => {
    if (this.state.draw) {
      this.state.draw.stopPainting();
    }
  };

  onCanvasMouseLeave = () => {
    if (this.state.draw) {
      this.state.draw.stopPainting();
    }
  };

  onClear = () => {
    if (this.state.draw) {
      this.state.draw.clear();
    }
  };

  handleColorChange = (color: string) => {
    this.setState({ color });
  };

  handleThicknessChange = (thickness: number) => {
    this.setState({ thickness });
  };

  saveDrawing = () => {
    if (this.state.draw) {
      const drawing = this.state.draw.lines;
      const jsondata = JSON.stringify({ data: drawing });
      const blob = new Blob([jsondata], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "drawing.pnt";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  loadDrawing = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result as string;
        const drawing = JSON.parse(data).data;
        if (this.state.draw) {
          this.state.draw.clear();
          this.state.draw.lines = drawing;
          this.state.draw.lines.forEach((lines: any) => {
            lines.forEach((line: any) => {
              this.state.draw?.drawLine(line.x1, line.y1, line.x2, line.y2, line.color, line.thickness);
            });
          });
        }
      };
      reader.readAsText(file);
    }
  };

  render() {
    return (
      <ContainerStyled>
        <CanvasStyled
          ref={this.canvasRef}
          onMouseDown={this.onCanvasMouseDown}
          onMouseMove={this.onCanvasMouseMove}
          onMouseUp={this.onCanvasMouseUp}
          onMouseLeave={this.onCanvasMouseLeave}
        />
        {this.state.draw && (
          <Toolbar
            onClear={this.onClear}
            onThicknessChange={this.handleThicknessChange}
            onColorChange={this.handleColorChange}
            draw={this.state.draw}
          />
        )}
        <button onClick={this.saveDrawing}>Salvar</button>
        <input type="file" accept=".pnt" onChange={this.loadDrawing} />
      </ContainerStyled>
    );
  }
}

const CanvasStyled = styled.canvas`
  border: 1px solid #000;
  cursor: crosshair;
  touch-action: none;
  outline: none;
  border: 2px solid #eee;
`;