import React, { useEffect, useState } from 'react';
import { useVoteStore } from './store/voteStore';
import { Login } from './components/Login';
import { VotingCard } from './components/VotingCard';
import { Results } from './components/Results';
import { BlockchainInfo } from './components/BlockchainInfo';
import { Vote } from 'lucide-react';

function App() {
  const { candidates, currentUser, vote } = useVoteStore();
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState<boolean | null>(null);

  // MetaMask Installation Check
  useEffect(() => {
    if (window.ethereum) {
      setIsMetaMaskInstalled(true);  // MetaMask is installed
    } else {
      setIsMetaMaskInstalled(false); // MetaMask is not installed
    }
  }, []);

  // Handle MetaMask connection when user clicks to connect
  const handleConnectMetaMask = async () => {
    if (window.ethereum) {
      setLoading(true);  // Show loading indicator

      try {
        // Request accounts from MetaMask
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        }) as string[];

        if (accounts.length > 0) {
          setIsMetaMaskConnected(true);  // Set connected state if accounts are available
        }
      } catch (error) {
        console.error('Error connecting to MetaMask', error);
      } finally {
        setLoading(false);  // Hide loading after the connection attempt
      }
    } else {
      alert('MetaMask is not installed');
    }
  };

  // If MetaMask is not installed
  if (!isMetaMaskInstalled) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div>
          <p>MetaMask is not installed. Please install MetaMask to proceed.</p>
          <button onClick={handleConnectMetaMask} className="bg-blue-500 text-white p-3 rounded mt-4">
            Install MetaMask
          </button>
        </div>
      </div>
    );
  }

  // If loading state is active (e.g., connecting to MetaMask)
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div>Connecting to MetaMask...</div>
      </div>
    );
  }

  // If MetaMask is not connected, show "Connect to MetaMask"
  if (!isMetaMaskConnected) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <button onClick={handleConnectMetaMask} className="bg-blue-500 text-white p-3 rounded">
          Connect to MetaMask
        </button>
      </div>
    );
  }

  // If user is not logged in
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          {/* Display MetaMask Connected status above login */}
          {isMetaMaskConnected && (
            <div className="mb-4 text-green-600 font-medium text-center">
              MetaMask is connected
            </div>
          )}
          <Login />
        </div>
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

        {/* Remove the "Connect to MetaMask" button in the authentication process */}
        {isMetaMaskConnected && !currentUser && (
          <div className="mb-6 text-green-600 font-medium text-center">
            MetaMask is connected
          </div>
        )}

        {currentUser?.hasVoted ? (
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
