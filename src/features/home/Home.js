import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { selectEmail, selectFname, selectLname, setFname, setLname } from '../login/loginSlice';
import { db } from '../../helpers/firebaseHelper';


export default function Home() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector(selectEmail);
  const fname = useSelector(selectFname);
  const lname = useSelector(selectLname);
  useEffect(() => {
    async function getData() {
      if (email) {
        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          dispatch(setFname(data.fname));
          dispatch(setLname((data.setLname)));
        } else {
          console.log("No such document!");
        }
      }
    }
    getData();
  }, [email]);

  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')

    if (authToken) {
      navigate('/')
    }

    if (!authToken) {
      navigate('/login')
    }
  }, [])
  return (
    <>
      <h3>Products</h3>
      {email && <h6>{email}</h6>}
      <div class="row">
        <div class="col s12 m6">
          <div class="card blue accent-1">
            <div class="card-content white-text">
              <span class="card-title">Product Sample</span>
              <p>Description or details of the product. I am good at containing small bits of information.
                I am convenient because I require little markup to use effectively.</p>
            </div>
            <div class="card-action">
              <a href="#">Details</a>
              <a href="#">Buy</a>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
