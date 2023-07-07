import "./Report.css";
import { useEffect, useState } from "react";
import followerService from "../../../services/followersService";
import { Button } from "@mui/material";

const CanvasJSReact = require("canvasjs-react-charts");
const { CanvasJSChart } = CanvasJSReact;

function Report(): JSX.Element {
  const [report, setReport] = useState<any[]>([]);
  const [chartType, setChartType] = useState<'column' | 'pie'>('column');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await followerService.getReport();
        setReport(result);
        console.log(result);
      } catch (error) {
        console.error('Failed to fetch report:', error);
      }
    };
    fetchData();
  }, []);

  const dataPoints = report.map((r) => ({
    label: r.destination,
    y: r.followersCount 
  }));

  const options = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Vacations Report",
    },
    axisX: {
      interval: 1,
      labelMaxWidth: 100,
      labelWrap: true,
      labelAutoFit: true,
      labelFontSize: 12,
      labelAngle: -45,
      title: "Destinations",
    },
    axisY: {
      title: "Followers",
      interval: 1,
      minimum: 0,
      maximum:5
    },
    data: [
      {
        type: chartType,
        legendText: "{label}",
        dataPoints: dataPoints,
      },
    ],
  };

  return (
    <div className="Report">
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      </div>
      <CanvasJSChart options={options} />
    </div>
  );
}

export default Report;
