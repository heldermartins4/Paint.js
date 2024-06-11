import { Component } from "react";
import { ToolbarStyled } from "./styles";
import { ColorPicker } from "./ColorPicker";
import { Thickness } from "./Thickness";
import StackControl from "./StackControl";
import Draw from "../../app/Draw";

interface ToolbarProps {
  onClear: () => void;
  onColorChange: (color: string) => void;
  onThicknessChange: (value: number) => void;
  draw: Draw;
}

export class Toolbar extends Component<ToolbarProps> {
  render() {
    return (
      <ToolbarStyled>
        
        <ColorPicker onColorChange={this.props.onColorChange} />

        <Thickness onThicknessChange={this.props.onThicknessChange} />

        <StackControl draw={this.props.draw} />

        <button onClick={this.props.onClear}>Limpar</button>

      </ToolbarStyled>
    );
  }
}
