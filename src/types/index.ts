export interface Candidate {
  id: string;
  name: string;
  party: string;
  votes: number;
  image: string;
}

export interface User {
  id: string;
  name: string;
  hasVoted: boolean;
}