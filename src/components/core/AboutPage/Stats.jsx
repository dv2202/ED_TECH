import React from 'react'

const Stats = () => {
    const statistics = [
        {count:"5k",label:"Active Students"},
        {count:"10+",label:"Mentore"},
        {count:"200+",label:"Courses"},
        {count:"50+",label:"Awards"},
    ]
  return (
    <section>
        <div>
            <div className='flex flex-row  gap-[20px]'>
                {
                    statistics.map((data,index)=>{
                         return(
                            <div key={index} className='text-white flex flex-col items-center text-center' >
                                <h1>
                                    {data.count}
                                </h1>
                                <h2>
                                    {data.label}
                                </h2>
                            </div>
                         )
                    })
                }
            </div>
        </div>
    </section>
  )
}

export default Stats
