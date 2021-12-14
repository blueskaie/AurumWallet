const Networks = [
  {
    id: 1,
    name: 'BSC Mainnet',
    main: 'https://bsc-dataseed1.binance.org:443',
    scan: 'https://api.bscscan.com/api',
    explore: 'https://bscscan.com/',
    type: 'mainnet',
    apiKey: 'NJJ3NK3UTG95N68PAVP31AQA7EBWNY5FDJ',
    icon: 'images/BNBWhite.svg'
  },
  {
    id: 2,
    name: 'BSC Testnet',
    main: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    scan: 'https://api-testnet.bscscan.com/api',
    explore: 'https://testnet.bscscan.com/',
    type: 'testnet',
    apiKey: 'NJJ3NK3UTG95N68PAVP31AQA7EBWNY5FDJ',
    icon: 'images/BNBWhite.svg',
  }
]

const SwapContracts = {
  pancake: {
    mainnet: {
      contract: "0x10ED43C718714eb63d5aA57B78B54704E256024E"
    },
    testnet: {
      contract: "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3"
    }
  }
}

export default Networks;

