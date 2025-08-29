const Test = () => {
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
    <div className="grid grid-cols-2 gap-4 p-4 m-4 text-red-500 bg-red-500 rounded-md border border-gray-300 hover:text-blue-500">
      <div className="p-4 m-4 bg-blue-500 rounded-md border border-gray-300">Test</div>
      <div className="p-4 m-4 text-red-500 bg-red-500 rounded-md border border-gray-300 hover:text-blue-500">
        Test
      </div>
    </div>
  );
};

export default Test;
