import Button from '@/components/common/BlueButton';
import TimeTableModal from '@/components/common/TimetableModal';
import { useState } from 'react';

const Test = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    //**
    // padding: p-4
    // margin: m-4
    // text-color: text-red-500
    // border: border border-gray-300
    // hover:text-blue-500
    // rounded-md
    // bg-red-500: background-color: red
    // grid grid-cols-2: 2열로 그리드 나누기
    // gap-4: 그리드 간격 4
    //*/
    <div className="grid grid-cols-2 gap-4 p-4 m-4 text-white bg-red-500 rounded-md border border-gray-300 transition-all duration-200 hover:bg-red-600">
      <TimeTableModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Button handleSubmit={() => setIsOpen(true)} text="모달 켜기" />

      <div className="p-4 m-4 text-white bg-red-500 rounded-md border border-gray-300 transition-all duration-200 hover:bg-red-600">
        Test 2
      </div>
    </div>
  );
};

export default Test;
