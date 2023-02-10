import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";

type Datatype = {
  dataChart: [];
  optionsChart: [];
};
Chart.register(...registerables);
Chart.defaults.color = "#818ea3";

export const ChartJs = ({ dataChart, optionsChart }: Datatype) => {
  return (
    
      <Bar data={dataChart as any} 
     
      options={optionsChart as any} />
     
  );
};
