"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { e as executeFetch, R as REDIRECT_TO_KEY, S as SAML_LOGIN_URL, L as LOGOUT_URL } from "../fetch-DfbrtxWN.js";
import { e as getGetApiUserContextQueryOptions } from "../user-context-rest-api-qUbehPgw.js";
const FETCH_IDPS_CONTEXT = {
  appName: "auth_by_unifyapps",
  resourceName: "auth_by_unifyapps_fetch_identity_providers"
};
const IDP_TYPE_FILTER = ["PASSWORD", "OPEN_ID", "SAML", "BIOMETRIC"].map((type) => ({
  filter: { value: type, operator: "EQUAL" },
  property: "type"
}));
const FETCH_IDPS_INPUTS = {
  triggerInputCondition: { filters: IDP_TYPE_FILTER, operator: "OR" },
  sortBy: []
};
function executeAuthNode({
  name,
  context,
  inputs,
  signal,
  meta
}) {
  const request = {
    context,
    id: name,
    inputs,
    options: { cacheConfig: {} }
  };
  return executeFetch(
    {
      url: `/auth/workflow/execute/node?${new URLSearchParams({ name }).toString()}`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: request,
      signal
    },
    // merge the default meta (apiDomain + x-ua-app header) UNDER our own routing flag,
    // so the app is still scoped/routed correctly while the call rides the public
    // `/auth/…` path. Without the spread the interface headers never went out.
    { meta: { ...meta, isPublicPage: true } }
  );
}
function fetchIdps(signal, meta) {
  return executeAuthNode({
    name: "fetchIDPs",
    context: FETCH_IDPS_CONTEXT,
    inputs: FETCH_IDPS_INPUTS,
    signal,
    meta
  }).then((data) => data.response ?? {});
}
const FORGOT_PASSWORD_CONTEXT = {
  appName: "auth_by_unifyapps",
  resourceName: "auth_by_unifyapps_trigger_reset_password"
};
function sendForgotPasswordEmail(username, signal, meta) {
  return executeAuthNode({
    name: "sendForgotPasswordEmail",
    context: FORGOT_PASSWORD_CONTEXT,
    inputs: { username },
    signal,
    meta
  });
}
const fetchIdentityProviders = (query, options, signal) => {
  return executeFetch(
    {
      url: `/api/identity-provider`,
      method: "GET",
      headers: { "Content-Type": "application/json" },
      signal
    },
    options
  );
};
const getFetchIdentityProvidersQueryKey = (query) => {
  return [`/api/identity-provider`, query];
};
const getFetchIdentityProvidersQueryOptions = (query, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getFetchIdentityProvidersQueryKey(query);
  const queryFn = ({ signal, meta }) => fetchIdentityProviders(query, { ...requestOptions, meta }, signal);
  return { queryKey, queryFn, ...queryOptions };
};
function useFetchIdentityProviders(query, options, queryClient) {
  const queryOptions = getFetchIdentityProvidersQueryOptions(query, options);
  const _query = useQuery(queryOptions, queryClient);
  _query.queryKey = queryOptions.queryKey;
  return _query;
}
const prefetchFetchIdentityProviders = async (queryClient, query, options) => {
  const queryOptions = getFetchIdentityProvidersQueryOptions(query, options);
  await queryClient.prefetchQuery(queryOptions);
  return queryClient;
};
const createOrUpdateIdentityProvider = (identityProvider, options, signal) => {
  return executeFetch(
    {
      url: `/api/identity-provider`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: identityProvider,
      signal
    },
    options
  );
};
const getCreateOrUpdateIdentityProviderMutationOptions = (options) => {
  const mutationKey = ["createOrUpdateIdentityProvider"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { data } = props ?? {};
    return createOrUpdateIdentityProvider(data, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useCreateOrUpdateIdentityProvider = (options, queryClient) => {
  const mutationOptions = getCreateOrUpdateIdentityProviderMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const deleteIdentityProvider = (identityProviderId, options, signal) => {
  return executeFetch(
    {
      url: `/api/identity-provider/delete/${encodeURIComponent(String(identityProviderId))}`,
      method: "POST",
      signal
    },
    options
  );
};
const getDeleteIdentityProviderMutationOptions = (options) => {
  const mutationKey = ["deleteIdentityProvider"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { identityProviderId } = props ?? {};
    return deleteIdentityProvider(identityProviderId, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useDeleteIdentityProvider = (options, queryClient) => {
  const mutationOptions = getDeleteIdentityProviderMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const getIdentityProviders = (query, options, signal) => {
  return executeFetch(
    {
      url: `/api/identity-provider/fetch-identity-providers`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: query,
      signal
    },
    options
  );
};
const getGetIdentityProvidersQueryKey = (query) => {
  return [`/api/identity-provider/fetch-identity-providers`, query];
};
const getGetIdentityProvidersQueryOptions = (query, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetIdentityProvidersQueryKey(query);
  const queryFn = ({ signal, meta }) => getIdentityProviders(query, { ...requestOptions, meta }, signal);
  return { queryKey, queryFn, ...queryOptions };
};
function useGetIdentityProviders(query, options, queryClient) {
  const queryOptions = getGetIdentityProvidersQueryOptions(query, options);
  const _query = useQuery(queryOptions, queryClient);
  _query.queryKey = queryOptions.queryKey;
  return _query;
}
const prefetchGetIdentityProviders = async (queryClient, query, options) => {
  const queryOptions = getGetIdentityProvidersQueryOptions(query, options);
  await queryClient.prefetchQuery(queryOptions);
  return queryClient;
};
const importSAMLMetadata = (sAMLMetadataImportRequest, options, signal) => {
  return executeFetch(
    {
      url: `/api/identity-provider/import-saml-metadata`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: sAMLMetadataImportRequest,
      signal
    },
    options
  );
};
const getImportSAMLMetadataMutationOptions = (options) => {
  const mutationKey = ["importSAMLMetadata"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { data } = props ?? {};
    return importSAMLMetadata(data, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useImportSAMLMetadata = (options, queryClient) => {
  const mutationOptions = getImportSAMLMetadataMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const toggleActive = (identityProviderId, options, signal) => {
  return executeFetch(
    {
      url: `/api/identity-provider/toggle-active/${encodeURIComponent(String(identityProviderId))}`,
      method: "POST",
      signal
    },
    options
  );
};
const getToggleActiveMutationOptions = (options) => {
  const mutationKey = ["toggleActive"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { identityProviderId } = props ?? {};
    return toggleActive(identityProviderId, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useToggleActive = (options, queryClient) => {
  const mutationOptions = getToggleActiveMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const findIdentityProviderById = (identityProviderId, options, signal) => {
  return executeFetch(
    {
      url: `/api/identity-provider/${encodeURIComponent(String(identityProviderId))}`,
      method: "GET",
      signal
    },
    options
  );
};
const getFindIdentityProviderByIdQueryKey = (identityProviderId) => {
  return [`/api/identity-provider/${identityProviderId}`];
};
const getFindIdentityProviderByIdQueryOptions = (identityProviderId, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getFindIdentityProviderByIdQueryKey(identityProviderId);
  const queryFn = ({ signal, meta }) => findIdentityProviderById(
    identityProviderId,
    { ...requestOptions, meta },
    signal
  );
  return {
    queryKey,
    queryFn,
    enabled: !!identityProviderId,
    ...queryOptions
  };
};
function useFindIdentityProviderById(identityProviderId, options, queryClient) {
  const queryOptions = getFindIdentityProviderByIdQueryOptions(
    identityProviderId,
    options
  );
  const query = useQuery(queryOptions, queryClient);
  query.queryKey = queryOptions.queryKey;
  return query;
}
const prefetchFindIdentityProviderById = async (queryClient, identityProviderId, options) => {
  const queryOptions = getFindIdentityProviderByIdQueryOptions(
    identityProviderId,
    options
  );
  await queryClient.prefetchQuery(queryOptions);
  return queryClient;
};
const redirectToApplicationSession = (applicationId, params, options, signal) => {
  return executeFetch(
    {
      url: `/api/session/application-session-redirect/${encodeURIComponent(String(applicationId))}`,
      method: "GET",
      params,
      signal
    },
    options
  );
};
const getRedirectToApplicationSessionQueryKey = (applicationId, params) => {
  return [
    `/api/session/application-session-redirect/${applicationId}`,
    ...params ? [params] : []
  ];
};
const getRedirectToApplicationSessionQueryOptions = (applicationId, params, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getRedirectToApplicationSessionQueryKey(applicationId, params);
  const queryFn = ({ signal, meta }) => redirectToApplicationSession(
    applicationId,
    params,
    { ...requestOptions, meta },
    signal
  );
  return {
    queryKey,
    queryFn,
    enabled: !!applicationId,
    ...queryOptions
  };
};
function useRedirectToApplicationSession(applicationId, params, options, queryClient) {
  const queryOptions = getRedirectToApplicationSessionQueryOptions(
    applicationId,
    params,
    options
  );
  const query = useQuery(queryOptions, queryClient);
  query.queryKey = queryOptions.queryKey;
  return query;
}
const prefetchRedirectToApplicationSession = async (queryClient, applicationId, params, options) => {
  const queryOptions = getRedirectToApplicationSessionQueryOptions(
    applicationId,
    params,
    options
  );
  await queryClient.prefetchQuery(queryOptions);
  return queryClient;
};
const createApplicationSessionForUser = (createApplicationSessionForUserRequest, options, signal) => {
  return executeFetch(
    {
      url: `/api/session/create-application-session-for-user`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: createApplicationSessionForUserRequest,
      signal
    },
    options
  );
};
const getCreateApplicationSessionForUserMutationOptions = (options) => {
  const mutationKey = ["createApplicationSessionForUser"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { data } = props ?? {};
    return createApplicationSessionForUser(data, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useCreateApplicationSessionForUser = (options, queryClient) => {
  const mutationOptions = getCreateApplicationSessionForUserMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const createApplicationSession = (applicationId, options, signal) => {
  return executeFetch(
    {
      url: `/api/session/create-application-session/${encodeURIComponent(String(applicationId))}`,
      method: "POST",
      signal
    },
    options
  );
};
const getCreateApplicationSessionMutationOptions = (options) => {
  const mutationKey = ["createApplicationSession"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { applicationId } = props ?? {};
    return createApplicationSession(applicationId, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useCreateApplicationSession = (options, queryClient) => {
  const mutationOptions = getCreateApplicationSessionMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const createPlatformSession = (options, signal) => {
  return executeFetch(
    { url: `/api/session/create-platform-session`, method: "POST", signal },
    options
  );
};
const getCreatePlatformSessionMutationOptions = (options) => {
  const mutationKey = ["createPlatformSession"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (_, context) => {
    return createPlatformSession({
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useCreatePlatformSession = (options, queryClient) => {
  const mutationOptions = getCreatePlatformSessionMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const deleteApplicationSessionForUser = (deleteApplicationSessionForUserRequest, options, signal) => {
  return executeFetch(
    {
      url: `/api/session/delete-application-session-for-user`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: deleteApplicationSessionForUserRequest,
      signal
    },
    options
  );
};
const getDeleteApplicationSessionForUserMutationOptions = (options) => {
  const mutationKey = ["deleteApplicationSessionForUser"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { data } = props ?? {};
    return deleteApplicationSessionForUser(data, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useDeleteApplicationSessionForUser = (options, queryClient) => {
  const mutationOptions = getDeleteApplicationSessionForUserMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const getSessionToken = (options, signal) => {
  return executeFetch(
    { url: `/api/session/get-session-token`, method: "GET", signal },
    options
  );
};
const getGetSessionTokenQueryKey = () => {
  return [`/api/session/get-session-token`];
};
const getGetSessionTokenQueryOptions = (options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetSessionTokenQueryKey();
  const queryFn = ({
    signal,
    meta
  }) => getSessionToken({ ...requestOptions, meta }, signal);
  return { queryKey, queryFn, ...queryOptions };
};
function useGetSessionToken(options, queryClient) {
  const queryOptions = getGetSessionTokenQueryOptions(options);
  const query = useQuery(queryOptions, queryClient);
  query.queryKey = queryOptions.queryKey;
  return query;
}
const prefetchGetSessionToken = async (queryClient, options) => {
  const queryOptions = getGetSessionTokenQueryOptions(options);
  await queryClient.prefetchQuery(queryOptions);
  return queryClient;
};
const FETCH_IDPS_QUERY_KEY = ["auth/workflow/execute/node", "fetchIDPs"];
function useIdentityProviders(options) {
  return useQuery({
    queryKey: FETCH_IDPS_QUERY_KEY,
    // forward the default query meta (apiDomain + x-ua-app header) so the app is
    // routed/scoped — a hand-rolled fetch doesn't inherit it like the generated hooks
    queryFn: ({ signal, meta }) => fetchIdps(signal, meta),
    staleTime: 5e3,
    ...options?.query
  });
}
function useUserContext(options) {
  return useQuery(getGetApiUserContextQueryOptions(void 0, options));
}
function useDefaultMutationMeta() {
  return useQueryClient().getDefaultOptions().mutations?.meta;
}
function authLogin(request, meta) {
  return executeFetch(
    {
      url: "/auth/login",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: request
    },
    { meta }
  );
}
function useAuthLogin(options) {
  const meta = useDefaultMutationMeta();
  return useMutation({
    mutationFn: (variables) => authLogin(variables.data, meta),
    ...options?.mutation
  });
}
function getSSOLoginUrl(identityProviderId, returnTo) {
  const params = new URLSearchParams({ identityProviderId });
  if (returnTo) params.set(REDIRECT_TO_KEY, returnTo);
  return `${SAML_LOGIN_URL}?${params.toString()}`;
}
function logout(meta) {
  return executeFetch({ url: LOGOUT_URL, method: "POST" }, { meta });
}
function useLogout(options) {
  const meta = useDefaultMutationMeta();
  return useMutation({ mutationFn: () => logout(meta), ...options?.mutation });
}
function useSendForgotPasswordEmail(options) {
  const meta = useDefaultMutationMeta();
  return useMutation({
    mutationFn: ({ username }) => sendForgotPasswordEmail(username, void 0, meta),
    ...options?.mutation
  });
}
const UPDATE_PASSWORD_NODE_NAME = "updatePasswordDatasource";
const UPDATE_PASSWORD_CONTEXT = {
  appName: "standard_entities",
  resourceName: "standard_entities_reset_password"
};
const UPDATE_PASSWORD_STATIC_INPUTS = { deleteSessions: true, update_type: "SELF" };
function updatePassword(request, meta) {
  return executeFetch(
    {
      url: "/api/user/update-password",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: request
    },
    { meta }
  );
}
function useUpdatePassword(options) {
  const meta = useDefaultMutationMeta();
  return useMutation({
    mutationFn: ({ password }) => updatePassword(
      {
        id: UPDATE_PASSWORD_NODE_NAME,
        context: UPDATE_PASSWORD_CONTEXT,
        inputs: { ...UPDATE_PASSWORD_STATIC_INPUTS, password }
      },
      meta
    ),
    ...options?.mutation
  });
}
export {
  authLogin,
  createApplicationSession,
  createApplicationSessionForUser,
  createOrUpdateIdentityProvider,
  createPlatformSession,
  deleteApplicationSessionForUser,
  deleteIdentityProvider,
  fetchIdentityProviders,
  findIdentityProviderById,
  getCreateApplicationSessionForUserMutationOptions,
  getCreateApplicationSessionMutationOptions,
  getCreateOrUpdateIdentityProviderMutationOptions,
  getCreatePlatformSessionMutationOptions,
  getDeleteApplicationSessionForUserMutationOptions,
  getDeleteIdentityProviderMutationOptions,
  getFetchIdentityProvidersQueryKey,
  getFetchIdentityProvidersQueryOptions,
  getFindIdentityProviderByIdQueryKey,
  getFindIdentityProviderByIdQueryOptions,
  getGetIdentityProvidersQueryKey,
  getGetIdentityProvidersQueryOptions,
  getGetSessionTokenQueryKey,
  getGetSessionTokenQueryOptions,
  getIdentityProviders,
  getImportSAMLMetadataMutationOptions,
  getRedirectToApplicationSessionQueryKey,
  getRedirectToApplicationSessionQueryOptions,
  getSSOLoginUrl,
  getSessionToken,
  getToggleActiveMutationOptions,
  importSAMLMetadata,
  logout,
  prefetchFetchIdentityProviders,
  prefetchFindIdentityProviderById,
  prefetchGetIdentityProviders,
  prefetchGetSessionToken,
  prefetchRedirectToApplicationSession,
  redirectToApplicationSession,
  sendForgotPasswordEmail,
  toggleActive,
  useAuthLogin,
  useCreateApplicationSession,
  useCreateApplicationSessionForUser,
  useCreateOrUpdateIdentityProvider,
  useCreatePlatformSession,
  useDeleteApplicationSessionForUser,
  useDeleteIdentityProvider,
  useFetchIdentityProviders,
  useFindIdentityProviderById,
  useGetIdentityProviders,
  useGetSessionToken,
  useIdentityProviders,
  useImportSAMLMetadata,
  useLogout,
  useRedirectToApplicationSession,
  useSendForgotPasswordEmail,
  useToggleActive,
  useUpdatePassword,
  useUserContext
};
