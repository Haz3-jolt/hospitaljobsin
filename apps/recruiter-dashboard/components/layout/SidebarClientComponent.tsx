"use client";
import type { SidebarQuery as SidebarQueryType } from "@/__generated__/SidebarQuery.graphql";
import useOrganization from "@/lib/hooks/useOrganization";
import { Suspense } from "react";
import { loadQuery, useRelayEnvironment } from "react-relay";
import Sidebar, { SidebarQuery } from "./Sidebar";

export default function SidebarClientComponent() {
	const { organizationSlug } = useOrganization();
	const environment = useRelayEnvironment();
	const queryReference = loadQuery<SidebarQueryType>(
		environment,
		SidebarQuery,
		{ organizationSlug: organizationSlug },
		{ fetchPolicy: "store-or-network" },
	);

	return (
		<Suspense>
			<Sidebar queryReference={queryReference} />
		</Suspense>
	);
}
