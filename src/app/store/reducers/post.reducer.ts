import { createReducer,on } from "@ngrx/store";
import { PostInterface } from "../../Interface/jsonplaceholder.interface";
import { PostsApiActions } from "../actions/post.actions";
export const postsInitialState: ReadonlyArray<PostInterface> = [];
export const postsReducer = createReducer(
  postsInitialState,
  on(PostsApiActions.retrievedPostList, (_state, { posts }) => posts)
);
