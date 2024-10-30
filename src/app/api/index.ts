import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PostTypes, StateTypes, UserTypes } from "../../shared/types";
import { v4 as uuidv4 } from "uuid";

// TODO Старый код
// export const fetchPosts = createAsyncThunk("post/fetchPosts", async () => {
//   return await fetch("http://localhost:3000/posts").then((response) =>
//     response.json()
//   );
// });

// TODO Вместо этой функции добавлена новая
// export const fetchUsers = createAsyncThunk("user/fetchUser", async () => {
//   return await fetch("http://localhost:3000/users").then((response) =>
//     response.json()
//   );
// });

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const users = await fetch("http://localhost:3000/users").then((response) =>
    response.json()
  );

  const posts = await fetch("http://localhost:3000/posts").then((response) =>
    response.json()
  );

  const addUserPostsCount = users.map((user: UserTypes) => {
    const userPosts = posts.filter(
      (post: PostTypes) => post.author === user.login
    );
    return {
      ...user,
      userPosts: userPosts,
    };
  });
  return addUserPostsCount;
});

// TODO Старый код
// export const requestPost = createAsyncThunk(
//   "post/requestPosts",
//   async ({ title, image, content, link, author }: PostTypes) => {
//     const newPost = {
//       id: uuidv4(),
//       title: title,
//       image: image,
//       content: content,
//       date: new Date().toISOString().slice(0, 10),
//       link: link,
//       source: new URL(link).hostname,
//       author: author,
//     };
//     return await fetch(`http://localhost:3000/posts`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newPost),
//     }).then((response) => response.json());
//   }
// );

export const requestUser = createAsyncThunk(
  "user/requestUser",
  async ({ login, password, firstname, lastname, userPosts }: UserTypes) => {
    const newUser = {
      id: uuidv4(),
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
    newPosts: [],
    users: {},
    userLogged: {},
    loading: false,
    error: undefined,
    hasNextPage: true,
  },
  reducers: {
    setUserLogged: (state, action) => {
      state.userLogged = action.payload;
    },
    setPosts: (state, action) => {
      state.newPosts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(fetchPosts.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(fetchPosts.fulfilled, (state, action) => {
      //   state.posts = action.payload;
      //   state.loading = false;
      // })
      // .addCase(fetchPosts.rejected, (state: StateTypes, action) => {
      //   state.loading = false;
      //   state.error = action.error.message;
      // })
      // .addCase(requestPost.pending, (state: StateTypes) => {
      //   state.loading = true;
      // })
      // .addCase(requestPost.fulfilled, (state: any, action) => {
      //   state.loading = false;
      //   state.posts.push(action.payload);
      // })
      // .addCase(requestPost.rejected, (state: StateTypes, action) => {
      //   state.loading = false;
      //   state.error = action.error.message;
      // })
      .addCase(fetchUsers.pending, (state: StateTypes) => {
        state.loading = false;
      })
      .addCase(fetchUsers.fulfilled, (state: StateTypes, action) => {
        state.loading = false;
        state.users = action.payload;
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
        state.users = action.payload;
      })
      .addCase(requestUser.rejected, (state: StateTypes, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setUserLogged, setPosts } = rootReducer.actions;
export default rootReducer.reducer;
