import React from 'react'
import { Image } from 'react-bootstrap'
import { BsCircleHalf } from 'react-icons/bs'
import { HiArrowRight } from 'react-icons/hi'

export default function CardDefault(props) {
  return (
    <article className="flex flex-col space-y-2 py-1">
        <div className="flex space-x-2">
            <Image
                src="/Study_icon.svg"
                alt="protocols"
                width="35"
                height="35"/>
            <div>
            <h4 className="text-blue-primary">{props.data.title}</h4>
            <p className="italic text-gray-secondary">
                {props.type === "recentlyViewed"&&"Last Viewed "} 
                {props.type === "newStudies"&&"Created on "} 
                {props.data.lastViewed}</p>
            </div>
        </div>

        <p className="p-2">{props.data.description}</p>

        <div className="flex space-x-2">
            <figure className="flex space-x-1 bg-gray-light py-1 px-2 rounded-2xl">
                <Image
                src="/Users.svg"
                className="text-[#ededed]"
                alt="users"
                width="25"
                height="25" />
                <p>{props.data.users}</p>
            </figure>
            {props.type === "recentlyViewed" &&
                <figure className="flex space-x-1 bg-gray-light py-1 px-2 rounded-2xl">
                    <BsCircleHalf size={25}/>
                    <p>{props.data.status === "inprogress" && "In-Progress"}</p>
                </figure>
            }
        </div>

        <div className="flex space-x-2 justify-between text-yellow-primary cursor-pointer font-medium mt-3">
            <p>View Details</p>
            <HiArrowRight />
            
        </div>
        </article>
  )
}