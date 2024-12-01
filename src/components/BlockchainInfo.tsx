import React from 'react';
import { useVoteStore } from '../store/voteStore';
import { Database } from 'lucide-react';

export const BlockchainInfo = () => {
  const blockchain = useVoteStore((state) => state.blockchain);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
      <div className="flex items-center mb-4">
        <Database className="h-6 w-6 text-blue-600 mr-2" />
        <h3 className="text-xl font-semibold text-gray-800">Blockchain Status</h3>
      </div>
      <div className="space-y-2">
        <p className="text-gray-600">
          <span className="font-medium">Blocks in chain:</span>{' '}
          {blockchain.chain.length}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Chain validity:</span>{' '}
          <span
            className={blockchain.isChainValid() ? 'text-green-600' : 'text-red-600'}
          >
            {blockchain.isChainValid() ? 'Valid' : 'Invalid'}
          </span>
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Mining difficulty:</span>{' '}
          {blockchain.difficulty}
        </p>
      </div>
    </div>
  );
};
