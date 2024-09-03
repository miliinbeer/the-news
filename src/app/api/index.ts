import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PostTypes, StateTypes, UserTypes } from "../../shared/types";

export const fetchPosts = createAsyncThunk("post/fetchPosts", async () => {
  return await fetch("http://localhost:3000/posts").then((response) =>
    response.json()
  );
});

export const fetchUsers = createAsyncThunk("user/fetchUser", async () => {
  return await fetch("http://localhost:3000/users").then((response) =>
    response.json()
  );
});

export const requestPosts = createAsyncThunk(
  "post/requestPosts",
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

export const requestUsers = createAsyncThunk(
  "user/requestUsers",
  async ({ login, password, firstname, lastname }: UserTypes) => {
    const newUser = {
      id: Date.now(),
      login: login,
      password: password,
      firstname: firstname,
      lastname: lastname,
    };
    return await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    }).then((response) => response.json());
  }
);

export const rootReducer = createSlice({
  name: "data",
  initialState: {
    post: [],
    user: [],
    loading: false,
    error: undefined,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state: StateTypes, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(fetchPosts.rejected, (state: StateTypes, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(requestPosts.pending, (state: StateTypes, action) => {
        state.loading = true;
      })
      .addCase(requestPosts.fulfilled, (state: StateTypes, action) => {
        state.loading = false;
        state.post.push(action.payload);
      })
      .addCase(requestPosts.rejected, (state: StateTypes, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUsers.pending, (state: StateTypes) => {
        state.loading = false;
      })
      .addCase(fetchUsers.fulfilled, (state: StateTypes, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUsers.rejected, (state: StateTypes, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(requestUsers.pending, (state: StateTypes) => {
        state.loading = true;
      })
      .addCase(requestUsers.fulfilled, (state: StateTypes, action) => {
        state.loading = false;
        state.user.push(action.payload);
      })
      .addCase(requestUsers.rejected, (state: StateTypes, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default rootReducer.reducer;