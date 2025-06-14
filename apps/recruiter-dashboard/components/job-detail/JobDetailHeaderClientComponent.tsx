"use client";
import type { JobDetailHeaderQuery as JobDetailHeaderQueryType } from "@/__generated__/JobDetailHeaderQuery.graphql";
import useOrganization from "@/lib/hooks/useOrganization";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import { loadQuery, useRelayEnvironment } from "react-relay";
import JobDetailHeader, { JobDetailHeaderQuery } from "./JobDetailHeader";

export default function JobDetailHeaderClientComponent() {
	const params = useParams<{ slug: string }>();
	const { organizationSlug } = useOrganization();
	const environment = useRelayEnvironment();
	const slug = decodeURIComponent(params.slug);
	const queryReference = loadQuery<JobDetailHeaderQueryType>(
		environment,
		JobDetailHeaderQuery,
		{
			slug: organizationSlug,
			jobSlug: slug,
		},
		{ fetchPolicy: "store-or-network" },
	);

	return (
		<Suspense>
			<JobDetailHeader queryReference={queryReference} />
		</Suspense>
	);
}
