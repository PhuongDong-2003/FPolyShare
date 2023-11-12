import { createSelector } from "@reduxjs/toolkit";
import ProductAPI from "./service";

const getProductsResult = ProductAPI.endpoints.getProducts.select();

export const selectProductWithActive = createSelector(
  getProductsResult,
  (result) => result?.data?.filter(item => item.status === 'ACTIVE') ?? []
)

export const selectProductWithPending = createSelector(
  getProductsResult,
  (result) => result?.data?.filter(item => item.status === 'PENDING') ?? []
)

export const selectProductsByStatus = (products, status) => {
  return products.filter(product => product.status === status);
}