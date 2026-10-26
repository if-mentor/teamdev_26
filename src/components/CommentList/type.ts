import type { ReactNode } from "react";

export interface Comment {
  id: string;
  userId: string;
  postId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: {
    name: string;
  };
}

export interface CommentListProps {
  postId: string;
  children: ReactNode;
  classNames: {
    title: string;
    num: string;
    cardWrap: string;
  };
}
