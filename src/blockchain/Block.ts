import SHA256 from 'crypto-js/sha256';

export interface Vote {
  voterId: string;
  candidateId: string;
  timestamp: number;
}

export class Block {
  hash: string;
  nonce: number;

  constructor(
    public timestamp: number,
    public vote: Vote,
    public previousHash: string = ''
  ) {
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash(): string {
    return SHA256(
      this.previousHash +
        this.timestamp +
        JSON.stringify(this.vote) +
        this.nonce
    ).toString();
  }

  mineBlock(difficulty: number) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}