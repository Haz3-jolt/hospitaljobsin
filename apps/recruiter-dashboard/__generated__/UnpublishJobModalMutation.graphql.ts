/**
 * @generated SignedSource<<9418bef9223492cd694c1dd88bcb62f8>>
 * @relayHash 3395666206e0157b2292a5d785ebc1fb
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 3395666206e0157b2292a5d785ebc1fb

import type { ConcreteRequest } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type UnpublishJobModalMutation$variables = {
  jobId: string;
};
export type UnpublishJobModalMutation$data = {
  readonly unpublishJob: {
    readonly __typename: "Job";
    readonly __typename: "Job";
    readonly " $fragmentSpreads": FragmentRefs<"JobControlsFragment">;
  } | {
    readonly __typename: "JobNotFoundError";
    readonly __typename: "JobNotFoundError";
  } | {
    readonly __typename: "JobNotPublishedError";
    readonly __typename: "JobNotPublishedError";
  } | {
    readonly __typename: "OrganizationAuthorizationError";
    readonly __typename: "OrganizationAuthorizationError";
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  };
};
export type UnpublishJobModalMutation = {
  response: UnpublishJobModalMutation$data;
  variables: UnpublishJobModalMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "jobId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "jobId",
    "variableName": "jobId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UnpublishJobModalMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "unpublishJob",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "JobControlsFragment"
              }
            ],
            "type": "Job",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UnpublishJobModalMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "unpublishJob",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isActive",
                "storageKey": null
              }
            ],
            "type": "Job",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/)
            ],
            "type": "Node",
            "abstractKey": "__isNode"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "3395666206e0157b2292a5d785ebc1fb",
    "metadata": {},
    "name": "UnpublishJobModalMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "dc97abc9896cb9e28bc42a22c8d80e43";

export default node;
