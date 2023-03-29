export interface IProxy {
	typeId: number
	countryId: number
	periodId: number
	price: number
}

export interface IProxyType {
  id: number
  title: string
}

export interface IProxyCountry {
  id: number
  title: string
}

export interface IProxyPeriod {
  id: number
  title: string
}