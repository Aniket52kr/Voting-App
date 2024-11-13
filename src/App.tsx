import React from 'react';
import { useVoteStore } from './store/voteStore';
import { Login } from './components/Login';
import { VotingCard } from './components/VotingCard';
import { Results } from './components/Results';
import { BlockchainInfo } from './components/BlockchainInfo';
import { Vote } from 'lucide-react';

function App() {
  const { candidates, currentUser, vote } = useVoteStore();

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Login />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Vote className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">
              Blockchain E-Voting System
            </h1>
          </div>
          <div className="text-gray-600">
            Welcome, {currentUser.name}
          </div>
        </div>

        {currentUser.hasVoted ? (
          <div className="space-y-8">
            <div className="flex justify-center">
              <Results candidates={candidates} />
            </div>
            <BlockchainInfo />
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Cast Your Vote
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {candidates.map((candidate) => (
                <VotingCard
                  key={candidate.id}
                  candidate={candidate}
                  onVote={vote}
                  disabled={currentUser.hasVoted}
                />
              ))}
            </div>
            <BlockchainInfo />
          </>
        )}
      </div>
    </div>
  );
}

export default App;