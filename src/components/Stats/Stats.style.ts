import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    max-width: 100%;
    margin-bottom: 10px ;
    
    
        @media (min-width: 620px) {
            min-width: 456px;
            width: 90%;
            margin-bottom: 20px;
        }
        
    div {
        text-align: center;
    }

    #auto-check {
        display: none;
        
        @media (min-width: 620px) {
        display: inline-block;
    }
    }

`