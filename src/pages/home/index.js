import React from "react";
const AddForm = React.lazy(() => import("addForm/addForm"));
const FilterForm = React.lazy(() => import("filterSection/filterSection"));
const List = React.lazy(() => import("list/list"));
import { ActionBar, AddFormSection, CardsListSection, ListTitle, MainContainer, SearchControllSection } from "./style";

const Home = () => {

    return (
        <MainContainer>
            <ActionBar>
                <AddFormSection>
                    <AddForm/>
                </AddFormSection>
                <SearchControllSection>
                    <FilterForm/>
                </SearchControllSection>
            </ActionBar>
            <>
                <ListTitle>Todo List :</ListTitle>
                <CardsListSection>
                    <List/>
                </CardsListSection>
            </>
        </MainContainer>
    )
}

export default Home;