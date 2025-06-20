/**
 * @generated SignedSource<<71937073c6952a5bd14ac772996821bb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderInlineDataFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type pageJobApplyMetadataFragment$data = {
  readonly organization: {
    readonly __typename: "Organization";
    readonly job: {
      readonly __typename: "Job";
      readonly description: string;
      readonly externalApplicationUrl: string | null | undefined;
      readonly isApplied: boolean;
      readonly title: string;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    };
    readonly logoUrl: string;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  };
  readonly " $fragmentType": "pageJobApplyMetadataFragment";
};
export type pageJobApplyMetadataFragment$key = {
  readonly " $data"?: pageJobApplyMetadataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"pageJobApplyMetadataFragment">;
};

const node: ReaderInlineDataFragment = {
  "kind": "InlineDataFragment",
  "name": "pageJobApplyMetadataFragment"
};

(node as any).hash = "6f37835661638374270f407e30e99144";

export default node;
