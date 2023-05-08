import { useState, useEffect, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import useAuthStore from "../store/authStore";
import useProfile from "../auth/useProfile";

const UserProfilePage = () => {
  const authUser = useAuthStore((state) => state.authUser);
  const fileRef = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [uploaded, setUploaded] = useState(null);

  useEffect(() => {
    if (authUser) {
      setUsername(authUser.name);
      setEmail(authUser.email);
    }
  }, [authUser]);

  const { profileQuery, editProfileMutation, uploadAvatarMutation } =
    useProfile();

  const { data: profile } = profileQuery;
  const { mutate: editUser, status } = editProfileMutation;
  const { mutateAsync: uploadAvatar } = uploadAvatarMutation;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUserData = { name: username, email };
    editUser(newUserData);
  };

  const handleUpload = async (e) => {
    const selectedImg = e.target.files[0];
    if (!selectedImg) return;
    const fileToUpload = new FormData();
    fileToUpload.append("file", selectedImg);

    const uploadedFile = await uploadAvatar(fileToUpload);
    setUploaded(uploadedFile.location);
  };

  const handleEditAvatarClick = () => {
    fileRef.current.click();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="20px"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
      {profile && (
        <>
          <Box position="relative" sx={{ padding: "0 60px" }}>
            <Avatar
              alt="my avatar"
              src={uploaded}
              sx={{ width: 100, height: 100 }}
            >
              {!uploaded && authUser.name.slice(0, 1)}
            </Avatar>

            <input
              style={{
                opacity: 0,
                height: 0,
                width: 0,
                lineHeight: 0,
                overflow: "hidden",
                padding: 0,
                margin: 0,
              }}
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleUpload}
            />
            <IconButton
              onClick={handleEditAvatarClick}
              sx={{ position: "absolute", right: 0, bottom: 0 }}
            >
              <EditIcon />
            </IconButton>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            rowGap="15px"
            flexDirection="column"
            alignItems="center"
            noValidate
          >
            <TextField
              label="Username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="off"
              variant="outlined"
              fullWidth
            />
            <TextField
              label="Email Address"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="off"
              variant="outlined"
              fullWidth
            />

            <LoadingButton
              variant="contained"
              type="submit"
              color="primary"
              loading={status === "loading"}
              disabled={!email || !username ? true : false}
              sx={{ mt: 0, mb: 5 }}
            >
              <span>Save changes</span>
            </LoadingButton>
          </Box>
        </>
      )}
    </Box>
  );
};

export default UserProfilePage;
