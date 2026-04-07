import { createFeatureSelector } from '@ngrx/store';
import { PostInterface } from '../../Interface/jsonplaceholder.interface';
export const selectPosts = createFeatureSelector<ReadonlyArray<PostInterface>>('posts');