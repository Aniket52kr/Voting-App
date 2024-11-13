import React from 'react';
import { Candidate } from '../types';
import { BarChart } from 'lucide-react';

interface ResultsProps {
  candidates: Candidate[];
}

export const Results: React.FC<ResultsProps> = ({ candidates }) => {
  const totalVotes = candidates.reduce((sum, candidate) => sum + candidate.votes, 0);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
      <div className="flex items-center justify-center mb-6">
        <BarChart className="h-8 w-8 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Election Results</h2>
      </div>
      <div className="space-y-4">
        {candidates.map((candidate) => (
          <div key={candidate.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">{candidate.name}</span>
              <span className="text-gray-600">
                {totalVotes > 0
                  ? `${((candidate.votes / totalVotes) * 100).toFixed(1)}%`
                  : '0%'}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                style={{
                  width: `${
                    totalVotes > 0
                      ? ((candidate.votes / totalVotes) * 100).toFixed(1)
                      : 0
                  }%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center text-gray-600">
        Total Votes: {totalVotes}
      </div>
    </div>
  );
};