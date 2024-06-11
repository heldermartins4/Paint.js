import styled from "styled-components";

export const ContainerStyled = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const ToolbarStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    justify-content: space-between;
    background: #e7e7e7;

    margin: 0 auto;

    max-width: 800px;
`;

export const InputColor = styled.input<{ props?: any }>`
    width: 30px;
    height: 30px;
    border: none;
    outline: none;
    border-radius: 50%;
    cursor: pointer;
    background-color: ${(props) => props.color};
    appearance: none;
    -webkit-appearance: none; 

    &:hover {
        filter: brightness(90%);
    };

    &:active {
        filter: brightness(80%);
    };

    &::-webkit-color-swatch {
        border: none;
        border-radius: 50%;
    };

    &::-webkit-color-swatch-wrapper {
        border: none;
        border-radius: 50%;
    };
`;