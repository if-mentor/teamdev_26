"use client";

import { useEffect, useState } from "react";
import CommentCard from "@/components/CommentCard";
import type { ReactNode } from "react";
import type { Comment } from "@/types/comment";

type CommentListProps = {
  postId: string;
  children: ReactNode;
  classNames: {
    title: string;
    num: string;
    cardWrap: string;
  };
};

const CommentList = ({ postId, children, classNames }: CommentListProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/posts/${postId}/comments`);

        if (!response.ok) {
          throw new Error("コメントの取得に失敗しました");
        }

        const data: Comment[] = await response.json();
        setComments(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, [postId]);

  return (
    <>
      <h2 className={classNames.title}>
        <span className={classNames.num}>{comments.length}</span>件のコメント
      </h2>
      {children}
      <div className={classNames.cardWrap}>
        {comments.map((comment: Comment) => (
          <CommentCard
            key={comment.id}
            userName={comment.user.name}
            createdAt={comment.createdAt}
            content={comment.content}
          />
        ))}
      </div>
    </>
  );
};

export default CommentList;
