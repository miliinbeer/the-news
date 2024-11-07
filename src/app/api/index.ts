import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { StateTypes, UserTypes } from "../../shared/types";
import { v4 as uuidv4 } from "uuid";
import { StateTypes } from "../../shared/types";
// import { auth, provider } from "../firebase";

// export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
//   return await fetch("http://localhost:3000/users").then((response) =>
//     response.json()
//   );
// });

// export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
//   const users = await fetch("http://localhost:3000/users").then((response) =>
//     response.json()
//   );

//   const posts = await fetch("http://localhost:3000/posts").then((response) =>
//     response.json()
//   );

//   const addUserPostsCount = users.map((user: UserTypes) => {
//     const userPosts = posts.filter(
//       (post: PostTypes) => post.author === user.login
//     );
//     return {
//       ...user,
//       userPosts: userPosts,
//     };
//   });
//   return addUserPostsCount;
// });

// export const requestUser = createAsyncThunk(
//   "users/requestUser",
//   async ({ login, password, firstname, lastname, userPosts }: any) => {
//     const newUser = {
//       id: uuidv4(),
//       login,
//       password,
//       firstname,
//       lastname,
//       userPosts,
//     };

//     const response = await fetch("http://localhost:3000/users", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newUser),
//     });

//     return response.json();
//   }
// );

// export const searchUsers = createAsyncThunk(
//   "users/requestUsers",
//   async (searchCriteria: { login: string; password: string }) => {
//     const query = new URLSearchParams(searchCriteria).toString();
//     const response = await fetch(`http://localhost:3000/users?${query}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }).then((response: any) => response.json()[0]);
//     return response;
//   }
// );

export const rootReducer = createSlice({
  name: "data",
  initialState: {
    // posts: [],
    posts: [],
    user: {},
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
      state.posts = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(fetchUsers.pending, (state: StateTypes) => {
    //     state.loading = false;
    //   })
    //   .addCase(fetchUsers.fulfilled, (state: StateTypes, action) => {
    //     state.loading = false;
    //     state.users = action.payload;
    //   })
    //   .addCase(fetchUsers.rejected, (state: StateTypes, action) => {
    //     state.loading = false;
    //     state.error = action.error.message;
    //   })
    //   .addCase(requestUser.pending, (state: StateTypes) => {
    //     state.loading = true;
    //   })
    //   .addCase(requestUser.fulfilled, (state: StateTypes, action) => {
    //     state.loading = false;
    //     state.users = action.payload;
    //   })
    //   .addCase(requestUser.rejected, (state: StateTypes, action) => {
    //     state.loading = false;
    //     state.error = action.error.message;
    //   });
  },
});

export const { setPosts, setUser, setUserLogged } = rootReducer.actions;
export default rootReducer.reducer;
