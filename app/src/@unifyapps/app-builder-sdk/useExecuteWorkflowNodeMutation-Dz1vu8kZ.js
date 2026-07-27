import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { e as executeFetch } from "./fetch-DfbrtxWN.js";
const bulkTriggerWorkflow = (executeWorkflowRequest, options, signal) => {
  return executeFetch(
    {
      url: `/api/workflow/bulk/trigger`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: executeWorkflowRequest,
      signal
    },
    options
  );
};
const getBulkTriggerWorkflowMutationOptions = (options) => {
  const mutationKey = ["bulkTriggerWorkflow"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { data } = props ?? {};
    return bulkTriggerWorkflow(data, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useBulkTriggerWorkflow = (options, queryClient) => {
  const mutationOptions = getBulkTriggerWorkflowMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const cancelExecution = (executionId, cancelExecutionBody, params, options, signal) => {
  return executeFetch(
    {
      url: `/api/workflow/cancel/execution/${encodeURIComponent(String(executionId))}`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: cancelExecutionBody,
      params,
      signal
    },
    options
  );
};
const getCancelExecutionMutationOptions = (options) => {
  const mutationKey = ["cancelExecution"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { executionId, data, params } = props ?? {};
    return cancelExecution(executionId, data, params, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useCancelExecution = (options, queryClient) => {
  const mutationOptions = getCancelExecutionMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const executeWorkflowNode = (executeWorkflowNodeRequest, options, signal) => {
  return executeFetch(
    {
      url: `/api/workflow/execute/node`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: executeWorkflowNodeRequest,
      signal
    },
    options
  );
};
const getExecuteWorkflowNodeQueryKey = (executeWorkflowNodeRequest) => {
  return [`/api/workflow/execute/node`, executeWorkflowNodeRequest];
};
const getExecuteWorkflowNodeQueryOptions = (executeWorkflowNodeRequest, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getExecuteWorkflowNodeQueryKey(executeWorkflowNodeRequest);
  const queryFn = ({ signal, meta }) => executeWorkflowNode(
    executeWorkflowNodeRequest,
    { ...requestOptions, meta },
    signal
  );
  return { queryKey, queryFn, ...queryOptions };
};
function useExecuteWorkflowNode(executeWorkflowNodeRequest, options, queryClient) {
  const queryOptions = getExecuteWorkflowNodeQueryOptions(
    executeWorkflowNodeRequest,
    options
  );
  const query = useQuery(queryOptions, queryClient);
  query.queryKey = queryOptions.queryKey;
  return query;
}
const prefetchExecuteWorkflowNode = async (queryClient, executeWorkflowNodeRequest, options) => {
  const queryOptions = getExecuteWorkflowNodeQueryOptions(
    executeWorkflowNodeRequest,
    options
  );
  await queryClient.prefetchQuery(queryOptions);
  return queryClient;
};
const executeWorkflowNodeMultipartFormData = (executeWorkflowNodeMultipartFormDataBody, options, signal) => {
  const formData = new FormData();
  if (executeWorkflowNodeMultipartFormDataBody.request !== void 0) {
    formData.append(
      `request`,
      JSON.stringify(executeWorkflowNodeMultipartFormDataBody.request)
    );
  }
  return executeFetch(
    {
      url: `/api/workflow/execute/node/multipart`,
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
      signal
    },
    options
  );
};
const getExecuteWorkflowNodeMultipartFormDataMutationOptions = (options) => {
  const mutationKey = ["executeWorkflowNodeMultipartFormData"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { data } = props ?? {};
    return executeWorkflowNodeMultipartFormData(data, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useExecuteWorkflowNodeMultipartFormData = (options, queryClient) => {
  const mutationOptions = getExecuteWorkflowNodeMultipartFormDataMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const runGetSchema = (executeWorkflowNodeRequest, options, signal) => {
  return executeFetch(
    {
      url: `/api/workflow/execute/node/rungetschema`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: executeWorkflowNodeRequest,
      signal
    },
    options
  );
};
const getRunGetSchemaMutationOptions = (options) => {
  const mutationKey = ["runGetSchema"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { data } = props ?? {};
    return runGetSchema(data, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useRunGetSchema = (options, queryClient) => {
  const mutationOptions = getRunGetSchemaMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const executeWorkflowNodeSse = (executeWorkflowNodeRequest, options, signal) => {
  return executeFetch(
    {
      url: `/api/workflow/execute/node/sse`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: executeWorkflowNodeRequest,
      signal
    },
    options
  );
};
const getExecuteWorkflowNodeSseQueryKey = (executeWorkflowNodeRequest) => {
  return [
    `/api/workflow/execute/node/sse`,
    executeWorkflowNodeRequest
  ];
};
const getExecuteWorkflowNodeSseQueryOptions = (executeWorkflowNodeRequest, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getExecuteWorkflowNodeSseQueryKey(executeWorkflowNodeRequest);
  const queryFn = ({ signal, meta }) => executeWorkflowNodeSse(
    executeWorkflowNodeRequest,
    { ...requestOptions, meta },
    signal
  );
  return { queryKey, queryFn, ...queryOptions };
};
function useExecuteWorkflowNodeSse(executeWorkflowNodeRequest, options, queryClient) {
  const queryOptions = getExecuteWorkflowNodeSseQueryOptions(
    executeWorkflowNodeRequest,
    options
  );
  const query = useQuery(queryOptions, queryClient);
  query.queryKey = queryOptions.queryKey;
  return query;
}
const prefetchExecuteWorkflowNodeSse = async (queryClient, executeWorkflowNodeRequest, options) => {
  const queryOptions = getExecuteWorkflowNodeSseQueryOptions(
    executeWorkflowNodeRequest,
    options
  );
  await queryClient.prefetchQuery(queryOptions);
  return queryClient;
};
const executeWorkflowNodes = (executeWorkflowNodeRequest, options, signal) => {
  return executeFetch(
    {
      url: `/api/workflow/execute/nodes`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: executeWorkflowNodeRequest,
      signal
    },
    options
  );
};
const getExecuteWorkflowNodesQueryKey = (executeWorkflowNodeRequest) => {
  return [`/api/workflow/execute/nodes`, executeWorkflowNodeRequest];
};
const getExecuteWorkflowNodesQueryOptions = (executeWorkflowNodeRequest, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getExecuteWorkflowNodesQueryKey(executeWorkflowNodeRequest);
  const queryFn = ({ signal, meta }) => executeWorkflowNodes(
    executeWorkflowNodeRequest,
    { ...requestOptions, meta },
    signal
  );
  return { queryKey, queryFn, ...queryOptions };
};
function useExecuteWorkflowNodes(executeWorkflowNodeRequest, options, queryClient) {
  const queryOptions = getExecuteWorkflowNodesQueryOptions(
    executeWorkflowNodeRequest,
    options
  );
  const query = useQuery(queryOptions, queryClient);
  query.queryKey = queryOptions.queryKey;
  return query;
}
const prefetchExecuteWorkflowNodes = async (queryClient, executeWorkflowNodeRequest, options) => {
  const queryOptions = getExecuteWorkflowNodesQueryOptions(
    executeWorkflowNodeRequest,
    options
  );
  await queryClient.prefetchQuery(queryOptions);
  return queryClient;
};
const reTriggerExecution = (repeatExecutionRequest, options, signal) => {
  return executeFetch(
    {
      url: `/api/workflow/re-trigger-execution`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: repeatExecutionRequest,
      signal
    },
    options
  );
};
const getReTriggerExecutionMutationOptions = (options) => {
  const mutationKey = ["reTriggerExecution"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { data } = props ?? {};
    return reTriggerExecution(data, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useReTriggerExecution = (options, queryClient) => {
  const mutationOptions = getReTriggerExecutionMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const triggerWorkflow = (executeWorkflowRequest, options, signal) => {
  return executeFetch(
    {
      url: `/api/workflow/trigger`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: executeWorkflowRequest,
      signal
    },
    options
  );
};
const getTriggerWorkflowMutationOptions = (options) => {
  const mutationKey = ["triggerWorkflow"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { data } = props ?? {};
    return triggerWorkflow(data, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useTriggerWorkflow = (options, queryClient) => {
  const mutationOptions = getTriggerWorkflowMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const useGetMutationMeta = () => {
  const queryClient = useQueryClient();
  const meta = queryClient.getDefaultOptions().mutations?.meta;
  return meta;
};
const getExecuteWorkflowNodeMutationOptions = (options) => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};
  const mutationFn = ({
    data
  }) => executeWorkflowNode(data, requestOptions);
  return { mutationFn, ...mutationOptions };
};
const useExecuteWorkflowNodeMutation = (options) => {
  const meta = useGetMutationMeta();
  const optionsWithMeta = {
    ...options,
    request: {
      ...options?.request,
      meta: { ...meta, ...options?.request?.meta }
    }
  };
  return useMutation(getExecuteWorkflowNodeMutationOptions(optionsWithMeta));
};
export {
  useCancelExecution as A,
  useExecuteWorkflowNode as B,
  useExecuteWorkflowNodeMultipartFormData as C,
  useExecuteWorkflowNodeMutation as D,
  useExecuteWorkflowNodeSse as E,
  useExecuteWorkflowNodes as F,
  useReTriggerExecution as G,
  useRunGetSchema as H,
  useTriggerWorkflow as I,
  executeWorkflowNodeMultipartFormData as a,
  bulkTriggerWorkflow as b,
  cancelExecution as c,
  executeWorkflowNodeSse as d,
  executeWorkflowNode as e,
  executeWorkflowNodes as f,
  getBulkTriggerWorkflowMutationOptions as g,
  getCancelExecutionMutationOptions as h,
  getExecuteWorkflowNodeMultipartFormDataMutationOptions as i,
  getExecuteWorkflowNodeMutationOptions as j,
  getExecuteWorkflowNodeQueryKey as k,
  getExecuteWorkflowNodeQueryOptions as l,
  getExecuteWorkflowNodeSseQueryKey as m,
  getExecuteWorkflowNodeSseQueryOptions as n,
  getExecuteWorkflowNodesQueryKey as o,
  getExecuteWorkflowNodesQueryOptions as p,
  getReTriggerExecutionMutationOptions as q,
  getRunGetSchemaMutationOptions as r,
  getTriggerWorkflowMutationOptions as s,
  prefetchExecuteWorkflowNode as t,
  prefetchExecuteWorkflowNodeSse as u,
  prefetchExecuteWorkflowNodes as v,
  reTriggerExecution as w,
  runGetSchema as x,
  triggerWorkflow as y,
  useBulkTriggerWorkflow as z
};
