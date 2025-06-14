import type { OrganizationJobsControllerFragment$key } from "@/__generated__/OrganizationJobsControllerFragment.graphql";
import links from "@/lib/links";
import { Button, Input } from "@heroui/react";
import { BriefcaseBusiness, Search } from "lucide-react";
import Link from "next/link";
import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import invariant from "tiny-invariant";

interface OrganizationJobsControllerProps {
	searchTerm: string | null;
	setSearchTerm: (searchTerm: string | null) => void;
	rootQuery: OrganizationJobsControllerFragment$key;
}

const OrganizationJobsControllerFragment = graphql`
	fragment OrganizationJobsControllerFragment on Query
	@argumentDefinitions(
		slug: { type: "String!" }
	) {
		organization(slug: $slug) {
			__typename
			... on Organization {
				isAdmin
			}
		}
	}
`;

export default function OrganizationJobsController(
	props: OrganizationJobsControllerProps,
) {
	const data = useFragment(OrganizationJobsControllerFragment, props.rootQuery);
	invariant(
		data.organization.__typename === "Organization",
		"Expected 'Organization' type.",
	);

	return (
		<div className="w-full flex flex-col sm:flex-row items-center gap-8">
			<Input
				classNames={{
					inputWrapper: "bg-background shadow-none",
				}}
				startContent={
					<Search
						size={20}
						className="text-2xl text-default-400 pointer-events-none flex-shrink-0 mr-4"
					/>
				}
				isClearable
				placeholder="Find a job posting..."
				variant="bordered"
				value={props.searchTerm || ""}
				onValueChange={(value) => props.setSearchTerm(value)}
				onClear={() => props.setSearchTerm(null)}
				fullWidth
			/>
			{data.organization.isAdmin && (
				<Button
					as={Link}
					href={links.organizationCreateJob}
					color="primary"
					startContent={<BriefcaseBusiness size={25} />}
					className="w-full sm:w-auto"
				>
					New
				</Button>
			)}
		</div>
	);
}
