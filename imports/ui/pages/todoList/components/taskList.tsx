import React from "react";
import { Paper, List, Tooltip, Avatar, Typography, Pagination, Card, Box, Chip } from "@mui/material";
import { useTasks } from "/imports/providers/taskProvider";
import { useNavigate } from "react-router-dom";
import { TaskStatusModel } from "/imports/api/Tasks/TaskModel";
import { LoadingScreen } from "/imports/ui/components/loadingScreen";

interface ITaskListProps {
    detailedTable: boolean;
    userId?: string
}

const TaskList: React.FC<ITaskListProps> = React.memo(({ detailedTable }) => {

    const { tasks, page, totalPages, setHideCompleted, setPage, setSearch, isLoadingTasks } = useTasks();
    const editTaskNavigate = useNavigate();

    const decodeStatus = (status: TaskStatusModel): { status: string, color: string } => {
        switch (status) {
            case TaskStatusModel.REGISTERED:
                return { status: 'Cadastrada', color: 'red' };
            case TaskStatusModel.IN_PROGRESS:
                return { status: 'Em Andamento', color: 'orange' };
            case TaskStatusModel.COMPLETED:
                return { status: 'Concluída', color: 'green' };
            default:
                return { status: '', color: '' };
        }
    };

    React.useEffect(() => {
        if (!detailedTable) {
            setPage(1);
            setHideCompleted(false);
            setSearch('');
        }
    }, [detailedTable]);

    const transformDate = (date: Date) => {
        const temp = date.toISOString().split('T')[0];
        return `${temp.split('-')[2]}/${temp.split('-')[1]}/${temp.split('-')[0]}`
    }

    if (isLoadingTasks) {
        return <LoadingScreen />
    }

    return (
        <Box component={Paper} sx={{ width: '95%', margin: 'auto', marginTop: 2, overflowX: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <List>
                {tasks.map((task) => (
                    <Card
                        key={task._id}
                        sx={{
                            m: 2,
                            borderRadius: 2,
                            boxShadow: 3,
                            transition: "0.3s",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: 2,
                            minHeight: 80,
                            "&:hover": detailedTable
                                ? {
                                    boxShadow: 6,
                                    cursor: "pointer",
                                    transform: "scale(1.02)",
                                }
                                : undefined,
                        }}
                        onClick={detailedTable ? () => editTaskNavigate(`/todo-list/edit/${task._id}`) : undefined}
                    >
                        {/* Avatar e Nome */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, minWidth: 200 }}>
                            <Tooltip title={`Dono: ${task.userName || "Desconhecido"}`} arrow>
                                <Avatar alt={task.userName} src={task.ownerImg} />
                            </Tooltip>
                            <Typography variant="h6" sx={{ fontWeight: "bold", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 150 }}>
                                {task.title}
                            </Typography>
                        </Box>

                        {/* Descrição e Data */}
                        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1, justifyContent: "space-between", mx: 2 }}>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    maxWidth: "50%",
                                }}
                            >
                                {task.description}
                            </Typography>

                            {task.due && (
                                <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120, textAlign: "right" }}>
                                    📅 {transformDate(task.due)}
                                </Typography>
                            )}
                        </Box>

                        {/* Status no canto direito */}
                        <Chip
                            label={decodeStatus(task.status).status}
                            sx={{
                                backgroundColor: decodeStatus(task.status).color,
                                color: "#fff",
                                fontWeight: "bold",
                                minWidth: 120,
                                textAlign: "center",
                            }}
                        />
                    </Card>
                ))}
            </List>


            {detailedTable &&
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_: React.ChangeEvent<unknown>, value: number) => setPage(value)}
                />
            }
        </Box>
    );
});

export { TaskList };
