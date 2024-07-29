import { useEffect,useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../core/homepage/common/IconBtn"
import { FiUpload } from "react-icons/fi"

export default function ChangeProfilePicture() {
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const dispatch = useDispatch()
  
    const [loading, setLoading] = useState(false)
    const [imageFile, setImageFile] = useState(null)
    const [previewSource, setPreviewSource] = useState(null)
  
    const fileInputRef = useRef(null)
  
    const handleClick = () => {
      fileInputRef.current.click()
    }
  
    const handleFileChange = (e) => {
      const file = e.target.files[0]
      // console.log(file)
      if (file) {
        setImageFile(file)
        previewFile(file)
      }
    }
  
    const previewFile = (file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setPreviewSource(reader.result)
      }
    }
  
    const handleFileUpload = () => {
      try {
        console.log("uploading...")
        setLoading(true)
        const formData = new FormData()
        formData.append("displayPicture", imageFile)
        console.log("formdata", formData)
        dispatch(updateDisplayPicture(token, formData)).then(() => {
          setLoading(false)
        })
      } catch (error) {
        console.log("ERROR MESSAGE - ", error.message)
      }
    }
  
    useEffect(() => {
      if (imageFile) {
        previewFile(imageFile)
      }
    }, [imageFile])
    return (
      <>
        <div className="flex items-center   w-[792px]  h-[126px] justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
          <div className="flex items-center  gap-x-[24px]">
            <img
              src={previewSource || user?.image}
              alt={`profile-${user?.firstName}`}
              className="aspect-square w-[78px] rounded-full object-cover"
            />
            <div className="space-y-2 w-[646px] h-[72px] flex flex-col gap-[12px]">
              <p>Change Profile Picture</p>
              <div className="flex flex-row gap-[12px]  w-[206px] h-[36px]">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/png, image/gif, image/jpeg"
                />
                <button
                  onClick={handleClick}
                  disabled={loading}
                  className="cursor-pointer rounded-md bg-richblack-700 py-[6px] px-[18px] w-[96px] h-[40px] text-center font-semibold text-richblack-50"
                >
                  Select
                </button>
                <div className="flex flex-row">
                <IconBtn
                  text={loading ? "Uploading..." : "Upload"}
                  onClick={handleFileUpload}
                  className='w-[98px] rounded-lg px-[6px] py-[18px]'
                >
                  {!loading && (
                    <FiUpload className="text-lg text-richblack-900" />
                  )}
                </IconBtn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }