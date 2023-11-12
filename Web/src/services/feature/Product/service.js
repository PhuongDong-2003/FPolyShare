import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* 
  - Định dạng data được trả về còn tuy thuộc vào api được thiết kế như thế nào,
  trong trường hợp này nó chỉ đúng với json-server
  - Định dạng data được trả về phải có sự thông nhất giữa FE và BE
*/

const ProductAPI = createApi({
  reducerPath: "productAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3030/products",
    timeout: 10_000,
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),

      transformResponse: (response) => response,

      transformErrorResponse: (response) => response,

      providesTags: (result) =>
        result
          ? [
              ...result.map((product) => ({ type: "Products", id: product.id })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),

    getProduct: builder.query({
      query: (id) => ({
        url: `${id}`,
        method: "GET",
      }),

      transformResponse: (response) => response,

      transformErrorResponse: (response) => response,
    }),

    createProduct: builder.mutation({
      query: (product) => ({
        url: "/",
        method: "POST",
        body: product,
      }),

      transformResponse: (response) => response,
      
      transformErrorResponse: (response) => response,
      
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),

    updateProduct: builder.mutation({
      query: (body) => ({
        url: `/${body.id}`,
        method: "PUT",
        body,
      }),

      transformResponse: (response) => response,

      transformErrorResponse: (response) => response,

      invalidatesTags: (result, error, data) => [{ type: 'Products', id: data.id }],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "Delete",
      }),
      
      transformResponse: (response) => response,
      
      transformErrorResponse: (response) => response,
      
      invalidatesTags: (result, error, id) => [{ type: "Products", id }]
    }),

    getProductsByUserID: builder.query({
      query: (id) => ({
        url: "",
        method: "GET",
        params: { user_id: id, }
      }),

      transformResponse: (response) => response[0],

      transformErrorResponse: (response) => response
    })
  }),
});

export const { 
  useGetProductsQuery,
  useGetProductQuery, 
  useCreateProductMutation, 
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductsByUserIDQuery
} = ProductAPI;

export default ProductAPI;