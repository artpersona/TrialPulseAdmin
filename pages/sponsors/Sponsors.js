import React, { useState } from "react";
import styles from "../../styles/Sponsors.module.css";
import { InputGroup, FormControl, Image } from "react-bootstrap";
import {
	BsFillCircleFill,
	BsFillTelephoneFill,
	BsStarFill,
} from "react-icons/bs";
import { AiTwotoneMessage } from "react-icons/ai";

import { SponsorItem, CustomModal, Empty } from "../../components";
import { useRouter } from "next/router";
import { useSponsorContext } from "../../shared/contexts/SponsorsContext";
import { useEffect } from "react";

export default function Sponsors() {
	const { sponsors, addSponsor } = useSponsorContext();
	const router = useRouter();
	const [addModalShow, setAddModalShow] = useState(false);
	const [sponsorName, setSponsorName] = useState("");
	const a = ["ABC", "Online", "Location"];

	const b = [
		"A",
		"B",
		"C",
		"D",
		"E",
		"F",
		"G",
		"H",
		"I",
		"J",
		"K",
		"L",
		"M",
		"N",
		"O",
		"P",
		"Q",
		"R",
		"S",
		"T",
		"U",
		"V",
		"W",
		"X",
		"Y",
		"Z",
	];

	const c = [
		{
			name: "Sponsor Name Here",
			onlineStatus: true,
		},
		{
			name: "Sponsor Name Here",
			onlineStatus: false,
		},
	];
	const e = [];

	const d = [
		{
			name: "Aa Sponsor Name Here",
			onlineStatus: true,
		},
		{
			name: "Ab Sponsor Name Here",
			onlineStatus: true,
		},
		{
			name: "Ac Sponsor Name Here",
			onlineStatus: false,
		},
		{
			name: "Ad Sponsor Name Here",
			onlineStatus: false,
		},

		{
			name: "Ba Sponsor Name Here",
			onlineStatus: false,
		},
		{
			name: "Bb Sponsor Name Here",
			onlineStatus: false,
		},
		{
			name: "Bc Sponsor Name Here",
			onlineStatus: false,
		},
		{
			name: "Bd Sponsor Name Here",
			onlineStatus: false,
		},

		{
			name: "Ca Sponsor Name Here",
			onlineStatus: false,
		},
		{
			name: "Cb Sponsor Name Here",
			onlineStatus: false,
		},
		{
			name: "Cc Sponsor Name Here",
			onlineStatus: false,
		},
		{
			name: "Cd Sponsor Name Here",
			onlineStatus: false,
		},

		{
			name: "Db Sponsor Name Here",
			onlineStatus: false,
		},
		{
			name: "Dc Sponsor Name Here",
			onlineStatus: false,
		},
		{
			name: "Dd Sponsor Name Here",
			onlineStatus: false,
		},
	];
	const dict = d.reduce((previousValue, currentValue) => {
		// c[0] should be the first letter of an entry
		let k = currentValue["name"][0];

		// either push to an existing dict entry or create one
		if (previousValue[k]) previousValue[k].push(currentValue);
		else previousValue[k] = [currentValue];

		return previousValue;
	}, {});

	const handleSubmit = () => {
		addSponsor({ sponsorName })
			.then((data) => {
				router.push(`/sponsors/${data}`);
			})
			.catch((err) => {
				console.log("err is: ", err);
			});
		setAddModalShow(false);
	};

	return (
		<div className="relative min-h-screen">
			<div className="w-full h-[70px] bg-gray-primary absolute -z-10" />
			<div className="min-h-screen flex container z-20">
				<sidebar className="min-h-screen border-r border-r-gray-light flex flex-col">
					<section className="flex w-full justify-center h-[70px] bg-gray-primary">
						<article className="flex w-[400px]">
							{a.map((item, index) => {
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
								{c.length !== 0 ? (
									<>
										<figure className="bg-gray-light flex items-center space-x-2 rounded-full px-2 font-medium text-gray-primary">
											<BsStarFill />
											<p>Favorites</p>
										</figure>
										<div className="w-full rounded-[2.2rem] border-2 border-gray-secondary mt-4 p-[0.65rem] shadow-md cursor-pointer space-y-3">
											{c.map((item, index) => {
												return (
													<>
														<figure
															key={index}
															className="flex px-2 items-center justify-between"
														>
															<div className="flex space-x-3">
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
																<span className="flex justify-center items-center text-yellow-primary bg-gray-light rounded-full h-[35px] w-[35px]">
																	<BsFillTelephoneFill />
																</span>
																<span className="flex justify-center items-center text-yellow-primary bg-gray-light rounded-full h-[35px] w-[35px]">
																	<AiTwotoneMessage />
																</span>
															</div>
														</figure>
														{index !== c.length - 1 && (
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
											<h3 className="text-gray-secondary">
												No Selected Favorites
											</h3>
										</div>
									</>
								)}

								{d.length !== 0 ? (
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
														className="w-full rounded-[2.2rem] border-2 border-gray-secondary mt-4 p-[0.65rem] shadow-md cursor-pointer space-y-3"
													>
														{item[1].map((contact, index) => {
															return (
																<>
																	<figure className="flex px-2 items-center justify-between">
																		<div className="flex space-x-3">
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
																			<span className="flex justify-center items-center text-yellow-primary bg-gray-light rounded-full h-[35px] w-[35px]">
																				<BsFillTelephoneFill />
																			</span>
																			<span className="flex justify-center items-center text-yellow-primary bg-gray-light rounded-full h-[35px] w-[35px]">
																				<AiTwotoneMessage />
																			</span>
																		</div>
																	</figure>
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
											<h3 className="text-gray-secondary">
												No Selected Favorites
											</h3>
										</div>
									</>
								)}
							</div>
						</article>
						<article className="w-[70px] flex flex-col items-center h-full text-yellow-primary space-y-1 font-medium">
							<BsStarFill />
							{b.map((item, index) => {
								return <p key={index}>{item}</p>;
							})}
						</article>
					</section>
				</sidebar>
				<main className="h-fullu bg-white">
					<section className="flex h-[70px] bg-gray-primary"></section>
				</main>
			</div>
		</div>
	);
}
