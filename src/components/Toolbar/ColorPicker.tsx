import { Component } from "react";
import { InputColor } from "./styles";

interface ColorPickerProps {
  color?: string;
  onColorChange: (color: string) => void;
}

interface ColorPickerState {
  color: string;
}

export class ColorPicker extends Component<ColorPickerProps, ColorPickerState> {
  constructor(props: ColorPickerProps) {
    super(props);
    this.state = {
      color: props.color || "#000000"
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    this.setState({ color: newColor });
    this.props.onColorChange(newColor);
  };

  render() {
    return (
      <InputColor
        type="color"
        value={this.state.color}
        onChange={this.handleChange}
      />
    );
  }
}
