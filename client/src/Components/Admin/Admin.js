import styles from "./admin.module.css";

const Admin = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.head}>
        Admin: <span className={styles.firstName}>First name</span>
      </div>
      <div className={styles.body}>
        <table className={styles.table_wrapper}>
          <thead className={styles.table_head}>
            <tr>
              <th>S/N</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody className={styles.table_body}>
            <tr>
              <td>1</td>
              <td>Ofega</td>
              <td>Chinedu</td>
              <td>oc@mail.com</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Admin;
