import { createSlice } from "@reduxjs/toolkit";

export const searchTextSlice = createSlice({
    name: "searchText",
    initialState: {
        value: "",
    },
    reducers: {
        setSearchText: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setSearchText } = searchTextSlice.actions;

export const selectSearchText = (state) => state.searchText.value;

export default searchTextSlice.reducer;
