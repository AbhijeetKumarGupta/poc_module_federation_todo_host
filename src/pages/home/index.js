import React, { useEffect, useState } from "react";
const AddForm = React.lazy(() => import("addForm/addForm"));
const FilterForm = React.lazy(() => import("filterSection/filterSection"));
const List = React.lazy(() => import("list/list"));
import { ActionBar, AddFormSection, CardsListSection, ListTitle, MainContainer, SearchControllSection } from "./style";

const Home = () => {
    const [todoData, setTodoData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => { 
        fetch(`https://jsonplaceholder.typicode.com/todos`)
            .then((res) => res.json())
            .then((result) => {
                setTodoData(result);
                setLoading(false)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
  
    const handleAdd = (e, todoTitle) => {
        setTodoData((prev) => [
            {
                userId: new Date().getTime(),
                id: new Date().getTime(),
                title: todoTitle,
                completed: false,
                isDummy: true
            },
            ...prev
        ])
        e.preventDefault()
    }

    if(loading) return <span style={{color:"red"}}>Loading...</span>

    return (
        <MainContainer>
            <ActionBar>
                <AddFormSection>
                    <AddForm handleAdd={handleAdd}/>
                </AddFormSection>
                <SearchControllSection>
                    <FilterForm/>
                </SearchControllSection>
            </ActionBar>
            <>
                <ListTitle>Todo List :</ListTitle>
                <CardsListSection>
                    <List todoData={todoData}/>
                </CardsListSection>
            </>
        </MainContainer>
    )
}

export default Home;