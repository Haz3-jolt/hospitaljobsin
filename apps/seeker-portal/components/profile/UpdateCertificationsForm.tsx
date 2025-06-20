import type { UpdateCertificationsFormFragment$key } from "@/__generated__/UpdateCertificationsFormFragment.graphql";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	DatePicker,
	Input,
} from "@heroui/react";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { CalendarDate, parseDate } from "@internationalized/date";
import { Plus, ShieldCheckIcon, Trash } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { graphql, useFragment, useMutation } from "react-relay";
import { z } from "zod/v4-mini";

const UpdateCertificationsFormMutation = graphql`
mutation UpdateCertificationsFormMutation($certifications: [CertificationInput!]!) {
  updateProfileCertifications(certifications: $certifications) {
    ...on Account {
      profile {
        ... on Profile {
          ...UpdateCertificationsFormFragment
        }
      }
    }
  }
}
`;

const UpdateCertificationsFormFragment = graphql`
  fragment UpdateCertificationsFormFragment on Profile {
    __typename
    certifications {
      name
      issuer
      certificationUrl
      createdAt
      expiresAt
    }
  }
`;

type Props = {
	rootQuery: UpdateCertificationsFormFragment$key;
	onSaveChanges: () => void;
};

const formSchema = z.object({
	certifications: z.array(
		z.object({
			name: z
				.string()
				.check(z.minLength(1, "This field is required"), z.maxLength(100)),
			issuer: z
				.string()
				.check(z.minLength(1, "This field is required"), z.maxLength(100)),
			certificationUrl: z.url("Must be a valid URL"),
			createdAt: z.custom<CalendarDate>((data) => data instanceof CalendarDate),
			expiresAt: z.nullable(
				z.custom<CalendarDate>((data) => data instanceof CalendarDate),
			),
		}),
	),
});

export default function UpdateCertificationsForm({
	rootQuery,
	onSaveChanges,
}: Props) {
	const [commitMutation, isMutationInFlight] = useMutation(
		UpdateCertificationsFormMutation,
	);
	const data = useFragment(UpdateCertificationsFormFragment, rootQuery);
	const {
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm<z.infer<typeof formSchema>>({
		resolver: standardSchemaResolver(formSchema),
		defaultValues:
			data.certifications.length > 0
				? {
						certifications: data.certifications.map((cert) => ({
							name: cert.name,
							issuer: cert.issuer,
							certificationUrl: cert.certificationUrl,
							createdAt: parseDate(cert.createdAt),
							expiresAt: cert.expiresAt ? parseDate(cert.expiresAt) : null,
						})),
					}
				: {
						certifications: [
							{
								name: "",
								issuer: "",
								certificationUrl: "",
								createdAt: undefined,
								expiresAt: undefined,
							},
						],
					},
	});

	const { fields, append, remove } = useFieldArray({
		control: control,
		name: "certifications",
	});

	function onSubmit(formData: z.infer<typeof formSchema>) {
		commitMutation({
			variables: {
				certifications: formData.certifications.map((cert) => ({
					...cert,
					createdAt: cert.createdAt.toString(),
					expiresAt: cert.expiresAt ? cert.expiresAt.toString() : null,
				})),
			},
		});
		onSaveChanges();
	}

	async function handleCancel() {
		onSaveChanges();
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
			<Card className="p-6 space-y-6" shadow="none">
				<CardHeader>
					<div className="flex items-center gap-2 text-foreground-400">
						<ShieldCheckIcon />
						<h1 className="w-full text-sm font-medium">
							Editing Certifications
						</h1>
					</div>
				</CardHeader>
				<CardBody className="w-full flex flex-col">
					{/* Dynamic Array of certifications */}
					<div className="w-full space-y-12 items-center">
						{fields.length === 0 ? (
							<div className="flex flex-col items-center gap-4">
								<p className="text-gray-500">
									No certification entries. Add your certifications.
								</p>
								<Button
									type="button"
									variant="bordered"
									startContent={<Plus size={18} />}
									onPress={() =>
										append({
											name: "",
											issuer: "",
											certificationUrl: "",
											createdAt: undefined,
											expiresAt: undefined,
										})
									}
								>
									Add Certification
								</Button>
							</div>
						) : (
							<>
								{fields.map((item, index) => (
									<div
										key={`field-${item.name}-${index}`}
										className="flex gap-8 items-end w-full flex-col"
									>
										<div className="w-full space-y-4">
											<Controller
												name={`certifications.${index}.name`}
												control={control}
												defaultValue=""
												render={({ field }) => (
													<Input
														{...field}
														fullWidth
														label="Name"
														placeholder="Certification name"
														errorMessage={
															errors.certifications?.[index]?.name?.message
														}
														isInvalid={!!errors.certifications?.[index]?.name}
													/>
												)}
											/>
										</div>
										<div className="w-full space-y-4">
											<Controller
												name={`certifications.${index}.issuer`}
												control={control}
												defaultValue=""
												render={({ field }) => (
													<Input
														{...field}
														fullWidth
														label="Issuer"
														placeholder="Certification issuer"
														errorMessage={
															errors.certifications?.[index]?.issuer?.message
														}
														isInvalid={!!errors.certifications?.[index]?.issuer}
													/>
												)}
											/>
										</div>
										<div className="w-full space-y-4">
											<Controller
												name={`certifications.${index}.certificationUrl`}
												control={control}
												defaultValue=""
												render={({ field }) => (
													<Input
														{...field}
														fullWidth
														label="Certification URL"
														placeholder="https://..."
														errorMessage={
															errors.certifications?.[index]?.certificationUrl
																?.message
														}
														isInvalid={
															!!errors.certifications?.[index]?.certificationUrl
														}
													/>
												)}
											/>
										</div>
										<div className="w-full space-y-4 flex flex-col sm:flex-row gap-6">
											<Controller
												control={control}
												name={`certifications.${index}.createdAt`}
												render={({ field }) => {
													return (
														<DatePicker
															label="Issued At"
															showMonthAndYearPickers
															selectorButtonPlacement="start"
															errorMessage={
																errors.certifications?.[index]?.createdAt
																	?.message
															}
															isInvalid={
																!!errors.certifications?.[index]?.createdAt
															}
															value={field.value ?? undefined}
															onChange={field.onChange}
														/>
													);
												}}
											/>
											<Controller
												control={control}
												name={`certifications.${index}.expiresAt`}
												render={({ field }) => {
													return (
														<DatePicker
															label="Expires At"
															showMonthAndYearPickers
															selectorButtonPlacement="start"
															errorMessage={
																errors.certifications?.[index]?.expiresAt
																	?.message
															}
															isInvalid={
																!!errors.certifications?.[index]?.expiresAt
															}
															value={field.value ?? undefined}
															onChange={field.onChange}
														/>
													);
												}}
											/>
										</div>
										<Button
											type="button"
											variant="bordered"
											onPress={() => remove(index)}
											startContent={<Trash size={18} />}
										>
											Delete Certification
										</Button>
									</div>
								))}
								<Button
									type="button"
									variant="bordered"
									startContent={<Plus size={18} />}
									onPress={() =>
										append({
											name: "",
											issuer: "",
											certificationUrl: "",
											createdAt: undefined,
											expiresAt: undefined,
										})
									}
								>
									Add Certification
								</Button>
							</>
						)}
					</div>
				</CardBody>
			</Card>

			<div className="mt-4 flex justify-end gap-6">
				<Button
					type="button"
					variant="light"
					onPress={handleCancel}
					isLoading={isMutationInFlight || isSubmitting}
				>
					Cancel
				</Button>
				<Button type="submit" isLoading={isMutationInFlight || isSubmitting}>
					Save Changes
				</Button>
			</div>
		</form>
	);
}
