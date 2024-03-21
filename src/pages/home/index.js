import { ActionBar, AddFormSection, CardsListSection, ListTitle, MainContainer, SearchControllSection } from "./style";

const Home = () => {

    return (
        <MainContainer>
            <ActionBar>
                <AddFormSection>
                    {/* Here comes the add form */}
                </AddFormSection>
                <SearchControllSection>
                    {/* Here comes the search controlls */}
                </SearchControllSection>
            </ActionBar>
            <>
                <ListTitle>Todo List :</ListTitle>
                <CardsListSection>
                    {/* Here comes the cards list */}
                </CardsListSection>
            </>
        </MainContainer>
    )
}

export default Home;