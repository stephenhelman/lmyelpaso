import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const updatesAdapter = createEntityAdapter({});

const initialState = updatesAdapter.getInitialState();

export const updatesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUpdates: builder.query({
      query: () => ({
        url: "/updates", //confirm endpoint
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedUpdates = responseData.map((update) => {
          update.id = update._id;
          if (update?.__t) {
            update.type = update.__t;
          }
          return update;
        });
        return updatesAdapter.setAll(initialState, loadedUpdates);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Update", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Update", id })),
          ];
        } else return [{ type: "Update", id: "LIST" }];
      },
    }),
    addNewUpdate: builder.mutation({
      query: (initialUpdate) => ({
        url: "/updates",
        method: "POST",
        body: {
          ...initialUpdate,
        },
      }),
      invalidatesTags: [{ type: "Update", id: "LIST" }],
    }),
    addNewAdminUpdate: builder.mutation({
      query: (initialUpdate) => ({
        url: "/updates/admin",
        method: "POST",
        body: {
          ...initialUpdate,
        },
      }),
      invalidatesTags: [{ type: "Update", id: "LIST" }],
    }),
    addNewAddUpdate: builder.mutation({
      query: (initialUpdate) => ({
        url: "/updates/add",
        method: "POST",
        body: {
          ...initialUpdate,
        },
      }),
      invalidatesTags: [{ type: "Update", id: "LIST" }],
    }),
    addNewRemoveUpdate: builder.mutation({
      query: (initialUpdate) => ({
        url: "/updates/remove",
        method: "POST",
        body: {
          ...initialUpdate,
        },
      }),
      invalidatesTags: [{ type: "Update", id: "LIST" }],
    }),
    deleteUpdate: builder.mutation({
      query: ({ id }) => ({
        url: `/updates`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Update", id: "LIST" }],
    }),
  }),
});

export const {
  useGetUpdatesQuery,
  useAddNewUpdateMutation,
  useAddNewAdminUpdateMutation,
  useAddNewAddUpdateMutation,
  useAddNewRemoveUpdateMutation,
  useDeleteUpdateMutation,
} = updatesApiSlice;

// returns the query result object
export const selectUpdatesResult =
  updatesApiSlice.endpoints.getUpdates.select();

// creates memoized selector
const selectUpdatesData = createSelector(
  selectUpdatesResult,
  (updatesResult) => updatesResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllUpdates,
  selectById: selectUpdateById,
  selectIds: selectUpdateIds,
  // Pass in a selector that returns the updates slice of state
} = updatesAdapter.getSelectors(
  (state) => selectUpdatesData(state) ?? initialState
);
