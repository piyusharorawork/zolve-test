import axios from "axios";
import React, { CSSProperties, useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import randomColor from "randomcolor";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format, subDays } from "date-fns";
import ExpandIcon from "../components/expandIcon";
import { useAlert } from "react-alert";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Header from "../components/header";

const KEY = "U4DMV*8nvpm3EOpvf69Rxw((";
const BASE_URL = "https://api.stackexchange.com";

export default function ApiEndPoint() {
  const [chartData, setChartData] = useState([]);
  const [hovered, setHovered] = useState<number | undefined>(undefined);
  const [selectedDateRange, setSelectedDateRange] = useState([
    {
      startDate: subDays(new Date(), 10),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [dateText, setDateText] = useState("");
  const [showDateRange, setShowDateRange] = useState(false);
  const Alert = useAlert();
  const [showSpinner, setShowSpinner] = useState(false);

  // to gray the hovered chart item
  const data = chartData.map((entry, i) => {
    if (hovered === i) {
      return {
        ...entry,
        color: "grey",
      };
    }
    return entry;
  });

  const dateRangeStyle: CSSProperties = {
    display: showDateRange ? "block" : "none",
  };

  const fetchChartData = async () => {
    setShowSpinner(true);
    const startDate = parseInt(
      (selectedDateRange[0].startDate.getTime() / 1000).toString()
    );

    const endDate = parseInt(
      (selectedDateRange[0].endDate.getTime() / 1000).toString()
    );

    const url = `${BASE_URL}/2.2/tags?key=${KEY}&page=${pageNumber}&pagesize=${pageSize}&fromdate=${startDate}&todate=${endDate}&order=desc&sort=popular&site=stackoverflow`;
    const res = await axios.get(url);
    const updatedChartData = res.data.items.map((item: any) => {
      return {
        title: item.name,
        value: item.count,
        color: randomColor(),
      };
    });

    setChartData(updatedChartData);
    setShowSpinner(false);
  };

  useEffect(() => {
    const startDateStr = format(selectedDateRange[0].startDate, "dd MMM, yyyy");
    const endDateStr = format(selectedDateRange[0].endDate, "dd MMM, yyyy");

    setDateText(`${startDateStr} - ${endDateStr}`);
    fetchChartData();
  }, []);

  const handleDateSelectionChange = (item: any) => {
    setSelectedDateRange([item.selection]);
  };

  const handlePageNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageNumber(parseInt(e.target.value));
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(parseInt(e.target.value));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    if (!pageNumber) {
      return Alert.show("Page number is required");
    }

    if (pageNumber < 1) {
      return Alert.show("Page number must be greater than 0");
    }

    if (!pageSize) {
      return Alert.show("Page number is required");
    }

    if (pageSize < 1) {
      return Alert.show("Page size must be greater than 0");
    }

    if (pageSize < pageNumber) {
      return Alert.show("Page Size cannot be smaller than page number");
    }

    fetchChartData();
  };

  return (
    <div>
      <Header text="3rd Party API & Visualization"></Header>
      <div className="w-60 m-10 mx-auto">
        <PieChart
          data={data}
          segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
          onMouseOver={(_, index) => {
            setHovered(index);
          }}
        />
      </div>
      <div>
        <form className="px-3">
          <div className="max-w-sm">
            <label className="py-2"> Enter Page Number</label>
            <input
              className="my-2 px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
              placeholder="Page Number"
              type="number"
              onChange={handlePageNumberChange}
              value={pageNumber}
            />
          </div>

          <div className="max-w-sm">
            <label className="py-2"> Enter Page Size</label>
            <input
              className="my-2 px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
              placeholder="Page Size"
              type="number"
              onChange={handlePageSizeChange}
              value={pageSize}
            />
          </div>

          <div className="max-w-sm">
            <label className="py-2 my-2"> Pick Date Range</label>
            <br />
            <div
              onClick={() => setShowDateRange(!showDateRange)}
              className="bg-blue-500 text-white font-bold h-10 py-2 px-4 my-2 cursor-pointer flex justify-between"
            >
              {dateText}
              <ExpandIcon isCollapsed={!showDateRange} />
            </div>
          </div>

          <div style={dateRangeStyle}>
            <DateRange
              editableDateInputs={false}
              onChange={handleDateSelectionChange}
              moveRangeOnFirstSelection={false}
              ranges={selectedDateRange}
            />
          </div>

          <a
            className="bg-black text-white py-2 px-4 rounded-sm cursor-pointer flex w-32 content-center"
            onClick={handleSubmit}
          >
            <span>Submit</span>
            <div
              style={{ display: showSpinner ? "block" : "none" }}
              className="h-2 w-2 mx-4 py-1"
            >
              <Loader type="TailSpin" color="#fff" height={20} width={20} />
            </div>
          </a>
        </form>
      </div>
    </div>
  );
}
