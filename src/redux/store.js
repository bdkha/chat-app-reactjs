import { configureStore } from "@reduxjs/toolkit";
import searchTextReducer from "./searchTextSlices";

export default configureStore({
    reducer: {
        searchText: searchTextReducer,
    },
});
