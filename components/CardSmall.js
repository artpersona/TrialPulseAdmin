import React from 'react'
import { Image } from 'react-bootstrap'
import { BsCircleHalf, BsInfoCircle } from 'react-icons/bs'
import { FaAngleRight } from 'react-icons/fa'
import { HiArrowRight } from 'react-icons/hi'

export default function CardSmall(props) {
  return (
    <article className="flex justify-between py-2 items-center">
        <article className="flex flex-col space-y-2">
            <div className="flex space-x-2 items-center">
                <Image
                    src="/Clinic_icon.svg"
                    alt="sites"
                    width="35"
                    height="35"/>
                <div>
                <h4 className="text-blue-primary">{props.data.title}</h4>
                </div>
            </div>
            <div className="flex space-x-2 items-center mt-2">
                <figure className="flex space-x-1 bg-gray-light py-1 px-2 rounded-2xl">
                    <Image
                    src="/Users.svg"
                    className="text-[#ededed]"
                    alt="users"
                    width="25"
                    height="25" />
                    <p>{props.data.users}</p>
                </figure>
                <BsInfoCircle size={25} className="text-yellow-primary"/>
            </div>
        </article>
        <FaAngleRight size={24} className="text-yellow-primary cursor-pointer"/>
    </article>
  )
}