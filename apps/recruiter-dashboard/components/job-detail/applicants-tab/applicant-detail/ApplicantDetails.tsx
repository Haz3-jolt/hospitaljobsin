"use client";
import type { ApplicantDetailsFragment$key } from "@/__generated__/ApplicantDetailsFragment.graphql";
import { Card, CardBody, CardHeader, Chip, Divider, Link } from "@heroui/react";
import { Mail, ShieldQuestion } from "lucide-react";
import Image from "next/image";
import { graphql, useFragment } from "react-relay";

const ApplicantDetailsFragment = graphql`
  fragment ApplicantDetailsFragment on JobApplicant {
	status
	applicantFields {
			fieldName
			fieldValue
		}
    account @required(action: THROW) {
        fullName
        avatarUrl
        email

		profile @required(action: THROW) {
			address
		}
    }
  }
`;

export default function ApplicantDetails({
	rootQuery,
}: { rootQuery: ApplicantDetailsFragment$key }) {
	const data = useFragment(ApplicantDetailsFragment, rootQuery);

	return (
		<div className="w-full flex flex-col gap-6">
			{/* Applicant Header Card */}
			<Card fullWidth className="p-6 " shadow="none">
				<CardHeader className="w-full flex flex-row gap-6 justify-between">
					<div className="flex gap-6 items-center">
						<div className="relative h-20 w-20">
							<Image
								src={data.account.avatarUrl}
								alt={data.account.fullName}
								fill
								className="rounded-full object-cover"
							/>
						</div>
						<div className="flex flex-col gap-4">
							<h2 className="text-xl font-medium">{data.account.fullName}</h2>
							<div className="flex items-center gap-2 text-foreground-600">
								<Mail size={20} />
								<Link href={`mailto:${data.account.email}`} color="foreground">
									{data.account.email}
								</Link>
							</div>
						</div>
					</div>
					<Chip color="primary">{data.status}</Chip>
				</CardHeader>
			</Card>

			{/* Application Fields */}
			{data.applicantFields && data.applicantFields.length > 0 && (
				<Card fullWidth shadow="none" className="p-6 space-y-6">
					<CardHeader>
						<h3 className="text-medium font-medium text-foreground-600">
							Screening Questions
						</h3>
					</CardHeader>
					<Divider />
					<CardBody>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{data.applicantFields.map((field, index) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								<div key={index} className="flex flex-col gap-4">
									<div className="w-full flex items-center gap-2">
										<ShieldQuestion className="text-foreground-500" size={20} />
										<h4 className="text-foreground-500 font-medium">
											{field.fieldName}
										</h4>
									</div>
									<p className="text-foreground">{field.fieldValue}</p>
								</div>
							))}
						</div>
					</CardBody>
				</Card>
			)}

			{/* TODO: show job seeker profile here */}
		</div>
	);
}
