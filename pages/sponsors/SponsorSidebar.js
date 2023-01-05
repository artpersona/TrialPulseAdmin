import React, { useState } from "react";
import styles from "../../styles/Sponsors.module.css";
import { InputGroup, FormControl, Image } from "react-bootstrap";
import {
	BsFillCircleFill,
	BsFillTelephoneFill,
	BsStarFill,
} from "react-icons/bs";
import { AiTwotoneMessage } from "react-icons/ai";
import { TbNotes } from "react-icons/tb";

import { SponsorItem, CustomModal, Empty } from "../../components";
import { useRouter } from "next/router";
import { useSponsorContext } from "../../shared/contexts/SponsorsContext";
import { useEffect } from "react";
import {
	sponsorsA,
	sponsorsB,
	sponsorsC,
	sponsorsD,
	sponsorsE,
} from "../../shared/utils/sponsorsSample.utility";
function SponsorSidebar() {
	const dict = sponsorsD.reduce((previousValue, currentValue) => {
		// c[0] should be the first letter of an entry
		let k = currentValue["name"][0];

		// either push to an existing dict entry or create one
		if (previousValue[k]) previousValue[k].push(currentValue);
		else previousValue[k] = [currentValue];

		return previousValue;
	}, {});
	return (
		<sidebar className="min-h-screen border-r border-r-gray-light flex flex-col">
			<section className="flex w-full justify-center h-[70px] bg-gray-primary">
				<article className="flex w-[400px]">
					{sponsorsA.map((item, index) => {
						return (
							<p
								key={index}
								className="hover:bg-gray-secondary text-white py-4 px-12 cursor-pointer text-[14px]"
							>
								{item}
							</p>
						);
					})}
				</article>
			</section>

			<section className="flex justify-between min-h-[1000px] my-4">
				<article className="flex flex-col w-full items-end">
					<div className="w-[400px]">
						{sponsorsC.length !== 0 ? (
							<>
								<figure className="bg-gray-light flex items-center space-x-2 rounded-full px-2 font-medium text-gray-primary">
									<BsStarFill />
									<p>Favorites</p>
								</figure>
								<div className="w-full rounded-[2.2rem] border-2 border-gray-secondary mt-4 p-[0.65rem] shadow-md space-y-3">
									{sponsorsC.map((item, index) => {
										return (
											<>
												<div
													key={index}
													className="flex px-2 items-center justify-between"
												>
													<div className="flex space-x-3 cursor-pointer">
														<div className="text-green-light relative">
															{item.onlineStatus && (
																<span className="absolute -mt-1">
																	<BsFillCircleFill />
																</span>
															)}
															<Image
																className="min-h-[35px] min-w-[35px]"
																src="/Clinic_icon.svg"
																alt="sites"
																width="45"
																height="45"
															/>
														</div>
														<h3 className="text-blue-primary self-start font-medium">
															{item.name}
														</h3>
													</div>
													<div className="flex space-x-2">
														<span className="flex justify-center items-center text-yellow-primary bg-gray-light rounded-full h-[35px] w-[35px] cursor-pointer">
															<BsFillTelephoneFill />
														</span>
														<span className="flex justify-center items-center text-yellow-primary bg-gray-light rounded-full h-[35px] w-[35px] cursor-pointer">
															<AiTwotoneMessage />
														</span>
													</div>
												</div>
												{index !== sponsorsC.length - 1 && (
													<div className="border-1 border-gray-secondary -ml-3 -mr-3" />
												)}
											</>
										);
									})}
								</div>
							</>
						) : (
							<>
								<figure className="bg-gray-light flex items-center space-x-2 rounded-full px-2 font-medium text-gray-primary">
									<BsStarFill />
									<p>Favorites</p>
								</figure>
								<div className="flex flex-col justify-center items-center w-full h-[80px] border-b-gray-light border-b">
									<h3 className="text-gray-secondary">No Selected Favorites</h3>
								</div>
							</>
						)}

						{sponsorsD.length !== 0 ? (
							<>
								{Object.entries(dict).map((item, index) => {
									return (
										<>
											<figure
												key={index}
												className="bg-gray-light flex items-center space-x-2 rounded-full pl-4 font-medium text-gray-primary mt-4"
											>
												<p>{item[0]}</p>
											</figure>
											<div
												key={item[0]}
												className="w-full rounded-[2.2rem] border-2 border-gray-secondary mt-4 p-[0.65rem] shadow-md space-y-3"
											>
												{item[1].map((contact, index) => {
													return (
														<>
															<div className="flex px-2 items-center justify-between">
																<div className="flex space-x-3 cursor-pointer">
																	<div className="text-green-light relative">
																		{contact.onlineStatus && (
																			<span className="absolute -mt-1">
																				<BsFillCircleFill />
																			</span>
																		)}
																		<Image
																			className="min-h-[35px] min-w-[35px]"
																			src="/Clinic_icon.svg"
																			alt="sites"
																			width="45"
																			height="45"
																		/>
																	</div>
																	<h3 className="text-blue-primary self-start font-medium">
																		{contact.name}
																	</h3>
																</div>
																<div className="flex space-x-2">
																	<span className="flex justify-center items-center text-yellow-primary bg-gray-light rounded-full h-[35px] w-[35px] cursor-pointer">
																		<BsFillTelephoneFill />
																	</span>
																	<span className="flex justify-center items-center text-yellow-primary bg-gray-light rounded-full h-[35px] w-[35px] cursor-pointer">
																		<AiTwotoneMessage />
																	</span>
																</div>
															</div>
															{index !== item[1].length - 1 && (
																<div className="border-1 border-gray-secondary -ml-3 -mr-3" />
															)}
														</>
													);
												})}
											</div>
										</>
									);
								})}
							</>
						) : (
							<>
								<figure className="bg-gray-light flex items-center space-x-2 rounded-full px-2 font-medium text-gray-primary">
									<BsStarFill />
									<p>Favorites</p>
								</figure>
								<div className="flex flex-col justify-center items-center w-full h-[80px] border-b-gray-light border-b">
									<h3 className="text-gray-secondary">No Selected Favorites</h3>
								</div>
							</>
						)}
					</div>
				</article>
				<article className="w-[70px] flex flex-col items-center h-full text-yellow-primary space-y-1 font-medium">
					<BsStarFill />
					{sponsorsB.map((item, index) => {
						return <p key={index}>{item}</p>;
					})}
				</article>
			</section>
		</sidebar>
	);
}

export default SponsorSidebar;
