export const filter_dropdown_mock = {
  Vendor: [
    {
      id: "Vendor C",
      value: "Vendor C",
      "Department and Fineline": ["20-4300"]
    },
    {
      id: "Vendor A",
      value: "Vendor A",
      "Department and Fineline": ["20-4200", "30-4100"]
    },
    {
      id: "Vendor B",
      value: "Vendor B",
      "Department and Fineline": ["20-4200", "40-3900"]
    }
  ],
  "Department and Fineline": [
    {
      id: "20-4200",
      value: "20-4200",
      Vendor: ["Vendor A", "Vendor B"]
    },
    {
      id: "30-4100",
      value: "30-4100",
      Vendor: ["Vendor A"]
    },
    {
      id: "40-3900",
      value: "40-3900",
      Vendor: ["Vendor B"]
    },
    {
      id: "20-4300",
      value: "20-4300",
      Vendor: ["Vendor C"]
    }
  ]
};
