import React, { useEffect, useState } from 'react'
import logo from "../../../../assets/Logo/Logo-Full-Light.png"
import { Link ,  matchPath} from 'react-router-dom'
import {NavbarLinks} from '../../../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IoMdCart } from "react-icons/io";
import ProfileDropDown from '../../Auth/ProfileDropDown'
import { FaAngleDown } from "react-icons/fa6"
import { apiConnector } from '../../../../services/apiconnector'
import { categories } from '../../../../services/apis'

const  subLinks = [
  {
    title:"python",
    link: "/catalog/python"
  },
  {
    title:"web dev",
    link:"/catalog/web-development"
  }
];
const Navbar = () => {
  const {token} = useSelector((state)=> state.auth);
  const {user} = useSelector((state)=> state.profile);
  const {totalItems} = useSelector((state)=> state.cart);
  // const [subLinks,setSubLinks] = useState([]);
  // const fetchSubLinks = async() => {
  //                         try{
  //                           const result = await apiConnector("Get",categories.CATEGORIES_API);
  //                           console.log("printing sublinks results :",result)
  //                           setSubLinks(result.data.data);
  //                         }
  //                         catch(error){
  //                           console.log("Could not fetch the category list");
  //                         }
  //                       }
  // useEffect(()=>{
  //   fetchSubLinks();
  // },[])

  const location = useLocation()
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
          <Link to="/">
            <img src={logo} width={160} height={42} loading='lazy'/>
          </Link>
          {/* NAV LINKS */}

          <nav>
            <ul className='flex gap-x-6 text-richblack-25'>
              {
                NavbarLinks.map((link,index) => (
                  <li key={index}>
                      {
                        link.title === "Catalog" ? (
                            <div className='flex flex-row items-center group relative'>
                              <p>{link.title}</p>
                              <FaAngleDown />
                              <div className=' invisible opacity-0 absolute left-[50%] top-[50%] translate-x-[-49.2%] translate-y-[20%] flex space-y-2 flex-col rounded-md bg-richblack-5 p-4 text-richblack-900  transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px] z-[100]'>
                                    <div className='absolute left-[50%] top-0 translate-x-[80%] translate-y-[-40%] rotate-45 rounded h-5 w-5 bg-richblack-5'>
                                    </div>
                                    {
                                      subLinks.length ? (
                                        subLinks.map((subLink,index)=>(
                                            <Link to={`${subLink.link}`} key={index}>
                                              <p className='text-richblack-500'>{subLink.title}</p>
                                            </Link>
                                        ))
                                      ) : (<div></div>)
                                    }
                              </div>
                            </div>
                        ) : (
                          <Link to={link.path}>
                              <p className={`${matchRoute(link?.path) ? "text-yellow-5" : "text-white"}`}>{link.title}</p>
                          </Link>
                        )
                      }
                  </li>
                ))
              }
            </ul> 
          </nav>


          {/* login/signup  */}
          <div className='flex gap-4 items-center'>
              {
                user && user?.accountType != "Instructor" && (
                  <Link to="/dashboard/cart" className='realtive'>
                      <IoMdCart />
                      {
                        totalItems > 0 && (
                          <span>
                            {totalItems}
                          </span>
                        )
                      }
                  </Link>
                )
              }
              {
                token === null && (
                  <Link to='/login'>
                      <button className='border border-richblack-700 bg-richblack-800 px-[14px] py-[5px] text-richblack-100 rounded-md'>
                            Login
                      </button>
                  </Link>
                )
              }
              {
                token === null && (
                  <Link to='/signup'>
                      <button className='border border-richblack-700 bg-richblack-800 px-[14px] py-[5px] text-richblack-100 rounded-md'>
                            Signup
                      </button>
                  </Link>
                )
              }
              {
                token !== null && <ProfileDropDown/>
              }
          </div>

      </div>
    </div>
  )
}

export default Navbar
