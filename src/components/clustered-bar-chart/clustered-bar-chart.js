import React, { useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";

const StackedBarChart = ({ config }) => {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    let root = am5.Root.new(chartRef.current);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        paddingBottom: 100
      })
    );

    chart.set("cursor", am5xy.XYCursor.new(root, {}));

    // Creating y-axis
    let yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: am5xy.AxisRendererY.new(root, {
          inversed: true
        })
      })
    );

    // Styling y-axis
    let yRenderer = yAxis.get("renderer");
    yRenderer.grid.template.setAll({
      stroke: am5.color(0xffffff)
    });
    yRenderer.labels.template.setAll({
      fontFamily: "Times New Roman"
    });

    // Creating x-axis
    let xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {})
      })
    );

    // Styling x-axis
    let xRenderer = xAxis.get("renderer");
    xRenderer.grid.template.setAll({
      stroke: am5.color(0xffffff)
    });
    xRenderer.labels.template.setAll({
      fontFamily: "Times New Roman"
    });

    // Creating series
    let seriesArray = config.categoryFields.map((field, index) => {
      let series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          stacked: true,
          name: config.categoryTitle[index],
          xAxis: xAxis,
          yAxis: yAxis,
          valueXField: field,
          categoryYField: config.categoryYField,
          fill: am5.color(config.colors[index]),
          stroke: am5.color(config.colors[index])
        })
      );

      series.columns.template.setAll({
        tooltipText: "{name}[/]: {valueX}"
      });

      return series;
    });

    // Adding legend
    let legend = chart.children.push(
      am5.Legend.new(root, {
        paddingTop: 20,
        marginBottom: 20,
        y: am5.percent(100),
        layout: root.horizontalLayout
      })
    );

    // Setting series for the legend
    legend.data.setAll(seriesArray);
    legend.labels.template.setAll({
      fontFamily: "Times New Roman"
    });

    // Setting y-axis data
    yAxis.data.setAll(config.data);

    // Setting data for each series
    seriesArray.forEach((series) => {
      series.data.setAll(config.data);
    });

    return () => {
      root.dispose();
    };
  }, [config.data, config]);

  return (
    <div
      id={`stackedbarchart-${config.id}`}
      ref={chartRef}
      style={{ width: "100%", height: config.height }}
    ></div>
  );
};

export default StackedBarChart;
