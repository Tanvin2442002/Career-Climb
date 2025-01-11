import {React, useEffect, useState} from 'react'
import UserProfile from './UserProfile';
import EmployerProfile from './EmployerProfile';

export default function Profile() {

    const [isEmployer, setIsEmployer] = useState(false);

    useEffect(() => {
        const localData = localStorage.getItem('userType');
        if(localData === 'employer'){
            setIsEmployer(true);
        }
    }, []);

    return (
        <div>
            {isEmployer ? <EmployerProfile/> : <UserProfile />}
        </div>
    )
}

