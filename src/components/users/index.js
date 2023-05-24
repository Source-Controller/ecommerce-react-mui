import { useState, useEffect } from "react";
import axios from "../../api/axios";

const Users = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const res = await axios.get("/users", {
          signal: controller.signal,
        });
        console.log(res.data);
        isMounted && setUsers(res.data);
      } catch (err) {}
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort(); // terminate pending request if component unmounts
    };
  }, []);

  return (
    <article>
      <h2>Users list</h2>
      {users?.length > 0 ? (
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user?.email}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
};

export default Users;
