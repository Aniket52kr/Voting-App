import { create } from 'zustand';
import { Candidate, User } from '../types';
import { Blockchain } from '../blockchain/Blockchain';

interface VoteStore {
  blockchain: Blockchain;
  candidates: Candidate[];
  currentUser: User | null;
  login: (name: string) => void;
  vote: (candidateId: string) => void;
  getVotes: (candidateId: string) => number;
}

export const useVoteStore = create<VoteStore>((set, get) => ({
  blockchain: new Blockchain(),
  candidates: [
    {
      id: '1',
      name: 'John Smith',
      party: 'Progressive Party',
      votes: 0,
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      party: 'Future Alliance',
      votes: 0,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200',
    },
    {
      id: '3',
      name: 'Moresh Mukhedkar',
      party: 'FacultyVoice',
      votes: 0,
      image: 'https://dypatiluniversitypune.edu.in/images/schoolofengg/Moresh.jpg',
    },
  ],
  currentUser: null,
  login: (name) =>
    set({
      currentUser: { id: Math.random().toString(), name, hasVoted: false },
    }),
  vote: (candidateId) => {
    const state = get();
    if (!state.currentUser) return;

    state.blockchain.addVote({
      voterId: state.currentUser.id,
      candidateId,
      timestamp: Date.now(),
    });

    set((state) => ({
      candidates: state.candidates.map((candidate) => ({
        ...candidate,
        votes: state.blockchain.getVotesByCandidate(candidate.id),
      })),
      currentUser: state.currentUser
        ? { ...state.currentUser, hasVoted: true }
        : null,
    }));
  },
  getVotes: (candidateId) => get().blockchain.getVotesByCandidate(candidateId),
}));