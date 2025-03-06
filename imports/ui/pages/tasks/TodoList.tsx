import React from "react";
import { Box, CircularProgress } from "@mui/material"
import { MyAppBar } from "../../component/MyAppBar";
import { User } from "/imports/api/user/UserTypes";
import { TodoTable } from "./todoTable/todoTable";
import { Task } from "/imports/api/Tasks/TaskTypes";

interface ITodoList {
    user: User,
    tasks: Task[],
    isLoading: boolean,
}

const TodoList: React.FC<ITodoList> = ({ user, tasks, isLoading }) => {

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <MyAppBar name={user.profile.name} />
            <TodoTable actionsOn={true} tasks={tasks} />
        </Box>
    )
}

export { TodoList }