"use client";
import type { HeaderQuery as HeaderQueryType } from "@/__generated__/HeaderQuery.graphql";
import { APP_NAME } from "@/lib/constants";
import { env } from "@/lib/env/client";
import links from "@/lib/links";
import {
	Button,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
} from "@heroui/react";
import Link from "next/link";
import type { PreloadedQuery } from "react-relay";
import { usePreloadedQuery } from "react-relay";
import { graphql } from "relay-runtime";
import AuthDropdown from "./AuthNavigation";

export const HeaderQuery = graphql`
  query HeaderQuery {
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

export default function Header({
	queryReference,
}: {
	queryReference: PreloadedQuery<HeaderQueryType>;
}) {
	const data = usePreloadedQuery(HeaderQuery, queryReference);
	return (
		<Navbar maxWidth="lg" isBordered className="bg-background-600">
			<NavbarBrand>
				<Link href={links.settings} className="font-medium text-inherit">
					{APP_NAME}
				</Link>
			</NavbarBrand>

			<NavbarContent justify="end">
				{data.viewer.__typename === "Account" ? (
					<AuthDropdown rootQuery={data.viewer} />
				) : (
					<>
						<NavbarItem>
							<Link color="foreground" href={links.login(env.NEXT_PUBLIC_URL)}>
								<Button color="default">Log In</Button>
							</Link>
						</NavbarItem>
						<NavbarItem>
							<Button color="default" variant="flat" disabled>
								For recruiters
							</Button>
						</NavbarItem>
					</>
				)}
			</NavbarContent>
		</Navbar>
	);
}
