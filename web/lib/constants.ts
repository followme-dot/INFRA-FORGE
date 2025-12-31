export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const CHAINS = {
  ethereum: {
    name: 'Ethereum Mainnet',
    chainId: 1,
    explorer: 'https://etherscan.io',
    testnet: false,
  },
  ethereum_sepolia: {
    name: 'Ethereum Sepolia',
    chainId: 11155111,
    explorer: 'https://sepolia.etherscan.io',
    testnet: true,
  },
  bsc: {
    name: 'BNB Smart Chain',
    chainId: 56,
    explorer: 'https://bscscan.com',
    testnet: false,
  },
  bsc_testnet: {
    name: 'BSC Testnet',
    chainId: 97,
    explorer: 'https://testnet.bscscan.com',
    testnet: true,
  },
  polygon: {
    name: 'Polygon',
    chainId: 137,
    explorer: 'https://polygonscan.com',
    testnet: false,
  },
  polygon_mumbai: {
    name: 'Polygon Mumbai',
    chainId: 80001,
    explorer: 'https://mumbai.polygonscan.com',
    testnet: true,
  },
  arbitrum: {
    name: 'Arbitrum One',
    chainId: 42161,
    explorer: 'https://arbiscan.io',
    testnet: false,
  },
  avalanche: {
    name: 'Avalanche C-Chain',
    chainId: 43114,
    explorer: 'https://snowtrace.io',
    testnet: false,
  },
  fantom: {
    name: 'Fantom Opera',
    chainId: 250,
    explorer: 'https://ftmscan.com',
    testnet: false,
  },
} as const

export const CONTRACT_TEMPLATES = {
  erc20: 'ERC-20 Token',
  erc721: 'ERC-721 NFT',
  erc1155: 'ERC-1155 Multi-Token',
  vesting: 'Vesting Contract',
  staking: 'Staking Contract',
  governance: 'Governance DAO',
  multisig: 'Multi-Signature Wallet',
  defi: 'DeFi Protocol',
} as const
