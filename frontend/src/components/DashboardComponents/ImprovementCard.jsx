const ImprovementCard = ({ area, action }) => {
    return (
      <div className="flex gap-3 p-2 bg-white rounded border-l-4 border-amber-500">
        <div className="flex-grow">
          <p className="font-medium text-gray-800">{area}</p>
          <p className="text-sm text-gray-500">{action}</p>
        </div>
        <Button variant="ghost" size="sm" className="text-indigo-600">
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    );
  };
  