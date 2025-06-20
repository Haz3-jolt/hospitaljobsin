/**
 * @generated SignedSource<<3cb83a07daa4fea8b8e821f3578f2c82>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type DeleteInviteModalOrganizationFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "DeleteInviteModalOrganizationFragment";
};
export type DeleteInviteModalOrganizationFragment$key = {
  readonly " $data"?: DeleteInviteModalOrganizationFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"DeleteInviteModalOrganizationFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DeleteInviteModalOrganizationFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Organization",
  "abstractKey": null
};

(node as any).hash = "19a246e49da06210b29a2efeb8480569";

export default node;
