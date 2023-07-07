import { useEffect, useState } from "react";
import "./CsvFile.css";
import { CSVDownload, CSVLink } from "react-csv";
import followerService from "../../../services/followersService";
import { authStore } from "../../../redax/authState";
import { useNavigate } from "react-router-dom";

function CsvFile(): JSX.Element {
 
  const [report, setReport] = useState<any[]>([]);
const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = authStore.getState().user.role
        if (user!=="Admin"){
          alert("Limited permission")
        navigate("/home")
        }
       
        const result = await followerService.getReport();
        setReport(result);
        console.log(result);
      } catch (error) {
        console.error("Failed to fetch the report:", error);
      }
    };
    fetchData();
  }, []);

  const data = report.map((r) => ({
    followersCount: r.followersCount,
    destination: r.destination,
  }));

  const headers = [
    { label: "Followers Count", key: "followersCount" },
    { label: "Destination", key: "destination" },
  ];

  return (
    <div className="CsvFile">  
      <h1>Hello, in this option you can get data about your followers</h1>
      <CSVLink
        data={data}
        headers={headers}
        filename={"followers-count.csv"}
        className="btn btn-primary"
        target="_blank"
      >
        Download CSV File
      </CSVLink>
    </div>
  );
}

export default CsvFile;
