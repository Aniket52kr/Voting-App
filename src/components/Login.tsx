import React, { useState, useEffect } from 'react';
import { useVoteStore } from '../store/voteStore';
import { UserCheck } from 'lucide-react';

export const Login = () => {
  const [name, setName] = useState('');
  const login = useVoteStore((state) => state.login);
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);

  useEffect(() => {
    // Check if MetaMask is connected
    const checkMetaMaskConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_accounts',
          }) as string[]; // Explicitly type accounts as string[]
          if (accounts.length > 0) {
            setIsMetaMaskConnected(true);
          }
        } catch (error) {
          console.error('Failed to check MetaMask connection:', error);
        }
      }
    };
    checkMetaMaskConnection();
  }, []);

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsMetaMaskConnected(true);
        console.log('MetaMask connected');
      } catch (error) {
        console.error('MetaMask connection failed:', error);
      }
    } else {
      alert('MetaMask not detected. Please install MetaMask extension.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      login(name);
    }
  };

  return (
    <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-center mb-8">
        <UserCheck className="h-12 w-12 text-blue-600" />
      </div>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
        Voter Authentication
      </h2>
      {!isMetaMaskConnected && (
        <button
          onClick={connectMetaMask}
          className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-200 mb-4"
        >
          Connect MetaMask
        </button>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your full name"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Login to Vote
        </button>
      </form>
    </div>
  );
};
