import { User } from "@prisma/client";
import React from "react";

export const useGetUser = () => {
  const [userData, setUserData] = React.useState<null | User>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/get`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const userData = await response.json();
        setUserData(userData);
        setIsLoading(false)
      } catch (error) {
        console.error("Ошибка при получении пользователя:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return {
    userLoading: isLoading,
    user: userData,
  };
};
