import React, { useEffect, useState } from "react";
const AddForm = React.lazy(() => import("addForm/addForm"));
const FilterForm = React.lazy(() => import("filterSection/filterSection"));
const List = React.lazy(() => import("list/list"));
import { ActionBar, AddFormSection, CardsListSection, ListTitle, MainContainer, SearchControllSection } from "./style";

const Home = () => {
    const [todoData, setTodoData] = useState([])
    const [backupTodoData, setBackupTodoData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => { 
        fetch(`https://jsonplaceholder.typicode.com/todos`)
            .then((res) => res.json())
            .then((result) => {
                setTodoData(result);
                setBackupTodoData(result)
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

    const handleFilterApplied = (e, searchText, status) => {
        let data = backupTodoData;
        if(searchText || status){
            if(searchText){
                data = backupTodoData?.filter((todo) => todo?.title?.toLowerCase().includes(searchText?.toLowerCase()))
            }
            if(status){ 
                data = data?.filter((todo) => status === todo?.completed?.toString())
            }
        }
        setTodoData(data);
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
                    <FilterForm handleFilterApplied={handleFilterApplied}/>
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