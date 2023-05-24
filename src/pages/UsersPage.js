import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import UsersService from "../api/services/UsersService";

const USERS_KEY = "users";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const queryClient = useQueryClient();

  useQuery([USERS_KEY], UsersService.getAllUsers, {
    onSuccess(data) {
      setUsers(data);
      queryClient.setQueryData(USERS_KEY, data);
    },
  });

  return (
    <div>
      {users?.map((user) => (
        <p key={user.id}>
          {user.email}, {user.password}
        </p>
      ))}
    </div>
  );
};

export default UsersPage;
