export const config = (data) => {
  return {
    id: "chartdiv",
    height: `${Math.max(400, data.length * 30)}px`,
    data: data,
    categoryYField: "category",
    categoryFields: ["sale", "ships", "profit"],
    categoryTitle: ["Sales", "Ships", "Profit"],
    colors: ["#FF5733", "#33FF57", "#3357FF"]
  };
};
