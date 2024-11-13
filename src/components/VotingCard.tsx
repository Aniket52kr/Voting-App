import React from 'react';
import { Candidate } from '../types';
import { Check } from 'lucide-react';

interface VotingCardProps {
  candidate: Candidate;
  onVote: (id: string) => void;
  disabled: boolean;
}

export const VotingCard: React.FC<VotingCardProps> = ({
  candidate,
  onVote,
  disabled,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
      <img
        src={candidate.image}
        alt={candidate.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{candidate.name}</h3>
        <p className="text-gray-600 mb-4">{candidate.party}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Votes: {candidate.votes}
          </span>
          <button
            onClick={() => onVote(candidate.id)}
            disabled={disabled}
            className={`px-4 py-2 rounded-md flex items-center gap-2 ${
              disabled
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white transition duration-200`}
          >
            <Check className="h-4 w-4" />
            Vote
          </button>
        </div>
      </div>
    </div>
  );
};