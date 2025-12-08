import { User as UserEntity } from "../entities/user.entity";
import { User, Auth0UserJson } from "../types";

export const mergeAuthProviderAndDbUser = (
  authProviderUser: Auth0UserJson,
  dbUser: UserEntity,
): User => ({
  ...authProviderUser,
  emrId: dbUser.emrId,
  role: dbUser.role,
});
