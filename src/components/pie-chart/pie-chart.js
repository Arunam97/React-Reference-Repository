import React, { useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";

const PieChart = ({ config, data }) => {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    let root = am5.Root.new(chartRef.current);

    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        paddingBottom: 40,
        innerRadius: am5.percent(50)
      })
    );

    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: config.valueField,
        categoryField: config.categoryField,
        alignLabels: false
      })
    );

    // Apply colors from the config
    series.slices.template.setAll({
      fillOpacity: 0.9,
      strokeWidth: 1,
      stroke: am5.color(0xffffff),
      toggleKey: "none",
      hover: "none"
    });

    // Function to get color from the cyclic array
    function getColor(index, colors) {
      return colors[index % colors.length];
    }

    // Apply cyclic colors
    series.slices.template.setAll({
      fill: am5.color(config.colors[0]),
      stroke: am5.color(config.colors[0])
    });

    series.slices.template.adapters.add("fill", (fill, target) => {
      const index = series.dataItems.indexOf(target.dataItem);
      return am5.color(getColor(index, config.colors));
    });

    series.slices.template.adapters.add("stroke", (stroke, target) => {
      const index = series.dataItems.indexOf(target.dataItem);
      return am5.color(getColor(index, config.colors));
    });

    series.slices.template.set("tooltipText", "");

    series.labels.template.setAll({
      fontFamily: "Times New Roman",
      fontSize: 20,
      fill: am5.color(0x550000)
    });

    series.labels.template.set(
      "text",
      "{category}: \n{value} ({valuePercentTotal.formatNumber('0.00')}%[/]) "
    );

    series.data.setAll(data);

    return () => {
      root.dispose();
    };
  }, [config, data]);

  return <div ref={chartRef} style={{ width: "100%", height: "100%" }}></div>;
};

export default PieChart;
