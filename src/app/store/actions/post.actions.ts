import { createActionGroup, props } from "@ngrx/store";
import { PostInterface } from "../../Interface/jsonplaceholder.interface";

export const PostsApiActions = createActionGroup({
  source: 'Posts API',
  events: {
      //props<>() = defines all other meta-data to describe the Action.
      'Retrieved Post List': props<{ posts: ReadonlyArray<PostInterface> }>(),
  },
});