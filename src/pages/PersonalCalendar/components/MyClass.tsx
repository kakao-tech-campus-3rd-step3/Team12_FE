import { classes } from '@/mockdata/scheduleData';

const MyClass = () => {
  return (
    <div className="px-3 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">내 수업 ({classes.length})</h3>
        <button className="p-1 text-sm rounded-md text-mainBlue hover:text-mainBlue/80">
          설정
        </button>
      </div>
      <div className="space-y-3">
        {classes.map((classItem, index) => (
          <div key={index} className="flex justify-between items-center p-2 pl-0 rounded-lg">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${classItem.color} mr-2`} />
              <div>
                <p className="text-xs font-medium text-gray-800">{classItem.name}</p>
                <p className="text-xs text-gray-500">{classItem.instructor}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyClass;
