import { Component } from "react";
import { ToolbarStyled } from "./styles";
import { ColorPicker } from "./ColorPicker";
import { Thickness } from "./Thickness";

interface ToolbarProps {
  onClear: () => void;
  onColorChange: (color: string) => void;
  onThicknessChange: (value: number) => void;
}

export class Toolbar extends Component<ToolbarProps> {
  render() {
    return (
      <ToolbarStyled>
        
        <ColorPicker onColorChange={this.props.onColorChange} />

        <Thickness onThicknessChange={this.props.onThicknessChange} />

        <button onClick={this.props.onClear}>Limpar</button>

      </ToolbarStyled>
    );
  }
}
