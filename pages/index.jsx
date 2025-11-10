import { useState } from 'react';
import EmployeeForm from '../components/EmployeeForm';
import EmployeesList from '../components/EmployeesList';
import StatsCards from '../components/StatsCards';
import { useEmployees } from '../hooks/useEmployees';

export default function Home() {
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const {
        employees,
        isLoading,
        error,
        createMutation,
        updateMutation,
        deleteMutation,
    } = useEmployees();

    const handleCreateEmployee = (employeeData) => {
        createMutation.mutate(employeeData, {
            onSuccess: () => {
                setShowForm(false);
                alert('Employee created successfully!');
            },
            onError: (error) => {
                alert('Error creating employee: ' + error.message);
            },
        });
    };

    const handleUpdateEmployee = (employeeData) => {
        updateMutation.mutate(
            { id: editingEmployee.id, data: employeeData },
            {
                onSuccess: () => {
                    setEditingEmployee(null);
                    setShowForm(false);
                    alert('Employee updated successfully!');
                },
                onError: (error) => {
                    alert('Error updating employee: ' + error.message);
                },
            }
        );
    };

    const handleEdit = (employee) => {
        setEditingEmployee(employee);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this employee?')) {
            deleteMutation.mutate(id, {
                onError: (error) => {
                    alert('Error deleting employee: ' + error.message);
                },
            });
        }
    };

    const handleFormSubmit = (formData) => {
        if (editingEmployee) {
            handleUpdateEmployee(formData);
        } else {
            handleCreateEmployee(formData);
        }
    };

    const handleCancelForm = () => {
        setEditingEmployee(null);
        setShowForm(false);
    };

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    Error loading employees: {error.message}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Employee Management System
                    </h1>
                    <p className="text-gray-600">
                        Manage your employees with CRUD operations
                    </p>
                </div>

                <div className="mb-6 text-center">
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition duration-200"
                    >
                        Add New Employee
                    </button>
                </div>

                {showForm && (
                    <EmployeeForm
                        onSubmit={handleFormSubmit}
                        onCancel={handleCancelForm}
                        initialData={editingEmployee}
                        isEditing={!!editingEmployee}
                        isLoading={createMutation.isLoading || updateMutation.isLoading}
                    />
                )}

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Employees List
                        </h2>
                    </div>
                    <EmployeesList
                        employees={employees}
                        isLoading={isLoading}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        isDeleting={deleteMutation.isLoading}
                    />
                </div>

                <StatsCards
                    totalEmployees={employees.length}
                    systemStatus={createMutation.isLoading || updateMutation.isLoading ? 'Processing...' : 'Ready'}
                    latestId={employees.length > 0 ? employees[employees.length - 1]?.id : '0'}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
}