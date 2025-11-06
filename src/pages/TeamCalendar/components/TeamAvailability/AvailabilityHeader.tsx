import Button from '@/components/atoms/Button';

interface AvailabilityHeaderProps {
  onBack?: () => void;
}

const AvailabilityHeader: React.FC<AvailabilityHeaderProps> = ({ onBack }) => {
  return (
    <div className="flex justify-between items-center pl-4 mb-2 h-16">
      <p className="text-lg font-bold text-nowrap text-mainBlue md:text-2xl">팀원 가용성 현황</p>
      <Button
        onClick={onBack}
        text="캘린더로 돌아가기"
        fullWidth={false}
        wrapperClassName="mx-0 text-nowrap"
        className="cursor-pointer"
      />
    </div>
  );
};
export default AvailabilityHeader;
