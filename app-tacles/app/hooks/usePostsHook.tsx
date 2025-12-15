import { useEffect, useState } from "react";
import { Card, cards } from "../../components/discordComponents/cards";
import { PostsService } from "../../services/PostsService";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

import { UserResponseDto } from "../../services/UserService";
import { useNavigate } from "react-router-dom";

export function usePostsHook(user: UserResponseDto | undefined) {
  const [myPosts, setMyPosts] = useState<Card[]>(cards);
  const [isLoading, setIsLoading] = useState(true);

  const postsService = new PostsService(useNavigate);

  const [userPremium, setUserPremium] = useState(user?.premium || false);

  const postsLimit = 5;

  useEffect(() => {
    setUserPremium(user?.premium || false);
  }, [user]);

  useEffect(() => {
    async function fetch() {
      setIsLoading(true);
      setMyPosts(await postsService.list());
      setIsLoading(false);
    }

    fetch();
  }, []);

  const addPost = (newPost: Card) => {
    setMyPosts([newPost, ...myPosts]);
  };

  const editPost = (index: number, updatedPost: Card) => {
    const updatedPosts = [...myPosts];
    updatedPosts[index] = updatedPost;
    setMyPosts(updatedPosts);
  };

  const deletePost = (index: number) => {
    setMyPosts(myPosts.filter((_, i) => i !== index));
  };

  const handleRepost = async (postId: string) => {
    if (!userPremium) {
      toast.warning(
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FontAwesomeIcon icon={faCrown} style={{ color: "#FFD700" }} />
          <span>Você precisa ser premium para repostar!</span>
        </div>,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            background: "linear-gradient(45deg, #2C2F33, #23272A)",
            color: "#fff",
            border: "1px solid #FFD700",
          },
        }
      );
      return;
    }

    await postsService.repostMessage(
      postId,
      () => {
        console.log("sucesso");
      },
      () => {
        console.log("falha");
      }
    );
  };

  return {
    myPosts,
    addPost,
    editPost,
    deletePost,
    isLoading,
    userPremium,
    handleRepost,
    postsLimit,
  };
}
