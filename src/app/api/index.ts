import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PostTypes, StateTypes } from "../../shared/types";

export const fetchData = createAsyncThunk("data/fetchData", async () => {
  return await fetch("http://localhost:3000/posts").then((response) =>
    response.json()
  );
});

export const requestPost = createAsyncThunk(
  "data/requestPost",
  async ({ title, image, content, link }: PostTypes) => {
    const newPost = {
      id: Date.now(),
      title: title,
      image: image,
      content: content,
      date: new Date().toISOString().slice(0, 10),
      link: link,
      source: new URL(link).hostname,
    };
    return await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    }).then((response) => response.json());
  }
);

export const rootReducer = createSlice({
  name: "data",
  initialState: {
    data: [],
    loading: false,
    error: undefined,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state: StateTypes, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state: StateTypes, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(requestPost.pending, (state: StateTypes, action) => {
        state.loading = true;
      })
      .addCase(requestPost.fulfilled, (state: StateTypes, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(requestPost.rejected, (state: StateTypes, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default rootReducer.reducer;
export const {} = rootReducer.actions;
