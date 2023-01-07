import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

export default function Home() {
  let navigate = useNavigate();
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
