import React, { Component, createRef } from "react";
import Draw from "./app/Draw";
import styled from "styled-components";
import { ContainerStyled } from "./components/Toolbar/styles";
import { Toolbar } from "./components/Toolbar";

interface AppState {
  color: string;
  thickness: number;
  draw: Draw | null;
}

export class App extends Component<{}, AppState> {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  inputRef: React.RefObject<HTMLInputElement>;

  constructor(props: any) {
    super(props);
    this.canvasRef = createRef();
    this.inputRef = createRef();
    this.state = {
      color: '#000000',
      thickness: 1,
      draw: null
    };
  }

  componentDidMount() {
    const draw = new Draw(this.canvasRef.current as HTMLCanvasElement);
    this.setState({ draw });

    // ipcRenderer.on("saveFile", this.saveDrawing);
    // ipcRenderer.on("openFile", this.triggerFileInput);
    // ipcRenderer.on("changeColor", (event, { color }) => this.handleColorChange(color));
  }

  // componentWillUnmount() {
  //   ipcRenderer.removeAllListeners("saveFile");
  //   ipcRenderer.removeAllListeners("openFile");
  // }


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
  }

  onCanvasMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (this.state.draw) {
      this.state.draw.paint(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    }
  }

  onCanvasMouseUp = () => {
    if (this.state.draw) {
      this.state.draw.stopPainting();
    }
  }

  onCanvasMouseLeave = () => {
    if (this.state.draw) {
      this.state.draw.stopPainting();
    }
  }

  onClear = () => {
    if (this.state.draw) {
      this.state.draw.clear();
    }
  }

  handleColorChange = (color: string) => {
    this.setState({ color });
  }

  handleThicknessChange = (thickness: number) => {
    this.setState({ thickness });
  }

  saveDrawing = () => {
    try {
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
    } catch (error) {
      console.error('Error saving drawing:', error);
    }
  }

  triggerFileInput = () => {
    try {
      if (this.inputRef.current) {
        this.inputRef.current.click();
      }
    } catch (error) {
      console.error('Error triggering file input:', error);
    }
  };

  loadDrawing = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
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
        } catch (error) {
          console.error('Error loading drawing:', error);
        }
      };
      reader.readAsText(file);
    } else {
      console.error('No file selected');
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
        <input
          type="file"
          accept=".pnt"
          // value={'Insira um arquivo'}
          ref={this.inputRef}
          onChange={this.loadDrawing}
        />
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

export default App;