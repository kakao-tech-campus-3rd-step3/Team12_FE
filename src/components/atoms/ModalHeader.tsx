const ModalHeader = ({ title }: { title: string }) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>

      {/* 진행 단계 표시 */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className={`w-4 h-4 bg-black rounded-full`} />
        ))}
      </div>
    </div>
  );
};

export default ModalHeader;
