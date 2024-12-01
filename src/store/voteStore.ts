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
      name: 'Narendra Modi',
      party: 'BJP',
      votes: 0,
      image: 'https://wallpaperaccess.com/full/1917973.jpg',
    },
    {
      id: '2',
      name: 'Rahul Gandhi',
      party: 'INC',
      votes: 0,
      image: 'https://th.bing.com/th/id/OIP.xhM_UswNsrlwnP1dEvTZrQHaIO?rs=1&pid=ImgDetMain',
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