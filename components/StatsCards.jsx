const StatsCards = ({
    totalEmployees,
    systemStatus,
    latestId,
    isLoading = false
}) => {
    return (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                    {isLoading ? '...' : totalEmployees}
                </div>
                <div className="text-gray-600">Total Employees</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                    {systemStatus}
                </div>
                <div className="text-gray-600">System Status</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                    {latestId}
                </div>
                <div className="text-gray-600">Latest ID</div>
            </div>
        </div>
    );
};

export default StatsCards;