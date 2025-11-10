import { useEffect, useState } from 'react';

const EmployeeForm = ({
    onSubmit,
    onCancel,
    initialData = null,
    isEditing = false,
    isLoading = false
}) => {
    const [formData, setFormData] = useState({ name: '', address: '' });

    useEffect(() => {
        if (initialData) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormData({
                name: initialData.name || '',
                address: initialData.address || ''
            });
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.address) {
            alert('Please fill all fields');
            return;
        }
        onSubmit(formData);
    };

    const handleReset = () => {
        setFormData({ name: '', address: '' });
        onCancel();
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
                {isEditing ? 'Edit Employee' : 'Add New Employee'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter employee name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                    </label>
                    <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter employee address"
                    />
                </div>
                <div className="flex space-x-3">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium disabled:opacity-50"
                    >
                        {isLoading ? 'Saving...' : (isEditing ? 'Update' : 'Create')} Employee
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md font-medium"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;