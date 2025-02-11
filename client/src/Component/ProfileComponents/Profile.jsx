import {React, useEffect, useState} from 'react'
import UserProfile from './UserProfile';
import EmployerProfile from './EmployerProfile';

export default function Profile() {

    const [isEmployer, setIsEmployer] = useState(false);

    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem('user'));
        if(localData.type === 'employer'){
            setIsEmployer(true);
        }
    }, []);

    return (
        <div>
            {isEmployer ? <EmployerProfile/> : <UserProfile />}
        </div>
    )
}

