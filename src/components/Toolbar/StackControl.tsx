import React from "react";
// import { Command } from "../../presenters/ICommand";
import Draw from "../../app/Draw";
import RedoCommand from "../../app/Command/Redo";
import UndoCommand from "../../app/Command/Undo";
import { StackControlStyled } from "./styles";

export class StackControl extends React.Component<{ draw: Draw }> {

    undo: UndoCommand;
    redo: RedoCommand;

    constructor(props: { draw: Draw }) {

        super(props);
        this.undo = new UndoCommand(props.draw);
        this.redo = new RedoCommand(props.draw);
    }

    render() {
        return (
            <StackControlStyled>
                <button onClick={() => this.undo.execute()}>↶ Voltar</button>
                <button onClick={() => this.redo.execute()}>↷ Avançar</button>
            </StackControlStyled>
        );
    }
};

export default StackControl;