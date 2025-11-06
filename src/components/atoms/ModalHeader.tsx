const ModalHeader = ({ title }: { title: string }) => {
  return (
    <div className="p-2">
      <h2 className="flex justify-center text-xl font-bold text-gray-900">{title}</h2>
    </div>
  );
};

export default ModalHeader;
