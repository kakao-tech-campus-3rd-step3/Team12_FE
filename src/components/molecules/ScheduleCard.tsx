import type { ReactNode } from 'react';

interface ScheduleCardProps {
  title: string;
  dateTime: string;
  description?: string;
  descriptionIcon?: ReactNode;
  dDay?: number;
}

export const ScheduleCard = ({
  title,
  dateTime,
  description,
  descriptionIcon,
  dDay,
}: ScheduleCardProps) => {
  return (
    <div className="flex flex-row justify-between items-center p-3 bg-white rounded-lg border border-mainBlue/70 shadow-md">
      <div className="space-y-1 flex-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{title}</p>
          {dDay !== undefined && (
            <div
              className={`flex gap-1 items-center px-2 py-0.5 rounded ${
                dDay <= 1 ? 'bg-red-100/80' : 'bg-gray-100/80'
              }`}
            >
              <p className={`text-xs font-medium ${dDay <= 1 ? 'text-red-500' : 'text-gray-500'}`}>
                D-{dDay}
              </p>
            </div>
          )}
        </div>
        <p className="text-xs text-gray-600">{dateTime}</p>
        {description && (
          <p className="flex gap-1 items-center text-xs text-gray-400">
            {descriptionIcon}
            {description}
          </p>
        )}
      </div>
    </div>
  );
};
