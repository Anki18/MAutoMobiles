import React, { useEffect, useState } from 'react';
import { db } from '../../helpers/firebaseHelper'
import { collection, getDocs } from 'firebase/firestore';

export default function SuperAdmin() {
  const [superusers, setSuperuser] = useState([]);
  useEffect(() => {
    const colRef = collection(db, 'superusers');
    getDocs(colRef)
      .then(snapshot => {
        setSuperuser(snapshot.docs.map(doc => ({
          ...doc.data(), id: doc.id
        })))
      })
      .catch(err => {
        console.log(err.message)
      })
  }, [])

  return (
    <>
      <h3>Super Admin Users</h3>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>

        <tbody>
          {superusers.map((user) =>
          (<tr key={user.uname}>
            <td>{user.uname}</td>
            <td>{user.fname}</td>
            <td>{user.lname}</td>
          </tr>)
          )}
        </tbody>
      </table>
    </>

  )
}
