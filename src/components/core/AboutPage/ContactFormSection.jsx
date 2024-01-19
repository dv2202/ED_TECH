import React from 'react'
import ContactUsForm from '../../ContactPage/ContactUsform'

const ContactFormSection = () => {
  return (
    <div className='mx-auto'>
      <h1 className='text-white'>
        Get in Touch
      </h1>
      <p>
        We’d love to here for you, Please fill out this form.
      </p>
      <div>
        <ContactUsForm/> 
      </div>

    </div>
  )
}

export default ContactFormSection
