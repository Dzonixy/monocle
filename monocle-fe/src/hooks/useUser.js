import { useState } from "react";

export function useUser() {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");

  function handleSelectUser(selectedUser) {
    setUser(selectedUser);
    setFirstName(selectedUser.username.split(" ")[0]);
  }

  return { user, firstName, handleSelectUser };
}
