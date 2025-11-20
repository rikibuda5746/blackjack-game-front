import { Table } from "@shared/components/Table";
import { useUsersManagment } from "../hooks/useUsersManagment";
import styles from './UsersManagement.module.scss';
const UsersManagement = () => {
  const { users, columns } = useUsersManagment();

  return (
    <div className={styles.usersManagement}>
      <div className={styles.usersManagementTitle}>All users</div>
      <Table
        data={users} columns={columns}
      />
    </div>
  );
};

export default UsersManagement;
