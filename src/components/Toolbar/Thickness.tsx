import { Component } from "react";
import { InputColor } from "./styles";

interface ThicknessProps {
  value?: number;
  onThicknessChange: (value: number) => void;
}

interface ThicknessState {
  value: number;
}

export class Thickness extends Component<ThicknessProps, ThicknessState> {
  constructor(props: ThicknessProps) {
    super(props);
    this.state = {
      value: props.value || 1
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newThickness = Number(e.target.value);
    this.setState({ value: newThickness });
    this.props.onThicknessChange(newThickness);
  };

  render() {
    return (
      <>
        {this.state.value}px
        <input
        type="range"
        value={this.state.value}
        onChange={this.handleChange}
      />
      </>
    );
  }
}
