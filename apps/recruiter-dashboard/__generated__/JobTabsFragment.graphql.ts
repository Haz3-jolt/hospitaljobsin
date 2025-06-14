/**
 * @generated SignedSource<<27b645c3e2d747c7b02a5174b8275f00>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type JobTabsFragment$data = {
  readonly externalApplicationUrl: string | null | undefined;
  readonly organization: {
    readonly isAdmin: boolean;
  } | null | undefined;
  readonly " $fragmentType": "JobTabsFragment";
};
export type JobTabsFragment$key = {
  readonly " $data"?: JobTabsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"JobTabsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JobTabsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "externalApplicationUrl",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Organization",
      "kind": "LinkedField",
      "name": "organization",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isAdmin",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Job",
  "abstractKey": null
};

(node as any).hash = "5109ac7f0c2adf266ce403a1aea261dc";

export default node;
