import { useState } from 'react';
import { Send } from 'lucide-react';
import Button from '@/components/atoms/Button';

interface Message {
  id: number;
  userName: string;
  message: string;
  timestamp: string;
  isMe: boolean;
}

const TeamChat = () => {
  return (
    <div className="flex flex-col w-full h-full rounded-xl shadow-lg border border-gray-200 bg-white">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-5 py-3 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div>
            <h3 className="text-base font-semibold text-gray-900">팀 채팅</h3>
            <p className="text-xs text-gray-500">팀원 4명</p>
          </div>
        </div>
      </div>

      {/* 메시지 목록 */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
        {
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <p className="text-sm">아직 메시지가 없습니다</p>
            <p className="text-xs mt-1">첫 메시지를 보내보세요!</p>
          </div>
        }
      </div>

      {/* 입력 영역 */}
      <div className="px-3 py-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="메시지 보내기"
            className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full text-gray-800 placeholder-gray-400 focus:outline-none transition-all"
          />
          <Button
            icon={<Send className="w-5 h-5 rotate-45 -ml-1" />}
            className="p-y-2 rounded-full text-white shadow-md justify-center"
            noWrapper
          />
        </div>
      </div>
    </div>
  );
};

export default TeamChat;
