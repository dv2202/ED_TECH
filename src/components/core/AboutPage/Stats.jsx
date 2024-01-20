import React from 'react'

const Stats = () => {
    const statistics = [
        {count:"5k",label:"Active Students"},
        {count:"10+",label:"Mentor"},
        {count:"200+",label:"Courses"},
        {count:"50+",label:"Awards"},
    ]
  return (
    <section className='w-screen h-[230px] px-[90px] flex items-center bg-richblack-800'>
            <div className='flex flex-row gap-[20px] w-[100%] items-center justify-between'>
                {
                    statistics.map((data,index)=>{
                         return(
                            <div key={index} className='text-white flex flex-col items-center text-center w-[292.5px] h-[74px] gap-[12px]' >
                                <h1 className='text-inter text-[30px] leading-8 items-center text-center'>
                                    {data.count}
                                </h1>
                                <h2 className='text-inter text-[16px] leading-6 items-center text-center text-richblack-500'>
                                    {data.label}
                                </h2>
                            </div>
                         )
                    })
                }
            </div>
    </section>
  )
}

export default Stats
