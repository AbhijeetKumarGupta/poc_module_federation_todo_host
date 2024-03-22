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

    const getUpdatedData = (id, value) => {
        const updatedDoneDataTD = todoData.map(
            (item) => {
                if (Number(item?.id) === Number(id)) {
                    item.completed = value
                }
                return item
            }
        )
        const updatedDoneDataBTD = backupTodoData.map(
            (item) => {
                if (Number(item?.id) === Number(id)) {
                    item.completed = value
                }
                return item
            }
        )
        return {updatedDoneDataTD, updatedDoneDataBTD}
    }

    const handleRemove = (e) => {
        const payload = e.target.id
        setTodoData((prev) => prev.filter(
            (item) => Number(item?.id) !== Number(payload)
        ))
        setBackupTodoData((prev) => prev.filter(
            (item) => Number(item?.id) !== Number(payload)
        ))
        e.preventDefault()
    };

    const handleMarkAsDoneOrOpen = (e, value) => {
        const {updatedDoneDataTD, updatedDoneDataBTD} = getUpdatedData(e.target.id, value)
        setTodoData(updatedDoneDataTD)
        setBackupTodoData(updatedDoneDataBTD)
        e.preventDefault()
    }

    const handleView = (e) => {
        navigate(`/${e.target.id}`)
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
                    <List 
                        todoData={todoData} 
                        handleRemove={handleRemove}
                        handleMarkAsDoneOrOpen={handleMarkAsDoneOrOpen}
                        handleView={handleView}
                    />
                </CardsListSection>
            </>
        </MainContainer>
    )
}

export default Home;