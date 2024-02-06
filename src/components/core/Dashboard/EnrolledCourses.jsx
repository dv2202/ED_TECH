import React, { useEffect } from 'react'
import ProgressBar from '@ramonak/react-progress-bar'
import { useSelector } from 'react-redux'
import {useState} from 'react'
const EnrolledCourses = () => {
    const {token} = useSelector((state)=>state.auth);
    const [enrolledCourses,setEnrolledCourses] = useState(null);

    // const getEnrolledCourses = async() => {
    //     try{
    //         const responce = await getUserEnrolledCourses(token);
    //         setEnrolledCourses(responce);

    //     }
    //     catch(error){
    //         console.log("Unable to fetch enrolled courses " , error.message);
    //     }
    // }
    // useEffect(()=>{
    //     getEnrolledCourses();
    // },[]);

  return (
    <div className='h-[100vh]'>
        <div>Enrolled Courses</div>
        {
            !enrolledCourses ? (
                <div>
                    Loading...
                </div>
            ) : !enrolledCourses.length ? (
                <p>You have not enrolled in any courses</p>
            ) : (
                <div>
                <div>
                    <p>Courses Name</p>
                    <p>Duration</p>
                    <p>Progress</p>
                </div>
                {
                    enrolledCourses.map((course,index)=>(
                        <div>
                            <div>
                                <img src={course.thumbnail} alt="Course Thumbnail" />
                                <div>
                                    <p>{course.courseName}</p>
                                    <p>{course.courseDescription}</p>
                                </div>
                            </div>
                            <div>
                                {course?.totalDuration}
                            </div>
                            <div>
                                <p>Progress: {course.progressPercentage || 0 }%</p>
                                <ProgressBar 
                                    completed={course.progressPercentage || 0}
                                    height = '8px'
                                    islabelVisible= {false}
                                />
                            </div>
                        </div>
                    ))
                }
                </div>
            )
        }
    </div>
  )
}

export default EnrolledCourses
