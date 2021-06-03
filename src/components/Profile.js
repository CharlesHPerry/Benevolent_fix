import React from 'react';
import {useAuth0} from '@auth0/auth0-react';

const Profile = () => {

    const {user, isAuthenticated} = useAuth0()

    console.log(JSON.stringify(user))
    return (
        isAuthenticated && (
            <div className="profile">
                <p>{user.name}</p>
                <img className='profile_img' src={user.picture} alt={user.name} />
                <p>{user.sub}</p>
            </div>
        )
    )
}

export default Profile