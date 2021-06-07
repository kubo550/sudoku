import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;

    


    .buttons {
        display: flex;
        justify-content: space-between;
    }


    .numbers {
        display: grid;
        width: 100%;
        grid-template: repeat(3, 1fr) / repeat(3, 1fr) ;
        gap: 5px;


        div {
            width: 100%;
            background-color: grey;
            color: blue;
            height: 4em;
            
            display: flex;
            justify-content: center;
            align-items: center;

            &:hover{
                cursor: pointer;
            }
        }
        
    }

`