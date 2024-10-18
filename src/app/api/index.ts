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

export const fetchUserInfo = createAsyncThunk("user/fetchUsers", async () => {
  const users = await fetch("http://localhost:3000/users").then((response) =>
    response.json()
  );

  const posts = await fetch("http://localhost:3000/posts").then((response) =>
    response.json()
  );

  const addUserPostCount = users.map((user: UserTypes) => {
    const userPosts = posts.filter(
      (post: PostTypes) => post.author === user.login
    );
    return {
      ...user,
      userPosts: userPosts,
    };
  });
  return addUserPostCount;
});

export const requestPosts = createAsyncThunk(
  "post/requestPosts",
  async ({ title, image, content, link, author }: PostTypes) => {
    const newPost = {
      id: Date.now(),
      title: title,
      image: image,
      content: content,
      date: new Date().toISOString().slice(0, 10),
      link: link,
      source: new URL(link).hostname,
      author: author,
    };
    return await fetch(`http://localhost:3000/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    }).then((response) => response.json());
  }
);

export const requestUser = createAsyncThunk(
  "user/requestUsers",
  async ({ login, password, firstname, lastname, userPosts }: UserTypes) => {
    const newUser = {
      id: Date.now(),
      login,
      password,
      firstname,
      lastname,
      userPosts,
    };

    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    return response.json();
  }
);

export const searchUsers = createAsyncThunk(
  "user/requestUsers",
  async (searchCriteria: { login: string; password: string }) => {
    const query = new URLSearchParams(searchCriteria).toString();
    const response = await fetch(`http://localhost:3000/users?${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response: any) => response.json()[0]);
    return response;
  }
);

export const rootReducer = createSlice({
  name: "data",
  initialState: {
    posts: [],
    user: {},
    userLogged: {},
    loading: false,
    error: undefined,
    hasNextPage: true,
  },
  reducers: {
    setUserLogged: (state, action) => {
      state.userLogged = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, (state: StateTypes, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(requestPosts.pending, (state: StateTypes) => {
        state.loading = true;
      })
      .addCase(requestPosts.fulfilled, (state: StateTypes, action) => {
        state.loading = false;
        state.posts.push(action.payload);
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
      .addCase(requestUser.pending, (state: StateTypes) => {
        state.loading = true;
      })
      .addCase(requestUser.fulfilled, (state: StateTypes, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(requestUser.rejected, (state: StateTypes, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setUserLogged } = rootReducer.actions;
export default rootReducer.reducer;
