import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@app/store/store";
import { useGetAdminUsersMutation } from "../api/adminApi";
import { setAdminUsers } from "../store/adminSlice";

export const useUsersManagment = () => {

    const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.admin.adminUsers);
    const [getUsersMutation ] = useGetAdminUsersMutation();

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
          const response = await getUsersMutation().unwrap();
          dispatch(setAdminUsers(response.data));
        } catch {
          console.error('Failed to get users');
        }
    };

    const columns = [
        {
          header: 'Name',
          accessorKey: 'name',
        },
        {
          header: 'Email',
          accessorKey: 'email',
        },
        {
          header: 'Balance',
          accessorKey: 'balance',
        }
    ];

  return {
    users,
    columns
  };
};