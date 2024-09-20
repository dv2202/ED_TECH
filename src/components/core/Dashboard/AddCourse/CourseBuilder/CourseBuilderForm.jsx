import React from "react";
import { useForm } from "react-hook-form";
import { FaCirclePlus } from "react-icons/fa6";
import IconBtn from "../../../homepage/common/IconBtn";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GrFormNextLink } from "react-icons/gr";
import toast from "react-hot-toast";
import { createSection, updateSection } from "../../../../../services/operations/courseDetailsAPI";
import { setCourse, setEditCourse, setStep } from "../../../../../slices/courseSlice";
import NestedView from "./NestedView"

const CourseBuilderForm = () => {
     const {
          register,
          handleSubmit,
          setValue,
          formState: { errors },
     } = useForm();
     const [editSectionName,setEditSectionName] = useState(false)
     const {course} = useSelector(state => state.course);
     const dispatch = useDispatch();
     const {token} = useSelector(state => state.auth);
     const [loading,setLoading] = useState(false)


     const handleChangeEditSectionName = (sectionId, sectionName) => {
      if (editSectionName === sectionId) {
        cancelEdit()
        return
      }
      setEditSectionName(sectionId)
      setValue("sectionName", sectionName)
    }


     const onSubmit = async (data) => {
      setLoading(true)
      let result;
      if(editSectionName){
        result = await updateSection(
          {
            sectionName: data.sectionName,
            courseId: course._id,
            sectionId: editSectionName
          }, token
        )
      }else{
        result = await createSection(
          {
            sectionName: data.sectionName,
            courseId: course._id
          }, token
        )
      }
 
      if(result){
        dispatch(setCourse(result));
        setEditSectionName(null);
        setValue("sectionName", "");    
      }
      setLoading(false)
     }


     const cancelEdit = () => {
        setEditSectionName(null)
        setValue("sectionName", "");
      }
    const goBack = () => {
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
      }

    const goToNext = () => {
      if(course.courseContent.length === 0){
        toast.error("Please add atleast one section");
        return;
      }
      if(course.courseContent.some((section)=> section.subSection.length === 0)){
        toast.error("Please add atleast one lecture in each section");
        return;
      }
      dispatch(setStep(3));
    }
     return (
          <div className="text-white  h-[100vh]">
              <p className="text-[25px] font-medium">Course Builder</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="h-fit">
                         <label htmlFor="sectionName" className="mb-[20px]">
                              Section Name <sup className="text-red-500 mb-[20px]">*</sup>
                         </label>
                         <input
                              id="sectionName"
                              placeholder="Add Section name"
                              {...register("sectionName", { required: true })}
                                     className="w-full p-[12px] rounded-md bg-richblack-700 contact-form-field appearance-none  resize-x-none"
                         />
                         {errors.sectionName && (
                              <span>Section Name is required</span>
                         )}                   
                    </div>
                    <div className="mt-10 flex">
                      <IconBtn
                        type="Submit"
                        text={editSectionName ? "Edit Section Name" : "Create Section"}
                        outline={true}
                        customClasses={"bg-richblack-800"}
                      >
                        <FaCirclePlus className="text-black"/>
                      </IconBtn>
                      {
                        editSectionName && (
                          <button
                          type="button"
                          onClick={cancelEdit}
                          className="text-sm text-richblack-300 underline ml-5"
                          >
                            Cancel Edit
                          </button>
                        )
                      }
                    </div>
              </form>
            {
              course.courseContent.length > 0 && (
                <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
              )
            }

            <div className=" flex justify-end gap-x-3">
              <button onClick={goBack} className="rounded-md cursor-pointer flex items-center">
                back 
              </button>
              <IconBtn 
              text="Next"
              onClick={goToNext}>
                <GrFormNextLink/>
              </IconBtn>
            </div>

          </div>
     );
};

export default CourseBuilderForm;
