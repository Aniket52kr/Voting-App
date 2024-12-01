declare global {
    interface Window {
      ethereum?: MetaMaskEthereumProvider;
    }
  }
  
  interface MetaMaskEthereumProvider {
    isMetaMask?: boolean;
    request: (args: MetaMaskRequestArguments) => Promise<unknown>;
  }
  
  interface MetaMaskRequestArguments {
    method: string;
    params?: unknown[] | Record<string, unknown>;
  }
  
  export {};
  