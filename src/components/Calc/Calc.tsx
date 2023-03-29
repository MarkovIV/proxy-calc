import { useEffect, useState } from 'react'
import { CalcProps } from './Calc.props'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import { CardActionArea } from '@mui/material'
import { proxyTypes, proxyCountries, proxyPeriods } from '../../data/data.calc'
import cn from 'classnames'

export const Calc = ({ className, ...props }: CalcProps): JSX.Element => {
	// const [animation, setAnimation] = useState<string>()

	// useEffect(() => {


	// }, [])

	return (
		<div>
			Онлайн-калькулятор

		</div>	
	)		
}