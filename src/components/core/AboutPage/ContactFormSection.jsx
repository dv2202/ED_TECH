import React from 'react'
import ContactUsForm from '../../ContactPage/ContactUsform'

const ContactFormSection = () => {
  return (
    <div className='mx-auto'>
      <div className='flex flex-col gap-14-'>
          <h1 className='w-[600px] h-[44px] text-inter text-[36px] leading-8 text-center'>
            Get in Touch
          </h1>
          <p className='w-[600px] h-[24px] text-inter font-normal leading-6 text-center text-richblack-500'>
            We'd love to here for you, Please fill out this form.
          </p>
      </div>
      <div className='w-[600px] h-[603px] p-[32px]'>
        <ContactUsForm />
      </div>
    </div>
  )
}

export default ContactFormSection
