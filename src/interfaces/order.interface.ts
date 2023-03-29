import { IProxy } from './proxy.interface'

export interface IOrder {
	proxy: IProxy
	quantity: number
}