import { Block, Vote } from './Block';

export class Blockchain {
  chain: Block[];
  difficulty: number;
  pendingVotes: Vote[];

  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.pendingVotes = [];
  }

  private createGenesisBlock(): Block {
    return new Block(Date.now(), {
      voterId: 'genesis',
      candidateId: 'genesis',
      timestamp: Date.now(),
    });
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  addVote(vote: Vote): void {
    this.pendingVotes.push(vote);
    const block = new Block(Date.now(), vote, this.getLatestBlock().hash);
    block.mineBlock(this.difficulty);
    this.chain.push(block);
  }

  isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }

  getVotesByCandidate(candidateId: string): number {
    return this.chain.filter((block) => block.vote.candidateId === candidateId)
      .length - (candidateId === 'genesis' ? 1 : 0);
  }
}