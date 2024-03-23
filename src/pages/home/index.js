import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ActionBar, AddFormSection, CardsListSection, ListTitle, MainContainer, SearchControllSection } from "./style";
const AddForm = React.lazy(() => import("addForm/index"));
const FilterForm = React.lazy(() => import("filterSection/index"));
const List = React.lazy(() => import("list/index"));

const Home = () => {
    const [todoData, setTodoData] = useState([])
    const [backupTodoData, setBackupTodoData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => { 
        fetch(`https://jsonplaceholder.typicode.com/todos`)
            .then((res) => res.json())
            .then((result) => {
                setTodoData(result || []);
                setBackupTodoData(result)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
  
    const handleAdd = (e, newData) => {
        if(newData?.title){
            setError("")
            setTodoData((prev) => [
                newData,
                ...prev
            ])
            setBackupTodoData((prev) => [
                newData,
                ...prev
            ])
        }else{
            setError("Cannot create an empty todo")
        }
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

    const handleView = (e, url) => {
        navigate(url)
        e.preventDefault()
    }

    if(loading) return <span style={{color:"red"}}>Loading...</span>

    return (
        <MainContainer>
            <ActionBar>
                <AddFormSection>
                    <AddForm error={error} handleAdd={handleAdd}/>
                </AddFormSection>
                <SearchControllSection>
                    <FilterForm handleFilterApplied={handleFilterApplied}/>
                </SearchControllSection>
            </ActionBar>
            <>
                <ListTitle>Todo List :</ListTitle>
                <CardsListSection>
                    <List 
                        todoData={todoData} 
                        setTodoData={setTodoData}
                        backupTodoData={backupTodoData}
                        setBackupTodoData={setBackupTodoData}
                        handleView={handleView}
                    />
                </CardsListSection>
            </>
        </MainContainer>
    )
}

export default Home;