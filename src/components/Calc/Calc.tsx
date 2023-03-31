import { useEffect, useState } from 'react'
import { CalcProps } from './Calc.props'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Alert from '@mui/material/Alert'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Button from '@mui/material/Button'
import CleaningServicesIcon from '@mui/icons-material/CleaningServices'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Collapse from '@mui/material/Collapse'
import { IProxyTypeWithMinPrice, IProxyCountryWithMinPrice,
		IProxyPeriodWithMinPrice } from '../../interfaces/proxy.interface'
import { proxyTypes, proxyCountries, proxyPeriods, proxyPrices } from '../../data/data.calc'

export const Calc = ({ className, ...props }: CalcProps): JSX.Element => {
	const [openSuccessAlert, setOpenSuccessAlert] = useState<boolean>(false)
	const [openErrorAlert, setOpenErrorAlert] = useState<boolean>(false)
	const [totalPrice, setTotalPrice] = useState<number>(0)
	const [proxyType, setProxyType] = useState<IProxyTypeWithMinPrice | null>(null)
	const [proxyCountry, setProxyCountry] = useState<IProxyCountryWithMinPrice | null>(null)
	const [proxyPeriod, setProxyPeriod] = useState<IProxyPeriodWithMinPrice | null>(null)
	const [quantityString, setQuantityString] = useState<String>('')
	const [quantityError, setQuantityError] = useState<boolean>(false)
	const [helperText, setHelperText] = useState<String>(' ')
	const [proxyTypesWithMinPrice, setProxyTypesWithMinPrice] = useState<IProxyTypeWithMinPrice[]>([])
	const [proxyCountriesWithMinPrice, setProxyCountriesWithMinPrice] = useState<IProxyCountryWithMinPrice[]>([])
	const [proxyPeriodsWithMinPrice, setProxyPeriodsWithMinPrice] = useState<IProxyPeriodWithMinPrice[]>([])

	useEffect(() => {
		updateValues(proxyType, proxyCountry, proxyPeriod)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [proxyType, proxyCountry, proxyPeriod, quantityString])

	const updateValues = (type: IProxyTypeWithMinPrice | null, country: IProxyCountryWithMinPrice | null, period: IProxyPeriodWithMinPrice | null) => {
		let newProxyTypesWithMinPrice: IProxyTypeWithMinPrice[] = []
		let newProxyCountriesWithMinPrice: IProxyCountryWithMinPrice[] = []
		let newProxyPeriodsWithMinPrice: IProxyPeriodWithMinPrice[] = []

		for (let i = 0; i < proxyPrices.length; i++) {
			if (((proxyPrices[i].typeId === type?.id) || (type === null)) &&
				((proxyPrices[i].countryId === country?.id) || (country === null)) &&
				((proxyPrices[i].periodId === period?.id) || (period === null))) {
					let proxyCurType = newProxyTypesWithMinPrice.find(el => el.id === proxyPrices[i].typeId)
					if (proxyCurType === undefined) {
						const proxyTypeWithMinPrice = {
							id: proxyPrices[i].typeId,
							label: proxyTypes[proxyPrices[i].typeId] + ' от ' + proxyPrices[i].price + ' ₽',
							minPrice: proxyPrices[i].price
						}
						newProxyTypesWithMinPrice.push(proxyTypeWithMinPrice)
					} else if ( proxyPrices[i].price < proxyCurType.minPrice ) {
						proxyCurType.minPrice = proxyPrices[i].price
						proxyCurType.label = proxyTypes[proxyPrices[i].typeId] + ' от ' + proxyPrices[i].price + ' ₽'
					}

					let proxyCurCountry = newProxyCountriesWithMinPrice.find(el => el.id === proxyPrices[i].countryId)
					if (proxyCurCountry === undefined) {
						const proxyCountryWithMinPrice = {
							id: proxyPrices[i].countryId,
							label: proxyCountries[proxyPrices[i].countryId] + ' от ' + proxyPrices[i].price + ' ₽',
							minPrice: proxyPrices[i].price
						}
						newProxyCountriesWithMinPrice.push(proxyCountryWithMinPrice)
					} else if ( proxyPrices[i].price < proxyCurCountry.minPrice ) {
						proxyCurCountry.minPrice = proxyPrices[i].price
						proxyCurCountry.label = proxyCountries[proxyPrices[i].countryId] + ' от ' + proxyPrices[i].price + ' ₽'
					}

					let proxyCurPeriod = newProxyPeriodsWithMinPrice.find(el => el.id === proxyPrices[i].periodId)
					if (proxyCurPeriod === undefined) {
						const proxyPeriodWithMinPrice = {
							id: proxyPrices[i].periodId,
							label: proxyPeriods[proxyPrices[i].periodId] + ' от ' + proxyPrices[i].price + ' ₽',
							minPrice: proxyPrices[i].price
						}
						newProxyPeriodsWithMinPrice.push(proxyPeriodWithMinPrice)
					} else if ( proxyPrices[i].price < proxyCurPeriod.minPrice ) {
						proxyCurPeriod.minPrice = proxyPrices[i].price
						proxyCurPeriod.label = proxyPeriods[proxyPrices[i].periodId] + ' от ' + proxyPrices[i].price + ' ₽'
					}
			}
		}
		newProxyTypesWithMinPrice.sort((el1, el2) => (el1.minPrice - el2.minPrice))
		newProxyCountriesWithMinPrice.sort((el1, el2) => (el1.minPrice - el2.minPrice))
		newProxyPeriodsWithMinPrice.sort((el1, el2) => (el1.minPrice - el2.minPrice))

		setProxyTypesWithMinPrice(newProxyTypesWithMinPrice)
		setProxyCountriesWithMinPrice(newProxyCountriesWithMinPrice)
		setProxyPeriodsWithMinPrice(newProxyPeriodsWithMinPrice)

		if (quantityString === '') {
			setTotalPrice(newProxyTypesWithMinPrice[0].minPrice)
		} else {
			setTotalPrice(Math.floor((newProxyTypesWithMinPrice[0].minPrice * Number(quantityString)) * 100) / 100)
		}
	}

	const changeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
		const val = event.target.value
		if (val === '') {
			setHelperText(' ')
			setQuantityError(false)
			setQuantityString(val)
			return
		}

		const num = Number(val)
		if (num) {
			if (((num % 1) === 0) && num > 0) {
				setHelperText(' ')
				setQuantityError(false)
				setQuantityString(val)
				return
			}
		}

		setQuantityError(true)
		setHelperText('Введите натуральное число!')
		setTimeout(() => {
			setHelperText(' ')
			setQuantityError(false)
		}, 1000)
	}

	const onOrderButtonClick = () => {
		if ((quantityString !== '') && (proxyType !== null) && (proxyCountry !== null) && (proxyPeriod !== null)) {
			setOpenSuccessAlert(true)
			setTimeout(() => {
				setOpenSuccessAlert(false)
			}, 2000)
		} else {
			setOpenErrorAlert(true)
			setTimeout(() => {
				setOpenErrorAlert(false)
			}, 2000)
		}
	}

	return (
		<div className="absolute left-0 top-0 flex flex-col items-center justify-center flex-nowrap w-full h-full min-w-[350px] min-h-[520px] bg-indigo-900 overflow-auto">
			<div className="flex items-start justify-center flex-col p-3 overflow-auto">
				<div className="mb-5">
					<Typography gutterBottom variant="h4" component="div" color="#e0e0e0">
						Купить прокси
					</Typography>
				</div>
				<div className="portrait:hidden overflow-auto bg-gradient-to-r from-blue-300/80 to-gray-700/80 rounded-md p-5">
					<div className="grid grid-cols-2 grid-rows-1">
						<div className="flex w-full justify-start items-center">
							<Typography gutterBottom variant="h5" component="div" color="#e0e0e0">
								Онлайн-калькулятор
							</Typography>
						</div>
						<div className="flex w-full justify-end items-center">
							<IconButton
								size="small"
								edge="start"
								color="inherit"
								aria-label="clear"
								sx={{
									alignSelf: 'center',
								}}
								onClick={() => {
									setProxyType(null)
									setProxyCountry(null)
									setProxyPeriod(null)
									setQuantityString('')
								}}
							>
								<CleaningServicesIcon sx={{ color: '#e0e0e0', marginRight: '5px' }}/>
								<Typography gutterBottom variant="subtitle1" component="div" color="#e0e0e0" sx={{ alignSelf: 'center', margin: '0' }}>
									Очистить
								</Typography>
							</IconButton>
						</div>
					</div>
					<div className="grid gap-2 grid-cols-2 grid-rows-2 mt-5">
						<div className="flex w-full justify-center items-center">
							<Autocomplete
								disablePortal
								fullWidth
								value={proxyType}
								onChange={ (e, v) => setProxyType(v) }
								options={proxyTypesWithMinPrice}
								renderInput={(params) => <TextField
															{...params}
															label="Тип прокси"
															required
															fullWidth
															helperText=" "
															variant="outlined"
															color="secondary"
														/>}
							/>
						</div>
						<div className="flex w-full justify-center items-center">
							<Autocomplete
								disablePortal
								fullWidth
								value={proxyCountry}
								onChange={ (e, v) => setProxyCountry(v) }
								options={proxyCountriesWithMinPrice}
								renderInput={(params) => <TextField
															{...params}
															label="Страна"
															required
															helperText=" "
															fullWidth
															variant="outlined"
															color="secondary"
														/>}
							/>
						</div>
						<div className="flex w-full justify-center items-center">
							<Autocomplete
								disablePortal
								fullWidth
								value={proxyPeriod}
								onChange={ (e, v) => setProxyPeriod(v) }
								options={proxyPeriodsWithMinPrice}
								renderInput={(params) => <TextField
															{...params}
															label="Период"
															required
															fullWidth
															helperText=" "
															variant="outlined"
															color="secondary"
														/>}
							/>
						</div>
						<div className="flex w-full justify-center items-center">
							<TextField
								label="Количество"
								required
								fullWidth
								variant="outlined"
								color="secondary"
								error={quantityError}
								helperText={helperText}
								value={quantityString}
								onChange={changeQuantity} />	
						</div>
					</div>
					<div className="grid grid-cols-2 grid-rows-1">
						<div className="grid grid-cols-2 grid-rows-1">
							<div className="flex w-full justify-start items-center mt-5">
								<Typography gutterBottom variant="subtitle1" component="div" color="#e0e0e0">
									Сумма к оплате:
								</Typography>
							</div>
							<div className="flex w-full justify-end items-center mt-5">
								<Typography gutterBottom variant="subtitle1" component="div" color="#e0e0e0">
									{
										((quantityString !== '') && (proxyType !== null) && (proxyCountry !== null) && (proxyPeriod !== null))?
											(totalPrice + ' руб.'):
											('от ' + totalPrice + ' руб.')
									}
								</Typography>
							</div>
						</div>
						<div className="flex w-full justify-end items-center mt-5">
							<Button
								variant="contained"
								startIcon={<ShoppingCartIcon />}
								size="large"
								aria-label="order"
								color="inherit"
								sx={{
									alignSelf: 'center',
								}}
								onClick={onOrderButtonClick}
							>
								Оформить заказ
							</Button>
						</div>
					</div>
				</div>
				<div className="landscape:hidden overflow-auto bg-gradient-to-r from-blue-300/80 to-gray-700/80 rounded-md p-5">
					<div className="grid grid-cols-2 grid-rows-1">
						<div className="flex w-full justify-start items-center">
							<Typography gutterBottom variant="h6" component="div" color="#e0e0e0">
								Онлайн-калькулятор
							</Typography>
						</div>
						<div className="flex w-full justify-end items-center">
							<IconButton
								size="small"
								edge="start"
								color="inherit"
								aria-label="clear"
								sx={{
									alignSelf: 'center',
								}}
								onClick={() => {
									setProxyType(null)
									setProxyCountry(null)
									setProxyPeriod(null)
									setQuantityString('')
								}}
							>
								<CleaningServicesIcon fontSize="small" sx={{ color: '#e0e0e0', marginRight: '5px' }}/>
								<Typography gutterBottom variant="subtitle2" component="div" color="#e0e0e0" sx={{ alignSelf: 'center', margin: '0' }}>
									Очистить
								</Typography>
							</IconButton>
						</div>
					</div>
					<div className="grid grid-cols-1 grid-rows-4 mt-2">
						<div className="flex w-full justify-center items-center">
							<Autocomplete
								disablePortal
								fullWidth
								value={proxyType}
								onChange={ (e, v) => setProxyType(v) }
								options={proxyTypesWithMinPrice}
								renderInput={(params) => <TextField
															{...params}
															label="Тип прокси"
															required
															fullWidth
															helperText=" "
															variant="outlined"
															color="secondary"
														/>}
							/>
						</div>
						<div className="flex w-full justify-center items-center">
							<Autocomplete
								disablePortal
								fullWidth
								value={proxyCountry}
								onChange={ (e, v) => setProxyCountry(v) }
								options={proxyCountriesWithMinPrice}
								renderInput={(params) => <TextField
															{...params}
															label="Страна"
															required
															helperText=" "
															fullWidth
															variant="outlined"
															color="secondary"
														/>}
							/>
						</div>
						<div className="flex w-full justify-center items-center">
							<Autocomplete
								disablePortal
								fullWidth
								value={proxyPeriod}
								onChange={ (e, v) => setProxyPeriod(v) }
								options={proxyPeriodsWithMinPrice}
								renderInput={(params) => <TextField
															{...params}
															label="Период"
															required
															fullWidth
															helperText=" "
															variant="outlined"
															color="secondary"
														/>}
							/>
						</div>
						<div className="flex w-full justify-center items-center">
							<TextField
								label="Количество"
								required
								fullWidth
								variant="outlined"
								color="secondary"
								error={quantityError}
								helperText={helperText}
								value={quantityString}
								onChange={changeQuantity} />	
						</div>
					</div>
					<div className="grid grid-cols-1 grid-rows-2">
						<div className="grid grid-cols-2 grid-rows-1">
							<div className="flex w-full justify-start items-center">
								<Typography gutterBottom variant="subtitle1" component="div" color="#e0e0e0">
									Сумма:
								</Typography>
							</div>
							<div className="flex w-full justify-end items-center">
								<Typography gutterBottom variant="subtitle1" component="div" color="#e0e0e0">
									{
										((quantityString !== '') && (proxyType !== null) && (proxyCountry !== null) && (proxyPeriod !== null))?
											(totalPrice + ' руб.'):
											('от ' + totalPrice + ' руб.')
									}
								</Typography>
							</div>
						</div>
						<div className="flex w-full justify-end items-center">
							<Button
								variant="contained"
								startIcon={<ShoppingCartIcon />}
								size="small"
								aria-label="order"
								color="inherit"
								sx={{
									alignSelf: 'center',
								}}
								onClick={onOrderButtonClick}
							>
								Оформить заказ
							</Button>
						</div>
					</div>
				</div>
				<div className="mt-2 flex w-full items-center justify-end">
					<div className="opacity-0">
						<Alert />		
					</div>
					{
						openSuccessAlert &&

						<div className="">
							<Collapse in={openSuccessAlert}>
								<Alert
									severity='success'
									action={
										<IconButton
											aria-label="closeSuccess"
											color="inherit"
											size="small"
											onClick={() => {
												setOpenSuccessAlert(false)
											}}
										>
											<CloseIcon fontSize="inherit" />
										</IconButton>
									}
								>
									Заказ успешно оформлен!
								</Alert>
							</Collapse>
						</div>
					}
					{
						openErrorAlert &&

						<div className="">
							<Collapse in={openErrorAlert}>
								<Alert
									severity='error'
									action={
										<IconButton
											aria-label="closeError"
											color="inherit"
											size="small"
											onClick={() => {
												setOpenErrorAlert(false)
											}}
										>
											<CloseIcon fontSize="inherit" />
										</IconButton>
									}
								>
									Заполните все поля!
								</Alert>
							</Collapse>
						</div>
					}
				</div>
			</div>
		</div>
	)		
}