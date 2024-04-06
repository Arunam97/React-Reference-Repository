// Transform filters to UI
export const tansformFiltersToUI = (jsonData, keyMappings) => {
  // Function to rename keys in an object based on keyMappings
  const renameKeys = (obj, keyMap) =>
    Object.keys(obj).reduce((acc, key) => {
      const newKey = keyMap[key] || key; // Find the new key name or use the original
      acc[newKey] = obj[key];
      return acc;
    }, {});

  // Transform each top-level key in the jsonData
  const transformedData = Object.keys(jsonData).reduce((acc, key) => {
    const newKey = keyMappings[key] || key; // Find the new key name or use the original
    const items = jsonData[key].map((item) => {
      // For each item, first, directly rename keys based on keyMappings
      let newItem = renameKeys(item, keyMappings);

      // Then, check for nested arrays and rename their keys if necessary
      Object.keys(keyMappings).forEach((nestedKey) => {
        if (newItem[nestedKey]) {
          const nestedNewKey = keyMappings[nestedKey];
          newItem[nestedNewKey] = newItem[nestedKey];
          delete newItem[nestedKey]; // Remove the old key after renaming
        }
      });

      return newItem;
    });

    acc[newKey] = items;
    return acc;
  }, {});

  return transformedData;
};

// Transform UI to filters
export const transformUIToFilters = (originalData, mappings) => {
  // Create a new object to store the transformed key-value pairs
  const transformedData = {};

  // Iterate over each key in the original data
  Object.keys(originalData).forEach((key) => {
    // Check if there's a mapping for the current key
    if (mappings[key]) {
      // If there's a mapping, use the new key from the mappings object
      transformedData[mappings[key]] = originalData[key];
    } else {
      // If there's no mapping, keep the original key
      transformedData[key] = originalData[key];
    }
  });

  return transformedData;
};

// Function to create filters with buyer user id
export const createFiltersWithBuyerUserId = (jsonData, currentBuyerFilters) => {
  const buyerUserIdFilter = currentBuyerFilters.find((filter) =>
    Object.keys(filter).includes("BUYER_USERID")
  );

  // Start with a fresh set of filters containing only BUYER_USERID
  const newFilters = buyerUserIdFilter ? [buyerUserIdFilter] : [];

  // Use a map for easy update or addition of new filters
  const filtersMap = new Map();

  // Populate the map with current filters excluding BUYER_USERID
  currentBuyerFilters.forEach((filter) => {
    const key = Object.keys(filter)[0];
    if (key !== "BUYER_USERID") {
      filtersMap.set(key, filter[key]);
    }
  });

  // Update or add filters based on jsonData
  Object.entries(jsonData).forEach(([key, values]) => {
    if (values.length > 0) {
      // Determine the filter type based on the key
      const filterType = key === "VENDOR_NBR" ? "number" : "text";
      // Generate conditions, adding "operator": "OR" as needed
      const conditions = values.map((value, index) => ({
        type: "equals",
        filterValue: value,
        ...(index < values.length - 1 ? { operator: "OR" } : {}) // Add "operator": "OR" except for the last item
      }));

      // Update or add the filter in the map
      filtersMap.set(key, { filterType, conditions });
    } else {
      // If the selection is empty, remove the filter
      filtersMap.delete(key);
    }
  });

  // Convert the map back into the filters array format, ensuring unique keys
  filtersMap.forEach((value, key) => {
    // Check and adjust for the presence of "operator": "OR" in single conditions
    if (value.conditions.length === 1 && value.conditions[0].operator) {
      delete value.conditions[0].operator; // Remove "operator": "OR" if it's the only condition left
    }
    newFilters.push({ [key]: value });
  });

  return newFilters;
};
