import { useState } from "react";

export function useUserInfo(info) {
  const [userInfo, setUserInfo] = useState(info);
  return [userInfo, setUserInfo];
}
