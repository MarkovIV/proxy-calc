import { IProxy } from '../interfaces/proxy.interface'

export const proxyTypes = [
	"Серверные IPv4 инд.",
	"Серверные IPv4 Shared",
	"Серверные IPv6 инд."
]

export const proxyCountries = [
	"Австралия",
	"Россия"
]

export const proxyPeriods = [
	"1 день",
	"7 дней",
	"1 месяц"
]

export const proxyPrices: IProxy[] = [
	{
		typeId: 0,		// Cерверные IPv4 индивидуальные
		countryId: 0, 	// Австралия
		periodId: 2,	// 1 месяц
		price: 236,
	},
	{
		typeId: 0,		// Серверные IPv4 индивидуальные
		countryId: 1, 	// Россия
		periodId: 0,	// 1 день
		price: 1.94,
	},
	{
		typeId: 0,		// Серверные IPv4 индивидуальные
		countryId: 1, 	// Россия
		periodId: 1,	// 7 дней
		price: 13.55,
	},
	{
		typeId: 0,		// Серверные IPv4 индивидуальные
		countryId: 1, 	// Россия
		periodId: 2,	// 1 месяц
		price: 60,
	},
	{
		typeId: 1,		// Серверные IPv4 Shared
		countryId: 1, 	// Россия
		periodId: 2,	// 1 месяц
		price: 19.80,
	},
	{
		typeId: 2,		// Серверные IPv6 Индивидуальные
		countryId: 0, 	// Австралия
		periodId: 1,	// 7 дней
		price: 10.10,
	},
	{
		typeId: 2,		// Серверные IPv6 Индивидуальные
		countryId: 0, 	// Австралия
		periodId: 2,	// 1 месяц
		price: 38,
	},
	{
		typeId: 2,		// Серверные IPv6 Индивидуальные
		countryId: 1, 	// Россия
		periodId: 1,	// 7 дней
		price: 1.19,
	},
	{
		typeId: 2,		// Серверные IPv6 Индивидуальные
		countryId: 1, 	// Россия
		periodId: 2,	// 1 месяц
		price: 5.10,
	},
]
