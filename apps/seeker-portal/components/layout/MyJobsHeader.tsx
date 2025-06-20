"use client";
import type { MyJobsHeaderQuery as MyJobsHeaderQueryType } from "@/__generated__/MyJobsHeaderQuery.graphql";
import links from "@/lib/links";
import { Link, Navbar, NavbarBrand, NavbarContent } from "@heroui/react";
import type { PreloadedQuery } from "react-relay";
import { usePreloadedQuery } from "react-relay";
import { graphql } from "relay-runtime";
import invariant from "tiny-invariant";
import Logo from "../Logo";
import MyJobsTabs from "../my-jobs/MyJobsTabs";
import AuthNavigation from "./AuthNavigation";

export const MyJobsHeaderQuery = graphql`
  query MyJobsHeaderQuery {
    viewer {
      ... on Account {
        __typename
        ...AuthNavigationFragment
      }
      ... on NotAuthenticatedError {
        __typename
      }
    }
  }
`;

export default function MyJobsHeader({
	queryReference,
}: {
	queryReference: PreloadedQuery<MyJobsHeaderQueryType>;
}) {
	const data = usePreloadedQuery(MyJobsHeaderQuery, queryReference);
	invariant(
		data.viewer.__typename === "Account",
		"Expected 'Account' node type",
	);
	return (
		<div className="w-full flex flex-col bg-background border-b border-gray-300">
			<Navbar maxWidth="xl">
				<NavbarBrand className="flex items-center gap-4">
					<Link href={links.landing} className="font-medium text-inherit">
						<Logo />
					</Link>
					My Jobs
				</NavbarBrand>

				<NavbarContent justify="end">
					<AuthNavigation rootQuery={data.viewer} />
				</NavbarContent>
			</Navbar>
			<div className="w-full max-w-7xl mx-auto flex items-center justify-between">
				<MyJobsTabs />
			</div>
		</div>
	);
}
