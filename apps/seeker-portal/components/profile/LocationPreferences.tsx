import type { LocationPreferencesFragment$key } from "@/__generated__/LocationPreferencesFragment.graphql";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Chip,
	Switch,
} from "@heroui/react";
import { EditIcon, MapPinHouseIcon } from "lucide-react";
import { graphql, useFragment } from "react-relay";

const LocationPreferencesFragment = graphql`
  fragment LocationPreferencesFragment on Profile {
        locationsOpenToWork
        openToRelocationAnywhere
        address
  }
`;
type Props = {
	rootQuery: LocationPreferencesFragment$key;
	onEditProfile?: () => void;
};

export default function LocationPreferences({
	rootQuery,
	onEditProfile,
}: Props) {
	const data = useFragment(LocationPreferencesFragment, rootQuery);
	const locations = data.locationsOpenToWork || [];
	const openToRelocation = data.openToRelocationAnywhere;

	return (
		<div className="space-y-12">
			<Card className="p-6 space-y-6" shadow="none">
				<CardHeader className="flex gap-6 w-full items-center justify-between">
					<div className="flex items-center gap-2 text-foreground-400">
						<MapPinHouseIcon />
						<h1 className="w-full text-sm font-medium">Location Preferences</h1>
					</div>
					<Button
						startContent={<EditIcon size={24} />}
						onPress={onEditProfile}
						variant="light"
					>
						Edit
					</Button>
				</CardHeader>
				<CardBody className="flex flex-col gap-8">
					<div className="flex flex-col gap-6 w-full items-center justify-start">
						<h1 className="w-full font-medium">Current Address</h1>
						{!data.address ? (
							<h2 className="w-full text-foreground-500">Add your address</h2>
						) : (
							<h2 className="w-full text-foreground-500">{data.address}</h2>
						)}
					</div>
					<div className="flex items-center gap-4">
						<Switch
							defaultSelected={openToRelocation}
							isSelected={openToRelocation}
							isDisabled
						/>
						<span>Open to relocation anywhere</span>
					</div>
					<div className="mt-4 flex flex-col w-full gap-4">
						<div className="block mb-2 font-medium">
							Preferred work locations
						</div>
						{locations.length > 0 ? (
							<div className="flex flex-wrap gap-2 mb-2">
								{locations.map((loc) => (
									<Chip size="lg" key={loc}>
										{loc}
									</Chip>
								))}
							</div>
						) : (
							<div className="text-foreground-500 text-sm">
								No locations set.
							</div>
						)}
					</div>

					{!openToRelocation && locations.length === 0 && (
						<div className="text-foreground-500 text-sm">
							No location preferences set.
						</div>
					)}
				</CardBody>
			</Card>
		</div>
	);
}
