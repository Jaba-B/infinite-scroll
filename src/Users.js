import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

export function Users() {
  const [users, setUsers] = useState([]);
  let totalUsers = 20;
  let page = 1;

  const getUsers = async () => {
      const response = await fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/${totalUsers}`)
      const data = await response.clone().json();
      setUsers(data.list)
    if( totalUsers >= 100 ) {
      totalUsers = 20;
      page += 1
    } else {
      totalUsers += 20
    }
  }

  console.log(users)

  const handleScroll = (e) => {
    if(window.innerHeight + e.target.documentElement.scrollTop + 1 >= 
      e.target.documentElement.scrollHeight) {
      getUsers()
      console.log('bottom')
    }
  }

  useEffect(() => {
    getUsers();
    window.addEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='container'>
      {users.map((user) => {
        return <div className='user' key={user.id}>
          <img src={user.imageUrl} alt='user avatar' />
          <Link to={`/user/${user.id}`} className='name'>{user.id}. {user.name} {user.lastName}</Link>
          <span>{user.title}</span>
          </div>
      })}
    </div>
  );
}

export default Users;