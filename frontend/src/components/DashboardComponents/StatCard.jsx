export const StatCard = ({ title, value, icon: Icon, color, trend }) => {
    return (
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
          <div className={`${color} p-2 rounded-lg`}>
            <Icon className="w-4 h-4 text-white" />
          </div>
        </div>
        <div className="mt-3 flex items-center text-sm">
          <span className="text-green-500 font-medium">{trend}</span>
          <span className="text-gray-500 ml-1">this month</span>
        </div>
      </div>
    );
  };
export default StatCard;  