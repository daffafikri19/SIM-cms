"use client";

import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

interface HighchartsBarChartProps {
  options: Highcharts.Options;
}

export const Chart = ({ options }: HighchartsBarChartProps) => {
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
