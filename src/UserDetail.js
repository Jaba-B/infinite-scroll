import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

export function UserDetail () {
    const {id} = useParams();
    const [user, setUser] = useState([]);
    const [friends, setFriends] = useState([]);
    let totalFriends = 20;
    let page = 1;

    useEffect(() => {
        const getUser = async () => {
            const response = await fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`);
            setUser(await response.json());
        }
        getUser();
    }, [id]);

    const getFriends = async () => {
        const response = await fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${page}/${totalFriends}`)
        const data = await response.clone().json();
        setFriends(data.list)
      if( totalFriends >= 100 ) {
        totalFriends = 20;
        page += 1
      } else {
        totalFriends += 20
      }
    }

    const handleScroll = (e) => {
        if(window.innerHeight + e.target.documentElement.scrollTop + 1 >= 
          e.target.documentElement.scrollHeight) {
          getFriends()
          console.log('bottom')
        }
    }

    useEffect(() => {
        getFriends();
        window.addEventListener('scroll', handleScroll)
      }, [])

    return (
        <div >
            <div className='user-detail-container'>
                <img src={user.imageUrl} alt='user avatar' height={400} width={400} className='user-detail-img'/>
                <div>
                    <p>Name: {user.prefix} {user.name} {user.lastName}</p>
                    <p>Position: {user.title}</p>
                    <p>Job Description: {user.jobDescriptor}</p>
                    <p>Job Area: {user.jobArea}</p>
                    <p>Job Type: {user.jobType}</p>
                    <p>Email: {user.email}</p>
                    <p>Ip: {user.ip}</p>
                </div>
            </div>
            <div className='content-seperator'></div>
            <div className='container'>
                {friends.map((friend) => {
                    return <div className='user' key={friend.id}>
                        <img src={friend.imageUrl} alt='user avatar' />
                        <p className='name'>{user.id}. {user.name} {user.lastName}</p>
                    </div>
                })}
            </div>
        </div>
    );
}

export default UserDetail;