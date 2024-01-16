import { useState } from 'react';
import styles from './App.module.css';
import Users from './data.json';

function App() {
  const [showUser, setShowUser] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [allUsers, setAllUsers] = useState(Users);
  const [chippedUsers, setChippedUsers] = useState([]);

  function toggleUsers() {
    setShowUser(!showUser);
  }

  function handleSearch(e) {
    const temp = e.target.value;
    setUserInput(temp);
    const searchedUsers = Users.filter(({ name }) => {
      const lowercaseName = name.toLowerCase();
      const lowercaseTemp = temp.toLowerCase();
      return lowercaseName.includes(lowercaseTemp);
    });
    setAllUsers(searchedUsers);
  }

  function makeChip(e) {
    const user = allUsers.filter(
      ({ name }) => name === e.currentTarget.children[0].children[1].textContent
    );
    setChippedUsers([...chippedUsers, user]);

    const leftUsers = allUsers.filter(
      ({ name }) => name !== e.currentTarget.children[0].children[1].textContent
    );
    setAllUsers(leftUsers);
  }

  function deleteChip(e) {
    const user = chippedUsers.filter(
      (item) => item[0].name === e.target.parentElement.children[1].textContent
    );
    setAllUsers([...allUsers, user[0][0]]);

    const leftUsers = chippedUsers.filter(
      (item) => item[0].name !== e.target.parentElement.children[1].textContent
    );

    setChippedUsers(leftUsers);
  }

  return (
    <div className={styles.wrapper}>
      <h1>Pick Users</h1>

      <div className={styles.input}>
        <div className={styles.chipContainer}>
          {chippedUsers &&
            chippedUsers.map((user) => (
              <div className={styles.chip} key={user[0].id}>
                <img src={user[0].profilePic} alt="profilePic" />
                <span>{user[0].name}</span>
                <img src="/22.png" alt="crossSign" onClick={deleteChip} />
              </div>
            ))}
        </div>

        <input
          type="text"
          name="pickUser"
          placeholder="Add new user..."
          onChange={handleSearch}
          value={userInput}
          onClick={toggleUsers}
        />

        <div
          className={`${styles.userInfo} ${
            showUser ? styles.userInfo_active : ''
          }`}
        >
          {allUsers &&
            allUsers.map((user) => (
              <div className={styles.user} key={user.id} onClick={makeChip}>
                <div className={styles.username}>
                  <img src={user.profilePic} alt="profilePic" />
                  <span>{user.name}</span>
                </div>
                <div className={styles.email}>
                  <span>{user.email}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
