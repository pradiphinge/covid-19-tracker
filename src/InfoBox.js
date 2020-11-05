import React from 'react'
import {Card, CardContent, Typography} from '@material-ui/core'

import './InfoBox.css';

function InfoBox({ title, cases,active,isRed, total, ...props }) {
    
    return (
        <Card onClick={props.onClick} className={`infoBox ${active && "infoBox--selected"} ${isRed && 'infoBox--red'}` }>
            <CardContent> 
                {/* Title */}
                <Typography className='infoBox__title' color='textSecondary' gutterBottom>{title}</Typography>

                {/* cases */}
                <h2 className={`infoBox__cases ${!isRed && 'infoBox__cases--green'}`}>{cases}</h2>
                {/* total */}
                <Typography className='infoBox__total' color='textSecondary'>Total : {total}</Typography>
            </CardContent>    
        </Card>
    )   
}

export default InfoBox
