"use client";
import { authLogin, createApplicationSession, createApplicationSessionForUser, createOrUpdateIdentityProvider, createPlatformSession, deleteApplicationSessionForUser, deleteIdentityProvider, fetchIdentityProviders, findIdentityProviderById, getCreateApplicationSessionForUserMutationOptions, getCreateApplicationSessionMutationOptions, getCreateOrUpdateIdentityProviderMutationOptions, getCreatePlatformSessionMutationOptions, getDeleteApplicationSessionForUserMutationOptions, getDeleteIdentityProviderMutationOptions, getFetchIdentityProvidersQueryKey, getFetchIdentityProvidersQueryOptions, getFindIdentityProviderByIdQueryKey, getFindIdentityProviderByIdQueryOptions, getGetIdentityProvidersQueryKey, getGetIdentityProvidersQueryOptions, getGetSessionTokenQueryKey, getGetSessionTokenQueryOptions, getIdentityProviders, getImportSAMLMetadataMutationOptions, getRedirectToApplicationSessionQueryKey, getRedirectToApplicationSessionQueryOptions, getSSOLoginUrl, getSessionToken, getToggleActiveMutationOptions, importSAMLMetadata, logout, prefetchFetchIdentityProviders, prefetchFindIdentityProviderById, prefetchGetIdentityProviders, prefetchGetSessionToken, prefetchRedirectToApplicationSession, redirectToApplicationSession, sendForgotPasswordEmail, toggleActive, useAuthLogin, useCreateApplicationSession, useCreateApplicationSessionForUser, useCreateOrUpdateIdentityProvider, useCreatePlatformSession, useDeleteApplicationSessionForUser, useDeleteIdentityProvider, useFetchIdentityProviders, useFindIdentityProviderById, useGetIdentityProviders, useGetSessionToken, useIdentityProviders, useImportSAMLMetadata, useLogout, useRedirectToApplicationSession, useSendForgotPasswordEmail, useToggleActive, useUpdatePassword, useUserContext } from "./hooks/auth.js";
import { a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, _, $, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, aa, ab, ac, ad, ae, af, ag, ah, ai, aj, ak, al, am, an, ao, ap, aq, ar, as, at, au, av, aw, ax, ay, az, aA, aB, aC, aD, aE, aF, aG, aH, aI, aJ, aK, aL, aM, aN, aO, aP, aQ, aR, aS, aT, aU, aV, aW, aX, aY, aZ, a_, a$, b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, ba, bb, bc, bd, be, bf, bg, bh, bi, bj, bk, bl, bm, bn, bo, bp, bq, br, bs, bt, bu, bv, bw, bx, by, bz, bA, bB, bC, bD, bE, bF, bG, bH, bI, bJ, bK, bL, bM, bN, bO, bP, bQ, bR, bS, bT, bU, bV, bW, bX, bY, bZ, b_, b$, c0, c1, c2, c3, c4, c5, c6, c7, c8, c9, ca, cb, cc, cd, ce, cf, cg, ch, ci, cj, ck, cl, cm, cn, co, cp, cq, cr, cs, ct, cu, cv, cw, cx, cy, cz, cA, cB, cC, cD, cE, cF, cG, cH, cI, cJ, cK, cL, cM, cN, cO, cP, cQ, cR, cS, cT, cU, cV, cW, cX, cY, cZ, c_, c$, d0, d1, d2, d3, d4, d5 } from "./entity-type-rest-api-siSeTgsg.js";
import { g as g2, a as a10, b as b10, c as c10, d as d6, e as e2, p as p2, f as f2, u as u2, h as h2 } from "./user-context-rest-api-qUbehPgw.js";
import { b as b11, c as c11, e as e3, a as a11, d as d7, f as f3, g as g3, h as h3, i as i2, j as j2, k as k2, l as l2, m as m2, n as n2, o as o2, p as p3, q as q2, r as r2, s as s2, t as t2, u as u3, v as v2, w as w2, x as x2, y as y2, z as z2, A as A2, B as B2, C as C2, D as D2, E as E2, F as F2, G as G2, H as H2, I as I2 } from "./useExecuteWorkflowNodeMutation-Dz1vu8kZ.js";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { H as HTTP_HEADERS, e as executeFetch } from "./fetch-DfbrtxWN.js";
const PUBLIC_SECURITY_TYPE = "PUBLIC";
function fetchInterface(meta, signal) {
  return executeFetch({ url: "/auth/interface", method: "GET", signal }, {
    meta
  });
}
function isPublicInterface(record) {
  const security = record?.properties?.package?.security ?? record?.properties?.security;
  return security?.type === PUBLIC_SECURITY_TYPE;
}
function buildDefaultMeta(baseUrl, interfaceId, isPublic) {
  const meta = {};
  if (baseUrl) meta.apiDomain = baseUrl;
  if (interfaceId) {
    meta.interfaceId = interfaceId;
    meta.headers = { [HTTP_HEADERS.AppId]: interfaceId };
  }
  if (isPublic !== void 0) meta.isPublicInterface = isPublic;
  return Object.keys(meta).length > 0 ? meta : void 0;
}
function applyDefaultMetaToClient(client, meta) {
  if (!meta) return client;
  const existing = client.getDefaultOptions();
  client.setDefaultOptions({
    ...existing,
    queries: { ...existing.queries, meta: { ...meta, ...existing.queries?.meta } },
    mutations: { ...existing.mutations, meta: { ...meta, ...existing.mutations?.meta } }
  });
  return client;
}
const DEFAULT_QUERY_CLIENT_CONFIG = {
  defaultOptions: {
    queries: {
      staleTime: 3e4,
      // 30s
      gcTime: 5 * 6e4,
      // 5m
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
};
function mergeConfig(override, meta) {
  return {
    ...DEFAULT_QUERY_CLIENT_CONFIG,
    ...override,
    defaultOptions: {
      ...DEFAULT_QUERY_CLIENT_CONFIG.defaultOptions,
      ...override?.defaultOptions,
      queries: {
        ...DEFAULT_QUERY_CLIENT_CONFIG.defaultOptions?.queries,
        ...meta ? { meta } : {},
        ...override?.defaultOptions?.queries
      },
      mutations: {
        ...DEFAULT_QUERY_CLIENT_CONFIG.defaultOptions?.mutations,
        ...meta ? { meta } : {},
        ...override?.defaultOptions?.mutations
      }
    }
  };
}
function BaseQueryProvider({
  children,
  client,
  queryClientConfig,
  queryMeta
}) {
  const [queryClient] = useState(
    () => client ? applyDefaultMetaToClient(client, queryMeta) : new QueryClient(mergeConfig(queryClientConfig, queryMeta))
  );
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children });
}
const DOT_KEYS = ["dot-1", "dot-2", "dot-3"];
const ANIMATION_NAME = "ua-sdk-beat";
const KEYFRAMES = `@keyframes ${ANIMATION_NAME}{0%,80%,100%{transform:scale(0);opacity:.4}40%{transform:scale(1);opacity:1}}`;
function BeatLoader({ color = "currentColor", size = 10 }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      "aria-label": "Loading",
      role: "status",
      style: {
        display: "flex",
        gap: size * 0.6,
        alignItems: "center",
        justifyContent: "center",
        padding: size * 2
      },
      children: [
        /* @__PURE__ */ jsx("style", { children: KEYFRAMES }),
        DOT_KEYS.map((dotKey, index) => /* @__PURE__ */ jsx(
          "span",
          {
            style: {
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: color,
              display: "inline-block",
              animation: `${ANIMATION_NAME} 1.4s ${index * 0.16}s infinite ease-in-out both`
            }
          },
          dotKey
        ))
      ]
    }
  );
}
function InterfaceBoundProvider({
  interfaceId,
  baseUrl,
  client,
  queryClientConfig,
  fallback,
  isPreview = false,
  children
}) {
  const [isPublic, setIsPublic] = useState(void 0);
  useEffect(() => {
    const controller = new AbortController();
    fetchInterface(buildDefaultMeta(baseUrl, interfaceId), controller.signal).then((record) => setIsPublic(isPublicInterface(record))).catch(() => {
      if (!controller.signal.aborted) setIsPublic(false);
    });
    return () => controller.abort();
  }, [interfaceId, baseUrl]);
  if (isPublic === void 0) {
    return /* @__PURE__ */ jsx(Fragment, { children: fallback ?? // the default loader fills and centers in whatever hosts the provider —
    // content-sized, it would sit in the top-left corner of a blank page
    /* @__PURE__ */ jsx(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          flex: 1,
          minHeight: 0
        },
        children: /* @__PURE__ */ jsx(BeatLoader, {})
      }
    ) });
  }
  return /* @__PURE__ */ jsx(
    BaseQueryProvider,
    {
      client,
      queryClientConfig,
      queryMeta: buildDefaultMeta(baseUrl, interfaceId, isPreview ? void 0 : isPublic),
      children
    }
  );
}
function AppBuilderProvider({
  children,
  client,
  queryClientConfig,
  baseUrl,
  interfaceId,
  interfaceFallback,
  isPreview = false
}) {
  if (interfaceId) {
    return /* @__PURE__ */ jsx(
      InterfaceBoundProvider,
      {
        baseUrl,
        client,
        fallback: interfaceFallback,
        interfaceId,
        isPreview,
        queryClientConfig,
        children
      }
    );
  }
  return /* @__PURE__ */ jsx(
    BaseQueryProvider,
    {
      client,
      queryClientConfig,
      queryMeta: buildDefaultMeta(baseUrl),
      children
    }
  );
}
export {
  AppBuilderProvider,
  DEFAULT_QUERY_CLIENT_CONFIG,
  a as archiveEntity,
  authLogin,
  b as bulkCreateUpdateOrDeleteHierarchicalEntity,
  c as bulkFetchEntities,
  d as bulkFetchEntitySnapshots,
  b11 as bulkTriggerWorkflow,
  c11 as cancelExecution,
  e as cloneEntity,
  f as copyEntity,
  g as countActivitiesAfterLastPublish,
  createApplicationSession,
  createApplicationSessionForUser,
  h as createEntity,
  i as createEntityAndGetViolations,
  j as createEntityType,
  k as createEntityTypeAndReturnViolations,
  createOrUpdateIdentityProvider,
  createPlatformSession,
  l as createUpdateOrDeleteHierarchicalEntity,
  deleteApplicationSessionForUser,
  m as deleteDependentEntities,
  n as deleteEntity,
  o as deleteEntityAndReplaceParentReferences,
  p as deleteEntityType,
  deleteIdentityProvider,
  q as deployEntity,
  r as deployedBulkFetchEntities,
  s as deployedEntityDependentsWithAssets,
  t as detectFileColumns,
  u as entityDependentsWithAssets,
  e3 as executeWorkflowNode,
  a11 as executeWorkflowNodeMultipartFormData,
  d7 as executeWorkflowNodeSse,
  f3 as executeWorkflowNodes,
  v as exportEntities,
  w as fetchDeployedEmbeddedDependents,
  x as fetchEmbeddedDependents,
  fetchIdentityProviders,
  y as findCountOfParentLookupEntities,
  z as findDeployedEntityById,
  A as findEntityById,
  findIdentityProviderById,
  B as findParentLookupEntities,
  g2 as getApiUserContext,
  a10 as getApiUserContextAssume,
  C as getArchiveEntityMutationOptions,
  D as getBulkCreateUpdateOrDeleteHierarchicalEntityMutationOptions,
  E as getBulkFetchEntitiesMutationOptions,
  F as getBulkFetchEntitySnapshotsQueryKey,
  G as getBulkFetchEntitySnapshotsQueryOptions,
  g3 as getBulkTriggerWorkflowMutationOptions,
  h3 as getCancelExecutionMutationOptions,
  H as getCloneEntityMutationOptions,
  I as getCopyEntityMutationOptions,
  J as getCountActivitiesAfterLastPublishQueryKey,
  K as getCountActivitiesAfterLastPublishQueryOptions,
  getCreateApplicationSessionForUserMutationOptions,
  getCreateApplicationSessionMutationOptions,
  L as getCreateEntityAndGetViolationsMutationOptions,
  M as getCreateEntityMutationOptions,
  N as getCreateEntityTypeAndReturnViolationsMutationOptions,
  O as getCreateEntityTypeMutationOptions,
  getCreateOrUpdateIdentityProviderMutationOptions,
  getCreatePlatformSessionMutationOptions,
  P as getCreateUpdateOrDeleteHierarchicalEntityMutationOptions,
  getDeleteApplicationSessionForUserMutationOptions,
  Q as getDeleteDependentEntitiesMutationOptions,
  R as getDeleteEntityAndReplaceParentReferencesMutationOptions,
  S as getDeleteEntityMutationOptions,
  T as getDeleteEntityTypeMutationOptions,
  getDeleteIdentityProviderMutationOptions,
  U as getDependentAssetCount,
  V as getDeployEntityMutationOptions,
  W as getDeployedBulkFetchEntitiesMutationOptions,
  X as getDeployedEntityDependency,
  Y as getDeployedEntityDependencyTree,
  Z as getDeployedEntityDependentsWithAssetsMutationOptions,
  _ as getDeployedEntitySnapshot,
  $ as getDetectFileColumnsMutationOptions,
  a0 as getDistinctValues,
  a1 as getEntityDependency,
  a2 as getEntityDependencyTree,
  a3 as getEntityDependentsWithAssetsMutationOptions,
  a4 as getEntitySnapshot,
  a5 as getEntityType,
  i2 as getExecuteWorkflowNodeMultipartFormDataMutationOptions,
  j2 as getExecuteWorkflowNodeMutationOptions,
  k2 as getExecuteWorkflowNodeQueryKey,
  l2 as getExecuteWorkflowNodeQueryOptions,
  m2 as getExecuteWorkflowNodeSseQueryKey,
  n2 as getExecuteWorkflowNodeSseQueryOptions,
  o2 as getExecuteWorkflowNodesQueryKey,
  p3 as getExecuteWorkflowNodesQueryOptions,
  a6 as getExportEntitiesMutationOptions,
  a7 as getFetchDeployedEmbeddedDependentsQueryKey,
  a8 as getFetchDeployedEmbeddedDependentsQueryOptions,
  a9 as getFetchEmbeddedDependentsQueryKey,
  aa as getFetchEmbeddedDependentsQueryOptions,
  getFetchIdentityProvidersQueryKey,
  getFetchIdentityProvidersQueryOptions,
  ab as getFindCountOfParentLookupEntitiesQueryKey,
  ac as getFindCountOfParentLookupEntitiesQueryOptions,
  ad as getFindDeployedEntityByIdQueryKey,
  ae as getFindDeployedEntityByIdQueryOptions,
  af as getFindEntityByIdQueryKey,
  ag as getFindEntityByIdQueryOptions,
  getFindIdentityProviderByIdQueryKey,
  getFindIdentityProviderByIdQueryOptions,
  ah as getFindParentLookupEntitiesQueryKey,
  ai as getFindParentLookupEntitiesQueryOptions,
  b10 as getGetApiUserContextAssumeQueryKey,
  c10 as getGetApiUserContextAssumeQueryOptions,
  d6 as getGetApiUserContextQueryKey,
  e2 as getGetApiUserContextQueryOptions,
  aj as getGetDependentAssetCountQueryKey,
  ak as getGetDependentAssetCountQueryOptions,
  al as getGetDeployedEntityDependencyQueryKey,
  am as getGetDeployedEntityDependencyQueryOptions,
  an as getGetDeployedEntityDependencyTreeQueryKey,
  ao as getGetDeployedEntityDependencyTreeQueryOptions,
  ap as getGetDeployedEntitySnapshotQueryKey,
  aq as getGetDeployedEntitySnapshotQueryOptions,
  ar as getGetDistinctValuesQueryKey,
  as as getGetDistinctValuesQueryOptions,
  at as getGetEntityDependencyQueryKey,
  au as getGetEntityDependencyQueryOptions,
  av as getGetEntityDependencyTreeQueryKey,
  aw as getGetEntityDependencyTreeQueryOptions,
  ax as getGetEntitySnapshotQueryKey,
  ay as getGetEntitySnapshotQueryOptions,
  az as getGetEntityTypeQueryKey,
  aA as getGetEntityTypeQueryOptions,
  getGetIdentityProvidersQueryKey,
  getGetIdentityProvidersQueryOptions,
  aB as getGetImportFieldMappingQueryKey,
  aC as getGetImportFieldMappingQueryOptions,
  aD as getGetLatestVersionQueryKey,
  aE as getGetLatestVersionQueryOptions,
  aF as getGetLoggedInUserEntityTypeQueryKey,
  aG as getGetLoggedInUserEntityTypeQueryOptions,
  aH as getGetPrimaryKeyTypeQueryKey,
  aI as getGetPrimaryKeyTypeQueryOptions,
  getGetSessionTokenQueryKey,
  getGetSessionTokenQueryOptions,
  getIdentityProviders,
  aJ as getImportEntitiesMutationOptions,
  aK as getImportFieldMapping,
  getImportSAMLMetadataMutationOptions,
  aL as getLatestVersion,
  aM as getLoggedInUserEntityType,
  aN as getMutateEntityIdMutationOptions,
  aO as getParseColumnMutationOptions,
  aP as getParseColumnNamesInlineMutationOptions,
  aQ as getParseColumnNamesMutationOptions,
  aR as getParseColumnNamesWithTypeMutationOptions,
  aS as getPreviewImportMutationOptions,
  aT as getPrimaryKeyType,
  aU as getPullEntitiesMutationOptions,
  aV as getPushEntitiesMutationOptions,
  q2 as getReTriggerExecutionMutationOptions,
  getRedirectToApplicationSessionQueryKey,
  getRedirectToApplicationSessionQueryOptions,
  aW as getRestoreEntityFromDeployedMutationOptions,
  aX as getRestoreEntityMutationOptions,
  r2 as getRunGetSchemaMutationOptions,
  getSSOLoginUrl,
  aY as getSaveAndDeployEntityMutationOptions,
  aZ as getSaveBulkEntitiesMutationOptions,
  a_ as getSearchChildEntitiesQueryKey,
  a$ as getSearchChildEntitiesQueryOptions,
  b0 as getSearchDeployedChildEntitiesQueryKey,
  b1 as getSearchDeployedChildEntitiesQueryOptions,
  b2 as getSearchDeployedEmbeddedEntitiesQueryKey,
  b3 as getSearchDeployedEmbeddedEntitiesQueryOptions,
  b4 as getSearchDeployedEntitiesQueryKey,
  b5 as getSearchDeployedEntitiesQueryOptions,
  b6 as getSearchEmbeddedEntitiesQueryKey,
  b7 as getSearchEmbeddedEntitiesQueryOptions,
  b8 as getSearchEntitiesQueryKey,
  b9 as getSearchEntitiesQueryOptions,
  ba as getSearchEntitySnapshotMutationOptions,
  getSessionToken,
  getToggleActiveMutationOptions,
  s2 as getTriggerWorkflowMutationOptions,
  bb as getUnarchiveEntityMutationOptions,
  bc as getUpdateEntityAndGetViolationsMutationOptions,
  bd as getUpdateEntityByIdMutationOptions,
  be as getUpdateEntityMutationOptions,
  bf as getUpdateEntityTypeMutationOptions,
  bg as importEntities,
  importSAMLMetadata,
  logout,
  bh as mutateEntityId,
  bi as parseColumn,
  bj as parseColumnNames,
  bk as parseColumnNamesInline,
  bl as parseColumnNamesWithType,
  bm as prefetchBulkFetchEntitySnapshots,
  bn as prefetchCountActivitiesAfterLastPublish,
  t2 as prefetchExecuteWorkflowNode,
  u3 as prefetchExecuteWorkflowNodeSse,
  v2 as prefetchExecuteWorkflowNodes,
  bo as prefetchFetchDeployedEmbeddedDependents,
  bp as prefetchFetchEmbeddedDependents,
  prefetchFetchIdentityProviders,
  bq as prefetchFindCountOfParentLookupEntities,
  br as prefetchFindDeployedEntityById,
  bs as prefetchFindEntityById,
  prefetchFindIdentityProviderById,
  bt as prefetchFindParentLookupEntities,
  p2 as prefetchGetApiUserContext,
  f2 as prefetchGetApiUserContextAssume,
  bu as prefetchGetDependentAssetCount,
  bv as prefetchGetDeployedEntityDependency,
  bw as prefetchGetDeployedEntityDependencyTree,
  bx as prefetchGetDeployedEntitySnapshot,
  by as prefetchGetDistinctValues,
  bz as prefetchGetEntityDependency,
  bA as prefetchGetEntityDependencyTree,
  bB as prefetchGetEntitySnapshot,
  bC as prefetchGetEntityType,
  prefetchGetIdentityProviders,
  bD as prefetchGetImportFieldMapping,
  bE as prefetchGetLatestVersion,
  bF as prefetchGetLoggedInUserEntityType,
  bG as prefetchGetPrimaryKeyType,
  prefetchGetSessionToken,
  prefetchRedirectToApplicationSession,
  bH as prefetchSearchChildEntities,
  bI as prefetchSearchDeployedChildEntities,
  bJ as prefetchSearchDeployedEmbeddedEntities,
  bK as prefetchSearchDeployedEntities,
  bL as prefetchSearchEmbeddedEntities,
  bM as prefetchSearchEntities,
  bN as previewImport,
  bO as pullEntities,
  bP as pushEntities,
  w2 as reTriggerExecution,
  redirectToApplicationSession,
  bQ as restoreEntity,
  bR as restoreEntityFromDeployed,
  x2 as runGetSchema,
  bS as saveAndDeployEntity,
  bT as saveBulkEntities,
  bU as searchChildEntities,
  bV as searchDeployedChildEntities,
  bW as searchDeployedEmbeddedEntities,
  bX as searchDeployedEntities,
  bY as searchEmbeddedEntities,
  bZ as searchEntities,
  b_ as searchEntitySnapshot,
  sendForgotPasswordEmail,
  toggleActive,
  y2 as triggerWorkflow,
  b$ as unarchiveEntity,
  c0 as updateEntity,
  c1 as updateEntityAndGetViolations,
  c2 as updateEntityById,
  c3 as updateEntityType,
  c4 as useArchiveEntity,
  useAuthLogin,
  c5 as useBulkCreateUpdateOrDeleteHierarchicalEntity,
  c6 as useBulkFetchEntities,
  c7 as useBulkFetchEntitySnapshots,
  z2 as useBulkTriggerWorkflow,
  A2 as useCancelExecution,
  c8 as useCloneEntity,
  c9 as useCopyEntity,
  ca as useCountActivitiesAfterLastPublish,
  useCreateApplicationSession,
  useCreateApplicationSessionForUser,
  cb as useCreateEntity,
  cc as useCreateEntityAndGetViolations,
  cd as useCreateEntityType,
  ce as useCreateEntityTypeAndReturnViolations,
  useCreateOrUpdateIdentityProvider,
  useCreatePlatformSession,
  cf as useCreateUpdateOrDeleteHierarchicalEntity,
  useDeleteApplicationSessionForUser,
  cg as useDeleteDependentEntities,
  ch as useDeleteEntity,
  ci as useDeleteEntityAndReplaceParentReferences,
  cj as useDeleteEntityType,
  useDeleteIdentityProvider,
  ck as useDeployEntity,
  cl as useDeployedBulkFetchEntities,
  cm as useDeployedEntityDependentsWithAssets,
  cn as useDetectFileColumns,
  co as useEntityDependentsWithAssets,
  B2 as useExecuteWorkflowNode,
  C2 as useExecuteWorkflowNodeMultipartFormData,
  D2 as useExecuteWorkflowNodeMutation,
  E2 as useExecuteWorkflowNodeSse,
  F2 as useExecuteWorkflowNodes,
  cp as useExportEntities,
  cq as useFetchDeployedEmbeddedDependents,
  cr as useFetchEmbeddedDependents,
  useFetchIdentityProviders,
  cs as useFindCountOfParentLookupEntities,
  ct as useFindDeployedEntityById,
  cu as useFindEntityById,
  useFindIdentityProviderById,
  cv as useFindParentLookupEntities,
  u2 as useGetApiUserContext,
  h2 as useGetApiUserContextAssume,
  cw as useGetDependentAssetCount,
  cx as useGetDeployedEntityDependency,
  cy as useGetDeployedEntityDependencyTree,
  cz as useGetDeployedEntitySnapshot,
  cA as useGetDistinctValues,
  cB as useGetEntityDependency,
  cC as useGetEntityDependencyTree,
  cD as useGetEntitySnapshot,
  cE as useGetEntityType,
  useGetIdentityProviders,
  cF as useGetImportFieldMapping,
  cG as useGetLatestVersion,
  cH as useGetLoggedInUserEntityType,
  cI as useGetPrimaryKeyType,
  useGetSessionToken,
  useIdentityProviders,
  cJ as useImportEntities,
  useImportSAMLMetadata,
  useLogout,
  cK as useMutateEntityId,
  cL as useParseColumn,
  cM as useParseColumnNames,
  cN as useParseColumnNamesInline,
  cO as useParseColumnNamesWithType,
  cP as usePreviewImport,
  cQ as usePullEntities,
  cR as usePushEntities,
  G2 as useReTriggerExecution,
  useRedirectToApplicationSession,
  cS as useRestoreEntity,
  cT as useRestoreEntityFromDeployed,
  H2 as useRunGetSchema,
  cU as useSaveAndDeployEntity,
  cV as useSaveBulkEntities,
  cW as useSearchChildEntities,
  cX as useSearchDeployedChildEntities,
  cY as useSearchDeployedEmbeddedEntities,
  cZ as useSearchDeployedEntities,
  c_ as useSearchEmbeddedEntities,
  c$ as useSearchEntities,
  d0 as useSearchEntitySnapshot,
  useSendForgotPasswordEmail,
  useToggleActive,
  I2 as useTriggerWorkflow,
  d1 as useUnarchiveEntity,
  d2 as useUpdateEntity,
  d3 as useUpdateEntityAndGetViolations,
  d4 as useUpdateEntityById,
  d5 as useUpdateEntityType,
  useUpdatePassword,
  useUserContext
};
