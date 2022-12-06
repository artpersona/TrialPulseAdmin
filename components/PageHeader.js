import {
	Navbar,
	Container,
	Nav,
	InputGroup,
	Form,
	Button,
} from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "../shared/contexts/AuthContext";
import { useRouter } from "next/router";

export default function PageHeader() {
	const { logout } = useAuthContext();
	const router = useRouter();
	return (
		<div>
			<Navbar
				style={{ fontFamily: "adobe-clean, sans-serif" }}
				expand="lg"
				className="shadow p-3 mb-5 bg-[#ededed] rounded"
			>
				<Container>
					<Navbar.Brand href="#home" className="mr-0">
						<Link href="/">
							<a className="text-[14px] px-3 flex flex-col items-center font-light text-[#93a1af]">
								<Image src="/Home.svg" alt="home" width="35" height="35" />
								Home
							</a>
						</Link>
					</Navbar.Brand>
					<Navbar.Toggle
						aria-controls="basic-navbar-nav"
						className="border-none"
					>
						<a className="cursor-pointer text-[14px] px-3 flex flex-col items-center font-light text-[#93a1af]">
							<Image
								src="/More.svg"
								className="text-[#ededed]"
								alt="more"
								width="35"
								height="35"
							/>
							More
						</a>
					</Navbar.Toggle>
					<Navbar.Collapse id="basic-navbar-nav" className="flex">
						<Nav className="w-11/12">
							<section className="flex flex-col 2md:flex-row justify-between w-full">
								<article className="gap-y-4 2md:!gap-y-0 flex flex-wrap mt-4 2md:!mt-0 2md:flex-nowrap">
									<Link href={"/protocols"}>
										<a className="text-[14px] px-3 flex flex-col items-center font-light text-[#93a1af]">
											<Image
												src="/Study_icon.svg"
												alt="protocols"
												width="35"
												height="35"
											/>
											Protocols
										</a>
									</Link>

									<Link href={"/sponsors"}>
										<a className="text-[14px] px-3 flex flex-col items-center font-light text-[#93a1af]">
											<Image
												src="/Vendor_icon.svg"
												alt="protocols"
												width="35"
												height="35"
											/>
											Sponsors
										</a>
									</Link>

									<Link href={"/sites"}>
										<a className="text-[14px] px-3 flex flex-col items-center font-light text-[#93a1af]">
											<Image
												className="min-h-[35px] min-w-[35px]"
												src="/Clinic_icon.svg"
												alt="sites"
												width="35"
												height="35"
											/>
											Sites
										</a>
									</Link>

									<Link href={"/users"}>
										<a className="text-[14px] px-3 flex flex-col items-center font-light text-[#93a1af]">
											<Image
												src="/Users.svg"
												className="text-[#ededed]"
												alt="users"
												width="35"
												height="35"
											/>
											Users
										</a>
									</Link>

									<Link href={"/alerts"}>
										<a className="text-[14px] px-3 flex flex-col items-center font-light text-[#93a1af]">
											<Image
												src="/Alerts.svg"
												className="text-[#ededed]"
												alt="alerts"
												width="35"
												height="35"
											/>
											Alerts
										</a>
									</Link>

									<Link href={"/messages"}>
										<a className="text-[14px] px-3 flex flex-col items-center font-light text-[#93a1af]">
											<Image
												src="/Chat.svg"
												className="text-[#ededed]"
												alt="chat"
												width="35"
												height="35"
											/>
											Chat
										</a>
									</Link>

									<Link href={"/ads"}>
										<a className="text-[14px] px-3 flex flex-col items-center font-light text-[#93a1af]">
											<Image
												src="/Ads.svg"
												className="text-[#ededed]"
												alt="ads"
												width="35"
												height="35"
											/>
											Ads
										</a>
									</Link>
								</article>

								<article>
									<InputGroup className="mt-3 2md:!mt-0 xl:flex xl:w-[500px] h-[50px]">
										<Form.Control
											className="rounded-bl-2xl rounded-tl-2xl w-full"
											placeholder="Search protocols"
											aria-label="Search protocols"
										/>
										<Button className="bg-white border-[#ced4da] border-l-0 rounded-br-2xl rounded-tr-2xl flex justify-center items-center">
											<Image
												src="/Search_icon.svg"
												className="text-[#ededed]"
												alt="search_icon"
												width="20"
												height="20"
											/>
										</Button>
									</InputGroup>
								</article>
							</section>
						</Nav>

						<a className="w-1/12 cursor-pointer text-[14px] px-3 2md:flex flex-col items-center font-light text-[#93a1af] hidden">
							<Image
								src="/More.svg"
								className="text-[#ededed]"
								alt="more"
								width="35"
								height="35"
							/>
							More
						</a>

						{/* <a
							className="text-decoration-none fs-6 text-danger px-3 cursor-pointer"
							onClick={async () => {
								await logout();
								router.push("/login");
							}}
						>
							Logout
						</a> */}
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
}
