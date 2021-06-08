import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;

  margin: 0 5px;

  .buttons {
    display: flex;
    justify-content: space-evenly;

    div {
        background-color: #eaeef4;
        padding: 5px;
        transition: 0.3s ease all;
        color: #0072e3;
        border-radius: 50%;
    
        display: flex;
        justify-content: center;
        align-items: center;
    
        &:hover {
          cursor: pointer;
          background-color: #d9cce3;
        }
        
    }
  }

  .numbers {
    width: 100%;
    display: flex;
    justify-content: space-evenly;

    
    @media (min-width: 720px) {
      display: grid;
      grid-template: repeat(3, 1fr) / repeat(3, 1fr);
      gap: 5px;
    }

  }
`;

interface NumberBtnProps {
  hidden: boolean;
}

export const NumberBtn = styled.div<NumberBtnProps>`

  width: 100%;
  color: blue;
  transition: 0.3s ease background-color;
  color: #0072e3;
  
  display: flex;
  opacity: ${({ hidden }) => hidden ? '0' : '1'};
  justify-content: center;
  align-items: center;
  font-weight: 400;

 
  @media (min-width: 720px) {
    background-color: #eaeef4;
    font-size: 3.4em;
    font-weight: 300;
    height: 2em;
  }

   @media (max-width: 960px) {
    font-size: 2.4em;
    height: 2em;
  }


  &:hover {
    cursor: ${({ hidden }) => hidden ? 'default' : 'pointer'};
  @media (min-width: 720px) {

    background-color: #d9cce3;
  }
  }


`