"use client"

import React from 'react'
import { Card } from 'antd'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export const IngredientForecastChart = () => {

    const chartOptions: Highcharts.Options = {
        chart: {
            type: 'line',
            height: 350,
        },
        title: {
            text: 'Pemakaian Bahan Baku Bulan Ini dan Prediksi Bulan Depan'
        },
        xAxis: {
            categories: ['1 Jun', '5 Jun', '10 Jun', '15 Jun', '20 Jun', '25 Jun', '30 Jun', 'prediksi']
        },
        yAxis: {
            title: {
                text: 'Pemakaian (kg)'
            }
        },
        series: [
            {
                name: 'Pemakaian Aktual',
                type: 'line',
                data: [100, 120, 150, 130, 160, 180, 200], // Data aktual pemakaian
                color: '#1E90FF',
                marker: {
                    enabled: true
                }
            },
            {
                name: 'Prediksi Pemakaian',
                type: 'area',
                data: [200, 220],
                color: '#FFA07A',
                marker: {
                    enabled: true
                },
                zoneAxis: 'x',
                zones: [{
                    value: 6, 
                    color: '#1E90FF'
                }]
            }
        ],
        tooltip: {
            shared: true,
            valueSuffix: ' kg'
        },
        credits: {
            enabled: false
        }
    };

    return (
        <Card>
            <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
        />
        </Card>
    )
}
