import useStore from '../store';

const useUserHandlers = () => {
  const store = useStore();

  const handleUpdateUser = async (id, userData) => {
    try {
      const updatedUser = await store.updateUser(id, userData);
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  const handleFetchUser = async (id) => {
    try {
      await store.fetchUser(id);
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  };

  const handleFetchAllUsers = async () => {
    try {
      await store.fetchAllUsers();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };

  return {
    handleUpdateUser,
    handleFetchUser,
    handleFetchAllUsers,
  };
};

export default useUserHandlers;
