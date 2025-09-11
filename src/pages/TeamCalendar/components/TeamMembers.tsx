import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Settings } from 'lucide-react';
import { mockMembers } from '@/mockdata/teamData';
import SearchBar from '@/components/atoms/SearchBar';

const TeamMembers: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const LAST_NAME = (name: string) => name[0];
  const FULL_NAME = (name: string) => name;

  return (
    <div className="mb-8">
      <div className="flex justify-between cursor-pointer">
        <div className="flex items-center space-x-3" onClick={() => setIsOpen(!isOpen)}>
          <span className="text-lg font-semibold text-gray-800">팀원</span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-blue-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-blue-500" />
          )}
        </div>
        <button className="text-gray-400 hover:text-blue-600 transition-colors duration-200 p-2 hover:bg-blue-50 rounded-full">
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {isOpen && (
        <div className="mt-4">
          <SearchBar placeholder="팀원 검색하기" />
        </div>
      )}

      {isOpen && (
        <div className="mt-4 max-h-60 overflow-y-auto space-y-2">
          {mockMembers.map((member) => (
            <div className="flex items-center justify-between py-2 px-3 hover:bg-blue-50 rounded-xl transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 text-sm font-semibold shadow-sm">
                    {LAST_NAME(member.name)}
                  </div>
                  <div
                    className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                      member.status === '온라인' ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800">{FULL_NAME(member.name)}</div>
                  <div
                    className={`text-xs font-medium ${
                      member.status === '온라인' ? 'text-emerald-600' : 'text-amber-600'
                    }`}
                  >
                    {member.status}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamMembers;
