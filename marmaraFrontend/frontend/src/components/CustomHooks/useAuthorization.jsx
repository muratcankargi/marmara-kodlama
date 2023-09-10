import { useAuthenticate } from "./useAuthenticate";

export function useAuthorization() {
  const { authenticate } = useAuthenticate();

  // serverden gelen abilities kısmını yetki olarak
  // kullanıcaz sign up yapmış ama createprofilepage
  // doldurmamış birisi almostUser olacak
  const getPermissions = async () => {
    const permissions = await authenticate();
    return permissions.abilities;
  };

  return { getPermissions };
}
