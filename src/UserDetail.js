import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';

export function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [friends, setFriends] = useState([]);
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

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`
      );
      const userResponse = await response.json();
      setUser(userResponse);
    };
    getUser();
  }, [id]);

  const loadFriends = useCallback(
    async (id, page) => {
      const response = await fetch(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${page}/${100}`
      );
      const data = await response.clone().json();
      setFriends([...friends, ...data.list]);
      setPage(page + 1);
      setIsFetching(false);
    },
    [friends]
  );

  useEffect(() => {
    window.addEventListener('scroll', isScrolling);
    return () => window.removeEventListener('scroll', isScrolling);
  }, []);

  useEffect(() => {
    if (isFetching) {
      loadFriends(id, page);
    }
  }, [isFetching, loadFriends, id, page]);

  return (
    <div>
      <div className="user-detail-container">
        <img
          src={user.imageUrl}
          alt="user avatar"
          height={400}
          width={400}
          className="user-detail-img"
        />
        <div>
          <p>
            Name: {user.prefix} {user.name} {user.lastName}
          </p>
          <p>Position: {user.title}</p>
          <p>Job Description: {user.jobDescriptor}</p>
          <p>Job Area: {user.jobArea}</p>
          <p>Job Type: {user.jobType}</p>
          <p>Email: {user.email}</p>
          <p>Ip: {user.ip}</p>
        </div>
      </div>
      <div className="content-seperator"></div>
      <div className="container">
        {friends.map((friend) => {
          return (
            <div className="user" key={friend.id}>
              <img src={friend.imageUrl} alt="user avatar" />
              <p className="name">
                {friend.id}. {friend.name} {friend.lastName}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserDetail;