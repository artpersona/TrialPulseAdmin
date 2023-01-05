import { BsFillTelephoneFill, BsStarFill } from "react-icons/bs";
import { AiOutlinePlus, AiTwotoneMessage } from "react-icons/ai";
import { TbNotes } from "react-icons/tb";

import { sponsorsE } from "../../shared/utils/sponsorsSample.utility";

function SponsorsViewMode() {
	return (
		<main className="w-full h-full bg-white">
			<section className="flex w-full justify-between items-center h-[70px] bg-gray-primary">
				<article />

				<article className="flex w-[400px]">
					{sponsorsE.map((item, index) => {
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
				<article className="">
					<span className="text-4xl flex justify-center items-center text-yellow-primary  rounded-full h-[50px] w-[50px] cursor-pointer">
						<AiOutlinePlus />
					</span>
				</article>
			</section>

			<section className="w-full flex flex-col items-center justify-center">
				<div className="px-4 mt-4 flex justify-between min-w-[400px] font-bold">
					<p className="text-yellow-primary cursor-pointer">Edit Sponsor</p>
					<p className="text-yellow-primary cursor-pointer">Add to Favorites</p>
					<p className="text-red-primary cursor-pointer">Delete Site</p>
				</div>

				<div className="w-[400px] rounded-[2.2rem] border-2 border-gray-secondary mt-4 p-4 shadow-md space-y-6 flex flex-col items-center justify-center">
					<h2 className="text-blue-primary font-medium">Sponsors Name</h2>

					<div className="border-1 border-gray-light w-full" />

					<article className="flex flex-col items-center">
						<h3 className="text-blue-primary font-medium">
							Protocol Name/Number
						</h3>
						<p>Lorem Ipsum dolor #0000009</p>
					</article>

					<article className="flex flex-col items-center">
						<h3 className="text-blue-primary font-medium">
							Chief Medical Officer
						</h3>
						<p>FirstName LastName</p>
						<p className="text-yellow-primary">drlivesly@gmail.com</p>
						<p className="text-yellow-primary">999-555-1234</p>
						<p className="text-yellow-primary">999-555-1234</p>
					</article>

					<article className="flex flex-col items-center">
						<h3 className="text-blue-primary font-medium">Study Protocol</h3>
						<p>1234567890</p>
					</article>

					<article className="flex flex-col items-center">
						<h3 className="text-blue-primary font-medium">Sites</h3>
						<p>SiteName</p>
						<p>123 N Circle CT</p>
						<p>Las Vegas, NV 89001</p>
					</article>

					<article className="flex flex-col items-center">
						<div className="flex space-x-4 text-2xl">
							<span className="flex justify-center items-center text-yellow-primary bg-gray-light rounded-full h-[50px] w-[50px] cursor-pointer">
								<BsFillTelephoneFill />
							</span>
							<span className="flex justify-center items-center text-yellow-primary bg-gray-light rounded-full h-[50px] w-[50px] cursor-pointer">
								<AiTwotoneMessage />
							</span>
							<span className="flex justify-center items-center text-gray-secondary bg-gray-light rounded-full h-[50px] w-[50px] cursor-pointer">
								<BsStarFill />
							</span>
						</div>
					</article>
				</div>

				<div className="w-[400px] rounded-[2.2rem] border-2 border-gray-secondary mt-4 p-4 shadow-md space-y-6 flex flex-col">
					<article className="flex space-x-2 items-center">
						<span className="flex justify-center items-center text-white bg-gray-secondary rounded-full h-[50px] w-[50px] cursor-pointer text-4xl">
							<TbNotes />
						</span>
						<h2 className="text-blue-primary font-medium">Notes</h2>
					</article>

					<article className="flex flex-col items-center">
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam, quis nostrud exercitation ullamco laboris
							nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
							reprehenderit in voluptate velit esse cillum dolore eu fugiat
							nulla pariatur. Excepteur sint occaecat cupidatat non proident,
							sunt in culpa qui officia deserunt mollit anim id est laborum.
						</p>
					</article>
				</div>
			</section>
		</main>
	);
}

export default SponsorsViewMode;
