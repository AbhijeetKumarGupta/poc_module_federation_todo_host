import React, {Suspense} from 'react';
import { useNavigate, useParams } from "react-router";
import { DetailsContainer, DetailsHeader } from "./style"
const Details = React.lazy(() => import("details/index"));

const TodoDetails = () => {
    const {todoId} = useParams()
    const navigate = useNavigate()

    const handleGoBack = () => {
        navigate("/")
    }

    return (
        <DetailsContainer>
            <DetailsHeader>Task Details</DetailsHeader>
            <Suspense fallback={<>Loading...</>}>
                <Details todoId={todoId} handleGoBack={handleGoBack}/>
            </Suspense>
        </DetailsContainer>
    )
}

export default TodoDetails