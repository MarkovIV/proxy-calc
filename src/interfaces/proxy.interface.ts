export interface IProxy {
	typeId: number
	countryId: number
	periodId: number
	price: number
}

export interface IProxyTypeWithMinPrice {
  id: number
  label: string
  minPrice: number
}

export interface IProxyCountryWithMinPrice {
  id: number
  label: string
  minPrice: number
}

export interface IProxyPeriodWithMinPrice {
  id: number
  label: string
  minPrice: number
}