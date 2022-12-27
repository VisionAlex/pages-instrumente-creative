import {
  OrderFinancialStatus,
  OrderFulfillmentStatus,
} from "~/generated/graphql";

export const getFinancialStatus = (
  status: OrderFinancialStatus | null | undefined
) => {
  switch (status) {
    case OrderFinancialStatus.Pending:
      return "În așteptare";
    case OrderFinancialStatus.Paid:
      return "Plătită";
    case OrderFinancialStatus.Authorized:
      return "Autorizată";
    case OrderFinancialStatus.PartiallyPaid:
      return "Parțial plătită";
    case OrderFinancialStatus.PartiallyRefunded:
      return "Parțial rambursată";
    case OrderFinancialStatus.Refunded:
      return "Rambursată";
    case OrderFinancialStatus.Voided:
      return "Anulată";
    default:
      return status;
  }
};

export const getFulfillmentStatus = (status: OrderFulfillmentStatus) => {
  switch (status) {
    case OrderFulfillmentStatus.Fulfilled:
      return "Îndeplinită";
    case OrderFulfillmentStatus.Unfulfilled:
      return "Neîndeplinită";
    case OrderFulfillmentStatus.PartiallyFulfilled:
      return "Parțial";
    default:
      return status;
  }
};
