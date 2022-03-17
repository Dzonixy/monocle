// Utils
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Constants
import { POST, POSTS_API } from "constants/index";

export const postsApi = createApi({
  reducerPath: POSTS_API,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_PATH,
    prepareHeaders: (headers, _) => headers,
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => POST,
      transformResponse: (res) => res.data.posts,
      providesTags: ["Post"],
    }),
    getPost: builder.query({
      query: (id) => `${POST}/${id}`,
      transformResponse: (res) => res.data,
    }),
    followPost: builder.mutation({
      query: (post) => ({
        url: `/${POST}/${post.postId}/like`,
        method: "POST",
        body: { userId: post.userId },
      }),
      async onQueryStarted({ postId, userId }, { dispatch, queryFulfilled }) {
        const postResult = dispatch(
          postsApi.util.updateQueryData("getPosts", undefined, (draft) => {
            const post = draft.find((p) => p.postId === postId);
            const isFollowed = post.likes.find(
              (followerId) => followerId === userId
            );

            if (post) {
              if (!isFollowed) {
                post.likes.push(userId);
              } else {
                post.likes = post.likes.filter(
                  (followerId) => followerId !== userId
                );
              }
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          postResult.undo();
        }
      },
    }),
    salePost: builder.mutation({
      query: (post) => ({
        url: `/${POST}/${post.postId}/sale`,
        method: "POST",
        body: { price: parseInt(post.price).toFixed(2) },
      }),
      async onQueryStarted(
        { postId, price, onSale },
        { dispatch, queryFulfilled }
      ) {
        const postResult = dispatch(
          postsApi.util.updateQueryData("getPosts", undefined, (draft) => {
            const post = draft.find((p) => p.postId === postId);

            if (post) {
              post.onSale = onSale;
              post.price = price;
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          postResult.undo();
        }
      },
    }),
    buyPost: builder.mutation({
      query: (post) => ({
        url: `/${POST}/${post.postId}/buy`,
        method: "POST",
        body: { buyerId: post.buyerId },
      }),
      async onQueryStarted({ postId, buyerId }, { dispatch, queryFulfilled }) {
        const postResult = dispatch(
          postsApi.util.updateQueryData("getPosts", undefined, (draft) => {
            const post = draft.find((p) => p.postId === postId);

            if (post) {
              post.owner = buyerId;
              post.onSale = false;
              post.price = null;
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          postResult.undo();
        }
      },
    }),
    createPost: builder.mutation({
      query: (post) => ({
        url: `/${POST}`,
        method: "POST",
        body: {
          poster: post.userId,
          title: post.title,
          // image: post.image,
          description: post.description,
        },
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetPostsQuery: useGetPosts,
  useGetPostQuery: useGetPost,
  useFollowPostMutation: useFollowPost,
  useSalePostMutation: useSalePost,
  useBuyPostMutation: useBuyPost,
  useCreatePostMutation: useCreatePost,
} = postsApi;
