import { useEffect, useState } from "react";
import { CommentaryType } from "../constants";
import { useUserContext } from "../contexts/UserContext";
import {
  Avatar,
  Box,
  Button,
  Stack,
  TextareaAutosize,
  Typography,
  createTheme,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { lime, purple } from "@mui/material/colors";

type CommentProps = {
  placeId: string;
};

export default function Comments(props: CommentProps) {
  const [commentaries, setCommentaries] = useState<CommentaryType[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const { user } = useUserContext();
  const { placeId } = props;

  useEffect(() => {
    // fetch commentaries
    if (placeId) {
      fetch(`http://localhost:8000/api/comments?placeId=${placeId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data: CommentaryType[]) => {
          console.log(data);
          setCommentaries(
            data.map((comment) => ({
              ...comment,
              datePosted: new Date(comment.datePosted),
            })),
          );
        })
        .catch((err) => {
          console.log(err);
          return "Err";
        });
    }
  }, [user, placeId]);

  function handlePostNewComment() {
    if (newComment === "") {
      alert("Can't post an empty comment");
      return;
    }

    const newCommentObj = {
      placeId: placeId,
      commentMsg: newComment,
      datePosted: new Date(),
      user: {
        userId: user.id,
        username: user.username,
        profilePhoto: user.profilePhoto,
      },
    };

    fetch(`http://localhost:8000/api/comments/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCommentObj),
    })
      .then((res) => res.json())
      .then((data: CommentaryType) => {
        console.log(data);
        setCommentaries([...commentaries, { _id: data._id, ...newCommentObj }]);
      })
      .catch((err) => {
        console.log(err);
        return "Err";
      });

    setNewComment("");
  }

  function formatDate(date: Date) {
    return `${date.getDate()}-${date.getMonth()} ${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`;
  }

  const theme = createTheme({
    palette: {
      primary: lime,
      secondary: purple,
    },
  });

  return (
    <Stack spacing={4} padding={2}>
      {commentaries
        .sort(
          (commentPostA, commentPostB) =>
            Number(commentPostB.datePosted) - Number(commentPostA.datePosted),
        )
        .map((commentPost) => (
          <Box key={commentPost._id}>
            <Stack flexDirection="row" gap={4} alignItems="center">
              <Stack>
                <Avatar
                  alt={commentPost.user.username}
                  src={`../img/users/${commentPost.user.profilePhoto}`}
                />
                <Typography variant="body1">
                  {commentPost.user.username}
                </Typography>
              </Stack>
              <Stack
                bgcolor="secondary.main"
                className="rounded-lg"
                padding={2}
              >
                <Typography>{commentPost.commentMsg}</Typography>
                <Typography>{`Posted at: ${formatDate(
                  commentPost.datePosted,
                )}`}</Typography>
              </Stack>
            </Stack>
          </Box>
        ))}

      <Stack flexDirection="row" position="relative" gap={1}>
        <Avatar alt={user.username} src={`../img/users/${user.profilePhoto}`} />
        <Stack width="100%">
          <textarea
            aria-label="empty textarea"
            className=" rounded-lg p-4 text-black"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add your comment."
            rows={4}
          />
          <Box alignSelf="flex-end" position="absolute" bottom="0">
            <Button
              variant="contained"
              color="primary"
              onClick={handlePostNewComment}
              className="m-2"
            >
              Post
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}
