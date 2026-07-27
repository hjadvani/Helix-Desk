import { useQuery } from "@tanstack/react-query";
import { e as executeFetch } from "./fetch-DfbrtxWN.js";
const getApiUserContext = (params, options, signal) => {
  return executeFetch(
    { url: `/api/user-context`, method: "GET", params, signal },
    options
  );
};
const getGetApiUserContextQueryKey = (params) => {
  return [`/api/user-context`, ...params ? [params] : []];
};
const getGetApiUserContextQueryOptions = (params, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetApiUserContextQueryKey(params);
  const queryFn = ({ signal, meta }) => getApiUserContext(params, { ...requestOptions, meta }, signal);
  return { queryKey, queryFn, ...queryOptions };
};
function useGetApiUserContext(params, options, queryClient) {
  const queryOptions = getGetApiUserContextQueryOptions(params, options);
  const query = useQuery(queryOptions, queryClient);
  query.queryKey = queryOptions.queryKey;
  return query;
}
const prefetchGetApiUserContext = async (queryClient, params, options) => {
  const queryOptions = getGetApiUserContextQueryOptions(params, options);
  await queryClient.prefetchQuery(queryOptions);
  return queryClient;
};
const getApiUserContextAssume = (params, options, signal) => {
  return executeFetch(
    { url: `/api/user-context/assume`, method: "GET", params, signal },
    options
  );
};
const getGetApiUserContextAssumeQueryKey = (params) => {
  return [`/api/user-context/assume`, ...params ? [params] : []];
};
const getGetApiUserContextAssumeQueryOptions = (params, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetApiUserContextAssumeQueryKey(params);
  const queryFn = ({ signal, meta }) => getApiUserContextAssume(params, { ...requestOptions, meta }, signal);
  return { queryKey, queryFn, ...queryOptions };
};
function useGetApiUserContextAssume(params, options, queryClient) {
  const queryOptions = getGetApiUserContextAssumeQueryOptions(params, options);
  const query = useQuery(queryOptions, queryClient);
  query.queryKey = queryOptions.queryKey;
  return query;
}
const prefetchGetApiUserContextAssume = async (queryClient, params, options) => {
  const queryOptions = getGetApiUserContextAssumeQueryOptions(params, options);
  await queryClient.prefetchQuery(queryOptions);
  return queryClient;
};
export {
  getApiUserContextAssume as a,
  getGetApiUserContextAssumeQueryKey as b,
  getGetApiUserContextAssumeQueryOptions as c,
  getGetApiUserContextQueryKey as d,
  getGetApiUserContextQueryOptions as e,
  prefetchGetApiUserContextAssume as f,
  getApiUserContext as g,
  useGetApiUserContextAssume as h,
  prefetchGetApiUserContext as p,
  useGetApiUserContext as u
};
