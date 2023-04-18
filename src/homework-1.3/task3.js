import React from 'react'
import friends from "./friends.json"
import styles from "./styles3.module.css"

const FriendList = ({friends}) => {
    return (
        <ul className={styles.friend_list}>
            {friends.map(element => (
                <li key={element.id} className={styles.item}>
                    <span className={element.isOnline? styles.online : styles.offline}>
                        {console.log(element.status + element.isOnline? "online" : "offline")}
                    </span>
                    <img className={styles.avatar} src={element.avatar} alt="User avatar" width="48" />
                    <p className={styles.name}>{element.name}</p>
                </li>
            ))}
        </ul>
    );
}

export default function task3() {
    console.log(styles);
    return (
        <FriendList friends={friends}></FriendList>
    )
}