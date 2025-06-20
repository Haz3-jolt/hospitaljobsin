"use client";
import type { JobTabsFragment$key } from "@/__generated__/JobTabsFragment.graphql";
import links from "@/lib/links";
import { Tab, Tabs } from "@heroui/react";
import { HomeIcon, Settings, Users } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import invariant from "tiny-invariant";

const JobTabsFragment = graphql`
fragment JobTabsFragment on Job {
	externalApplicationUrl
  organization {
    isAdmin
  }
}`;

export default function JobTabs({ job }: { job: JobTabsFragment$key }) {
	const pathname = usePathname();
	const params = useParams<{
		slug: string;
		applicantSlug?: string;
	}>();
	const data = useFragment(JobTabsFragment, job);

	const organization = data.organization;
	invariant(organization, "Expected 'Organization' node type");

	function getSelectedKey(pathname: string) {
		if (pathname === links.jobDetailSettingsApplicationForm(params.slug)) {
			return links.jobDetailSettings(params.slug);
		}

		if (
			params.applicantSlug &&
			pathname === links.applicantDetail(params.slug, params.applicantSlug)
		) {
			return links.jobDetailApplicants(params.slug);
		}
		return pathname;
	}

	return (
		<div className="flex w-full flex-col">
			<Tabs
				aria-label="Organization Detail Menu"
				color="default"
				variant="underlined"
				classNames={{
					tabList: "py-0",
					tab: "py-6",
				}}
				selectedKey={getSelectedKey(pathname)}
			>
				<Tab
					key={links.organizationJobDetail(params.slug)}
					href={links.organizationJobDetail(params.slug)}
					title={
						<div className="flex items-center space-x-2">
							<HomeIcon />
							<span>Overview</span>
						</div>
					}
				/>
				{data.externalApplicationUrl === null && (
					<Tab
						key={links.jobDetailApplicants(params.slug)}
						href={links.jobDetailApplicants(params.slug)}
						title={
							<div className="flex items-center space-x-2">
								<Users />
								<span>Applicants</span>
							</div>
						}
					/>
				)}
				{organization.isAdmin && (
					<Tab
						key={links.jobDetailSettings(params.slug)}
						href={links.jobDetailSettings(params.slug)}
						title={
							<div className="flex items-center space-x-2">
								<Settings />
								<span>Job Settings</span>
							</div>
						}
					/>
				)}
			</Tabs>
		</div>
	);
}
