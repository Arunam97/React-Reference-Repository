import { atom, selector } from "recoil";
import { SelectedBuyerAtom } from "./SelectedBuyerAtom";

export const BuyerFiltersAtom = atom({
  key: "VendorFiltersAtom",
  default: selector({
    key: "VendorFiltersAtom/Default",
    get: ({ get }) => {
      const selectedBuyer = get(SelectedBuyerAtom);
      const buyerUserId = selectedBuyer.BUYER_USERID || "";
      return [
        {
          BUYER_USERID: {
            filterType: "text",
            conditions: [
              {
                type: "equals",
                filterValue: buyerUserId
              }
            ]
          }
        }
      ];
    }
  })
});
