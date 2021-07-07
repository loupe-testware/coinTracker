export interface AuthenticationProps {
    authState: string,
    setAuthState: any,
  }

export interface ErrorToast {
  errorToast: boolean,
  signUpSuccessToast: boolean,
  authSuccessToast: boolean,
  message: string
}

export interface formInputState {
  email: string,
  password: string,
  verificationCode: string
}

export interface coinInterface {
ath: number
ath_change_percentage: number
ath_date: string
atl: number
atl_change_percentage: number
atl_date: string
circulating_supply: number
current_price: number
fully_diluted_valuation: number
high_24h: number
id: string
image: string
last_updated: string
low_24h: number
market_cap: number
market_cap_change_24h: number
market_cap_change_percentage_24h: number
market_cap_rank: number
max_supply: number
name: string
price_change_24h: number
price_change_percentage_24h: number
roi: any
symbol: string
total_supply: number
total_volume: number
}

export interface coinsStoreInterface {
  coins: {
    list: {
      type: string
      payload : coinInterface[],
      meta : {
        requestId: string,
        requestStatus: string
      },
    },
    status: string
  }
}

export interface portfoliosInterface {
  customer_id: number,
  customer_email: string,
  customer_first_name: string,
  customer_last_name: string,
  portfolios: [
    {
    portfolio_name: string,
    coins: 
      [
        {
        coin_name:string,
        transactions: [{
          type: string,
          datetime: string,
          tradingPair: string,
          exchange: string,
          quantity: number,
          costTotal: number,
          costPer: number,
          fees: number
        }]
      }]
  }
]
}