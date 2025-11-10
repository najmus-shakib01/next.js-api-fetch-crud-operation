import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { employeeAPI } from '../utils/api';

export const useEmployees = () => {
    const queryClient = useQueryClient();

    const { data: employees = [], isLoading, error } = useQuery({
        queryKey: ['employees'],
        queryFn: employeeAPI.getAllEmployees,
    });

    const createMutation = useMutation({
        mutationFn: employeeAPI.createEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries(['employees']);
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => employeeAPI.updateEmployee(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['employees']);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: employeeAPI.deleteEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries(['employees']);
        },
    });

    return {
        employees,
        isLoading,
        error,
        createMutation,
        updateMutation,
        deleteMutation,
    };
};