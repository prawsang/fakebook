import React, { useState, useCallback } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { isEmpty } from "lodash";
import { getCurrentUser } from "modules/auth/selectors";
import {
  Card,
  Textarea,
  Padded,
  Gap,
  Button,
  Flex,
  Avatar,
} from "common/components";
import dayjs from "dayjs";

type FormValues = {
  content: string;
};

// Validation
const disableButton = ({ content }: FormValues) => {
  if (isEmpty(content)) return true;
  return false;
};

const AddPostPage = () => {
  const currentUser = useSelector(getCurrentUser);

  const [content, setContent] = useState("");

  const changeContent = (e) => {
    setContent(e.target.value);
  };

  const postSubmit = useCallback(() => {
    Axios.post("/api/post/new", {
      userId: currentUser._id,
      username: currentUser.username,
      fullname: currentUser.fullname,
      avatar: currentUser.avatar,
      content,
      dateTime: dayjs(),
    }).then(() => {
      Swal.fire({
        icon: "success",
        title: "Success",
      });
    });
  }, [currentUser, content]);

  return (
    <Card>
      <Padded $all="16px">
        <Padded $bottom="16px">
          <Flex $space="16px" $align="center">
            <Avatar
              $url={currentUser?.avatar}
              $rounded
              $size="48px"
              style={{ marginBottom: 0 }}
            />
            <h3>{currentUser?.fullname}</h3>
          </Flex>
        </Padded>
        <Padded $bottom="16px">
          <Textarea
            label=""
            placeholder="What's on your mind?"
            value={content}
            onChange={changeContent}
          />
        </Padded>
        <Button onClick={postSubmit} disabled={disableButton({ content })}>
          Post
        </Button>
      </Padded>
    </Card>
  );
};

export default AddPostPage;
