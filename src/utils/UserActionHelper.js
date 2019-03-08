/**
 * Helper class for user action.
 */
const UserActionHelper = {

    /**
     * Helper to check wheather the user has permission for certain action
     */
    checkUserPermissionAction : (permissions, action) => {
        return permissions && action && permissions.indexOf(action) < 0;
    }
}

export default UserActionHelper;
