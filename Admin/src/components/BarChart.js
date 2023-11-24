import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { mockBarData } from "../data/mockData";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <ResponsiveBar
      data={mockBarData}
      theme={{
        axis: {
          // LINE NGANG DỌC
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          // DANH MỤC LỚN (MONTH - NUM OF POST)
          legend: {
            text: {
              fill: colors.grey[100],
              fontWeight: "bolder"
            },
          },
          ticks: {
            // CÁC VẠCH CHỈ ĐỊNH
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            // CÁC NỘI DUNG TRÊN VẠCH CHỈ ĐỊNH
            text: {
              fill: colors.grey[300],
            },
          },
        },
        // CÁC DANH MỤC NHỎ (MOB, IOT, LTMT, UDPM)
        legends: {
          text: {
            fill: colors.grey[100],
            fontWeight: "bold"
          },
        },
        // POPUP KHI HOVER VÀO CÁC CỘT
        tooltip: {
          container: {
            background: colors.primary[400],
            color: colors.grey[100],
          },
        },
      }}
      keys={["UDPM", "LTMT", "IOT", "MOB", "SECUTI", "LTMB", "blabla"]}
      indexBy="Months"
      margin={{ top: 10, right: 130, bottom: 70, left: 60 }}
      padding={0.4}
      innerPadding={1}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      valueFormat=" <-"
      colors={{ scheme: "set2" }}
      // defs={[
      //   {
      //     id: "dots",
      //     type: "patternDots",
      //     background: "inherit",
      //     color: "#38bcb2",
      //     size: 4,
      //     padding: 1,
      //     stagger: true,
      //   },
      //   {
      //     id: "lines",
      //     type: "patternLines",
      //     background: "inherit",
      //     color: "#eed312",
      //     rotation: -45,
      //     lineWidth: 6,
      //     spacing: 10,
      //   },
      // ]}
      // fill={[
      //   {
      //     match: {
      //       id: "SECUTI",
      //     },
      //     id: "dots",
      //   },
      //   {
      //     match: {
      //       id: "LTMB",
      //     },
      //     id: "lines",
      //   },
      // ]}
      borderRadius={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.1"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Months",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Num of posts",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      // SETTING CHO CÁC PHÂN LOẠI
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in Months: " + e.indexValue;
      }}
    />
  );
}
export default BarChart;

