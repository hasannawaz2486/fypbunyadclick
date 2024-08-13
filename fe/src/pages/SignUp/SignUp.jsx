import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { getAllCitiesDropList } from '../../utils/PakCitiesData'
import { useSelector, useDispatch } from 'react-redux'

import MetaData from '../../utils/MetaData'
import Loader from '../../Components/Loader/Loader'
import customFetch from '../../utils/api'



// datti 



import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
// import {React,useState} from "react";


const SignUp = () => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.user)
  const { data } = useSelector((state) => state.data)
  const navigate = useNavigate()


  // dding state


  // const [countryid, setCountryid] = useState(0);
  // const [stateid, setstateid] = useState(0);
  // const [cityid, setcityid] = useState(0);

  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  const [cityid, setCityid] = useState(0);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phoneNo: '',
    role: '',
   
   
    
  })

 



  const handleCountryChange = (e) => {
    setCountryid({name:e.name,id:e.id});
    // Optionally reset state and city when country changes
    
  };

  // Handler for StateSelect change
  const handleStateChange = (e) => {
    setStateid({name:e.name,id:e.id});
    // Optionally reset city when state changes
 
  };

  // Handler for CitySelect change
  const handleCityChange = (e) => {
    setCityid(e.name);
  }

  const handleChange = async (e) => {
    const { name, value } = e.target
    if (name === 'name') {
      const result = value.replace(/[^a-zA-Z ]/gi, '')
      setUser({ ...user, name: result })
    } else if (name === 'phoneNo') {
      // Allow only digits to be inputted
      if (value === '' || /^[0-9\b]+$/.test(value)) {
        setUser({ ...user, [name]: value })
      }
    } else {
      setUser({ ...user, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { name, email, password, confirmPassword, address, phoneNo, role, store } = user
    let country=countryid.name
    let state=stateid.name
    let city=cityid

    console.log('Selected Country ID:', countryid);
    console.log('Selected State ID:', stateid);
    console.log('Selected City ID:', cityid);
    // console.log(name,email,password,confirmPassword,phoneNo,city,country,state,role)
    console.log(name,email,password,confirmPassword,phoneNo,city,country,state,role)
    
   
    if (!name || !email || !password || !confirmPassword || !phoneNo || !role ) {
      toast.error('Please Fill All Fields,,,,')
      return
    }
    dispatch({ type: 'SIGNUP_USER_REQUEST' })

    const res = await customFetch('/api/v1/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phoneNo,
        password,
        confirmPassword,
        address,
        country,
        state,
        city,
        role,
        store,
        // avatar,
      }),
    })

    const data = await res.json()

    if (res.status === 201) {
      dispatch({ type: 'OTP_SENT_SUCCESS', payload: data })
      toast.success(data.message)

      navigate(`/user/validate?email=${email}`, { replace: true })
    } else {
      dispatch({ type: 'SIGNUP_USER_FAIL', payload: data.message })
      toast.error(data.message)
    }
    // navigate("/login");


 
  }

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <MetaData title="Sign Up - Nelami" />
      {/* <!--Breadcrumb--> */}
      <section>
        <div className="bannerimg cover-image bg-background3">
          <div className="header-text mb-0">
            <div className="container">
              <div className="text-center text-white ">
                <h1 className="">Register</h1>
                <ol className="breadcrumb text-center">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/">Pages</Link>
                  </li>
                  <li className="breadcrumb-item active text-white" aria-current="page">
                    Register
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--/Breadcrumb--> */}

      {/* <!--Register-section--> */}
      <section className="sptb">
        <div className="container customerpage">
          <div className="row ">
            <div className="col-lg-4 d-block mx-auto">
              <div className="row">
                <div className="col-xl-12 col-md-12 col-md-12">
                  <form method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <div className="card mb-xl-0">
                      <div className="card-header">
                        <h3 className="card-title">Register</h3>
                      </div>
                      <div className="card-body">
                        <div className="form-group">
                          <label className="form-label text-dark">Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Name"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label text-dark">Email address</label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter Email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label text-dark">Password</label>
                          <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter Password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label text-dark">Confirm Password</label>
                          <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword2"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={user.confirmPassword}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label text-dark">Phone No.</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputPhone"
                            placeholder="Enter Phone Number"
                            minLength={11}
                            maxLength={15}
                            name="phoneNo"
                            value={user.phoneNo}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        {/* <div className="form-group">
                          <label className="form-label text-dark">City</label>

                          <select
                            id="Location"
                            className="form-control"
                            onChange={(e) => setUser({ ...user, city: e.target.value })}
                            name="city"
                            value={user.city}
                            required
                          >
                            <option value="" disabled>
                              Select The City
                            </option>


                            <option value="Lahore">Lahore</option>
                            
                          </select>
                        </div> */}

{/* <div>
        <h6>Country</h6>
        <CountrySelect
          onChange={(e) => {
            setCountryid(e.id);
          }}
          placeHolder="Select Country"
        />
        <h6>State</h6>
        <StateSelect
          countryid={countryid}
          onChange={(e) => {
            setstateid(e.id);
          }}
          placeHolder="Select State"
        />
        <h6>City</h6>
        <CitySelect
          countryid={countryid}
          stateid={stateid}
          onChange={(e) => {
            console.log(e);
          }}
          placeHolder="Select City"
        />
       
      </div> */}


      {/* adding gpt code */}

      <div>
        <h6>Country</h6>
        <CountrySelect
          onChange={handleCountryChange}
          placeHolder="Select Country"
        />
        <h6>State</h6>
        <StateSelect
          countryid={countryid.id}
          onChange={handleStateChange}
          placeHolder="Select State"
        />
        <h6>City</h6>
        <CitySelect
          countryid={countryid.id}
          stateid={stateid.id}
          onChange={handleCityChange}
          placeHolder="Select City"
        />
      </div>





                        <div className="form-group" required>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="role"
                              value="buyer"
                              id="role-buyer"
                              onChange={handleChange}
                              checked={user.role === 'buyer'}
                            />
                            <label className="form-check-label" htmlFor="role-buyer">
                              Buyer
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="role"
                              value="seller"
                              id="role-seller"
                              onChange={handleChange}
                              checked={user.role === 'seller'}
                            />
                            <label className="form-check-label" htmlFor="role-seller">
                              Seller
                            </label>
                          </div>
                        </div>
                        {user.role === 'seller' && (
                          <div className="form-group">
                            <label className="form-label text-dark">Address</label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputAddress"
                              placeholder="Enter Address"
                              name="address"
                              value={user.address}
                              onChange={handleChange}
                            />
                          </div>
                        )}

                        {user.role === 'seller' && (
                          <div className="form-group">
                            <label className="form-label text-dark">Store Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputStore"
                              placeholder="Store Name"
                              name="store"
                              value={user.store}
                              onChange={handleChange}
                            />
                          </div>
                        )}

                        {/* <div className="form-group">
                          <label className="form-label text-dark">Profile Pic</label>
                          <input type="file" accept="image/*" name="avatar" onChange={handleChange} className="form-control" />
                        </div> */}

                        {/* <div className="form-group">
                          <label className="custom-control form-checkbox">
                            <input type="checkbox" className="custom-control-input" />
                            <span className="custom-control-label text-dark">
                              Agree the <a href="#">terms and policy</a>
                            </span>
                          </label>
                        </div> */}
                        <div className="form-footer mt-2">
                          <button type="submit" className="btn btn-primary btn-block">
                            Create New Account
                          </button>
                        </div>
                        <div className="text-center  mt-3 text-dark">
                          Already have account?<Link to="/Login">Sign In</Link>
                        </div>
                      </div>
                    </div>
                  </form>
                  {/* {avatar && <img src={avatar} alt="dp" style={{ height: "300px" }} />} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--Register-section--> */}
    </>
  )
}

export default SignUp
