import styled from "styled-components";

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const ActionBar = styled.div`
    display: flex;
    height: 30vh;
    align-items: center;
`

export const AddFormSection = styled.div`
    display: flex;
    align-items: center;
    border: 2px solid white;
    width: 50%;
    height: 26vh;
`

export const SearchControllSection = styled.div`
    display: flex;
    align-items: center;
    border: 2px solid white;
    width: 50%;
    height: 26vh;
`
export const ListTitle = styled.h2`
    color: white;
    margin: 0;
`

export const CardsListSection = styled.div`
    display: flex;
    flex-wrap: wrap;
    border: 2px solid white;
    padding-top: 10px;
    height: 60vh;
    overflow-y: auto;
`