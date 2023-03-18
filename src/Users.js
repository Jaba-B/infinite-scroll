import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

export function Users() {
  const [users, setUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [page, setPage] = useState(1);

  const isScrolling = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }
    setIsFetching(true);
  };

  const loadUsers = useCallback(
    async (page) => {
      const response = await fetch(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/${100}`
      );
      const data = await response.clone().json();
      setUsers([...users, ...data.list]);
      setPage(page + 1);
      setIsFetching(false);
    },
    [users]
  );

  useEffect(() => {
    window.addEventListener('scroll', isScrolling);
    return () => window.removeEventListener('scroll', isScrolling);
  }, []);

  useEffect(() => {
    if (isFetching) {
      loadUsers(page);
    }
  }, [isFetching, loadUsers, page]);

  return (
    <div className="container">
      {users.map((user) => {
        return (
          <div className="user" key={user.id}>
            <img src={user.imageUrl} alt="user avatar" />
            <Link to={`/user/${user.id}`} className="name">
              {user.id}. {user.name} {user.lastName}
            </Link>
            <span>{user.title}</span>
          </div>
        );
      })}
    </div>
  );
}

export default Users;