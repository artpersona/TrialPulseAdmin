import { useRouter } from "next/router";
import { useState } from "react";
import { useSponsorContext } from "../../shared/contexts/SponsorsContext";
import SponsorSidebar from "./SponsorSidebar";
import SponsorsViewMode from "./SponsorsViewMode";
import SponsorsEditMode from "./SponsorsEditMode";

export default function Sponsors() {
	const { sponsors, addSponsor } = useSponsorContext();
	const router = useRouter();
	const [addModalShow, setAddModalShow] = useState(false);
	const [sponsorName, setSponsorName] = useState("");
	const [viewMode, setViewMode] = useState(true);

	const toggleView = () => {
		setViewMode(!viewMode);
	}

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
				<SponsorSidebar />
				{viewMode ? <SponsorsViewMode />: <SponsorsEditMode />}
			</div>
		</div>
	);
}
