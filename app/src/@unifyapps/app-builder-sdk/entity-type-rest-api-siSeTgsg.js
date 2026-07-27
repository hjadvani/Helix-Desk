import { useMutation, useQuery } from "@tanstack/react-query";
import { e as executeFetch } from "./fetch-DfbrtxWN.js";
const createEntity = (entity, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: entity,
      signal
    },
    options
  );
};
const getCreateEntityMutationOptions = (options) => {
  const mutationKey = ["createEntity"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { data } = props ?? {};
    return createEntity(data, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useCreateEntity = (options, queryClient) => {
  const mutationOptions = getCreateEntityMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const saveAndDeployEntity = (entity, params, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/action/saveAndDeploy`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: entity,
      params,
      signal
    },
    options
  );
};
const getSaveAndDeployEntityMutationOptions = (options) => {
  const mutationKey = ["saveAndDeployEntity"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { data, params } = props ?? {};
    return saveAndDeployEntity(data, params, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useSaveAndDeployEntity = (options, queryClient) => {
  const mutationOptions = getSaveAndDeployEntityMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const bulkFetchEntities = (entityBulkFetchRequest, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/bulk-fetch`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: entityBulkFetchRequest,
      signal
    },
    options
  );
};
const getBulkFetchEntitiesMutationOptions = (options) => {
  const mutationKey = ["bulkFetchEntities"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { data } = props ?? {};
    return bulkFetchEntities(data, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useBulkFetchEntities = (options, queryClient) => {
  const mutationOptions = getBulkFetchEntitiesMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const bulkFetchEntitySnapshots = (entityBulkFetchRequest, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/deployed/bulk-fetch-snapshots`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: entityBulkFetchRequest,
      signal
    },
    options
  );
};
const getBulkFetchEntitySnapshotsQueryKey = (entityBulkFetchRequest) => {
  return [
    `/api/entity/deployed/bulk-fetch-snapshots`,
    entityBulkFetchRequest
  ];
};
const getBulkFetchEntitySnapshotsQueryOptions = (entityBulkFetchRequest, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getBulkFetchEntitySnapshotsQueryKey(entityBulkFetchRequest);
  const queryFn = ({ signal, meta }) => bulkFetchEntitySnapshots(
    entityBulkFetchRequest,
    { ...requestOptions, meta },
    signal
  );
  return { queryKey, queryFn, ...queryOptions };
};
function useBulkFetchEntitySnapshots(entityBulkFetchRequest, options, queryClient) {
  const queryOptions = getBulkFetchEntitySnapshotsQueryOptions(
    entityBulkFetchRequest,
    options
  );
  const query = useQuery(queryOptions, queryClient);
  query.queryKey = queryOptions.queryKey;
  return query;
}
const prefetchBulkFetchEntitySnapshots = async (queryClient, entityBulkFetchRequest, options) => {
  const queryOptions = getBulkFetchEntitySnapshotsQueryOptions(
    entityBulkFetchRequest,
    options
  );
  await queryClient.prefetchQuery(queryOptions);
  return queryClient;
};
const createEntityAndGetViolations = (entity, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/checkAndCreate`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: entity,
      signal
    },
    options
  );
};
const getCreateEntityAndGetViolationsMutationOptions = (options) => {
  const mutationKey = ["createEntityAndGetViolations"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { data } = props ?? {};
    return createEntityAndGetViolations(data, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useCreateEntityAndGetViolations = (options, queryClient) => {
  const mutationOptions = getCreateEntityAndGetViolationsMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const updateEntityAndGetViolations = (entity, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/checkAndUpdate`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: entity,
      signal
    },
    options
  );
};
const getUpdateEntityAndGetViolationsMutationOptions = (options) => {
  const mutationKey = ["updateEntityAndGetViolations"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { data } = props ?? {};
    return updateEntityAndGetViolations(data, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useUpdateEntityAndGetViolations = (options, queryClient) => {
  const mutationOptions = getUpdateEntityAndGetViolationsMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const searchChildEntities = (childEntitiesSearchRequest, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/child-entities`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: childEntitiesSearchRequest,
      signal
    },
    options
  );
};
const getSearchChildEntitiesQueryKey = (childEntitiesSearchRequest) => {
  return [`/api/entity/child-entities`, childEntitiesSearchRequest];
};
const getSearchChildEntitiesQueryOptions = (childEntitiesSearchRequest, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getSearchChildEntitiesQueryKey(childEntitiesSearchRequest);
  const queryFn = ({ signal, meta }) => searchChildEntities(
    childEntitiesSearchRequest,
    { ...requestOptions, meta },
    signal
  );
  return { queryKey, queryFn, ...queryOptions };
};
function useSearchChildEntities(childEntitiesSearchRequest, options, queryClient) {
  const queryOptions = getSearchChildEntitiesQueryOptions(
    childEntitiesSearchRequest,
    options
  );
  const query = useQuery(queryOptions, queryClient);
  query.queryKey = queryOptions.queryKey;
  return query;
}
const prefetchSearchChildEntities = async (queryClient, childEntitiesSearchRequest, options) => {
  const queryOptions = getSearchChildEntitiesQueryOptions(
    childEntitiesSearchRequest,
    options
  );
  await queryClient.prefetchQuery(queryOptions);
  return queryClient;
};
const cloneEntity = (entityType, entityId, cloneEntityRequest, params, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/clone/${encodeURIComponent(String(entityType))}/${encodeURIComponent(String(entityId))}`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: cloneEntityRequest,
      params,
      signal
    },
    options
  );
};
const getCloneEntityMutationOptions = (options) => {
  const mutationKey = ["cloneEntity"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { entityType, entityId, data, params } = props ?? {};
    return cloneEntity(entityType, entityId, data, params, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useCloneEntity = (options, queryClient) => {
  const mutationOptions = getCloneEntityMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const copyEntity = (entityCopyRequest, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/copyEntity`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: entityCopyRequest,
      signal
    },
    options
  );
};
const getCopyEntityMutationOptions = (options) => {
  const mutationKey = ["copyEntity"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { data } = props ?? {};
    return copyEntity(data, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useCopyEntity = (options, queryClient) => {
  const mutationOptions = getCopyEntityMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const countActivitiesAfterLastPublish = (entityType, entityId, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/count-activities-after-last-publish/${encodeURIComponent(String(entityType))}/${encodeURIComponent(String(entityId))}`,
      method: "GET",
      signal
    },
    options
  );
};
const getCountActivitiesAfterLastPublishQueryKey = (entityType, entityId) => {
  return [
    `/api/entity/count-activities-after-last-publish/${entityType}/${entityId}`
  ];
};
const getCountActivitiesAfterLastPublishQueryOptions = (entityType, entityId, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getCountActivitiesAfterLastPublishQueryKey(entityType, entityId);
  const queryFn = ({ signal, meta }) => countActivitiesAfterLastPublish(
    entityType,
    entityId,
    { ...requestOptions, meta },
    signal
  );
  return {
    queryKey,
    queryFn,
    enabled: !!(entityType && entityId),
    ...queryOptions
  };
};
function useCountActivitiesAfterLastPublish(entityType, entityId, options, queryClient) {
  const queryOptions = getCountActivitiesAfterLastPublishQueryOptions(
    entityType,
    entityId,
    options
  );
  const query = useQuery(queryOptions, queryClient);
  query.queryKey = queryOptions.queryKey;
  return query;
}
const prefetchCountActivitiesAfterLastPublish = async (queryClient, entityType, entityId, options) => {
  const queryOptions = getCountActivitiesAfterLastPublishQueryOptions(
    entityType,
    entityId,
    options
  );
  await queryClient.prefetchQuery(queryOptions);
  return queryClient;
};
const createUpdateOrDeleteHierarchicalEntity = (hierarchicalEntityMutationRequest, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/create-update-or-delete/hierarchical`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: hierarchicalEntityMutationRequest,
      signal
    },
    options
  );
};
const getCreateUpdateOrDeleteHierarchicalEntityMutationOptions = (options) => {
  const mutationKey = ["createUpdateOrDeleteHierarchicalEntity"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { data } = props ?? {};
    return createUpdateOrDeleteHierarchicalEntity(data, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useCreateUpdateOrDeleteHierarchicalEntity = (options, queryClient) => {
  const mutationOptions = getCreateUpdateOrDeleteHierarchicalEntityMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const bulkCreateUpdateOrDeleteHierarchicalEntity = (bulkHierarchicalEntityMutationRequest, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/create-update-or-delete/hierarchical/bulk`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: bulkHierarchicalEntityMutationRequest,
      signal
    },
    options
  );
};
const getBulkCreateUpdateOrDeleteHierarchicalEntityMutationOptions = (options) => {
  const mutationKey = ["bulkCreateUpdateOrDeleteHierarchicalEntity"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { data } = props ?? {};
    return bulkCreateUpdateOrDeleteHierarchicalEntity(data, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useBulkCreateUpdateOrDeleteHierarchicalEntity = (options, queryClient) => {
  const mutationOptions = getBulkCreateUpdateOrDeleteHierarchicalEntityMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const deleteEntityAndReplaceParentReferences = (parentEntityType, childEntityType, childEntityId, newReferenceId, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/deleteEntityAndReplaceParentReferences/${encodeURIComponent(String(parentEntityType))}/${encodeURIComponent(String(childEntityType))}/${encodeURIComponent(String(childEntityId))}/${encodeURIComponent(String(newReferenceId))}`,
      method: "POST",
      signal
    },
    options
  );
};
const getDeleteEntityAndReplaceParentReferencesMutationOptions = (options) => {
  const mutationKey = ["deleteEntityAndReplaceParentReferences"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { parentEntityType, childEntityType, childEntityId, newReferenceId } = props ?? {};
    return deleteEntityAndReplaceParentReferences(
      parentEntityType,
      childEntityType,
      childEntityId,
      newReferenceId,
      { ...requestOptions, meta: { ...context.meta, ...requestOptions?.meta } }
    );
  };
  return { mutationFn, ...mutationOptions };
};
const useDeleteEntityAndReplaceParentReferences = (options, queryClient) => {
  const mutationOptions = getDeleteEntityAndReplaceParentReferencesMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const deployedBulkFetchEntities = (deployedEntityBulkFetchRequest, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/deployed/bulk-fetch`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: deployedEntityBulkFetchRequest,
      signal
    },
    options
  );
};
const getDeployedBulkFetchEntitiesMutationOptions = (options) => {
  const mutationKey = ["deployedBulkFetchEntities"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { data } = props ?? {};
    return deployedBulkFetchEntities(data, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useDeployedBulkFetchEntities = (options, queryClient) => {
  const mutationOptions = getDeployedBulkFetchEntitiesMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const searchDeployedChildEntities = (childEntitiesSearchRequest, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/deployed/child-entities`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: childEntitiesSearchRequest,
      signal
    },
    options
  );
};
const getSearchDeployedChildEntitiesQueryKey = (childEntitiesSearchRequest) => {
  return [
    `/api/entity/deployed/child-entities`,
    childEntitiesSearchRequest
  ];
};
const getSearchDeployedChildEntitiesQueryOptions = (childEntitiesSearchRequest, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getSearchDeployedChildEntitiesQueryKey(childEntitiesSearchRequest);
  const queryFn = ({ signal, meta }) => searchDeployedChildEntities(
    childEntitiesSearchRequest,
    { ...requestOptions, meta },
    signal
  );
  return { queryKey, queryFn, ...queryOptions };
};
function useSearchDeployedChildEntities(childEntitiesSearchRequest, options, queryClient) {
  const queryOptions = getSearchDeployedChildEntitiesQueryOptions(
    childEntitiesSearchRequest,
    options
  );
  const query = useQuery(queryOptions, queryClient);
  query.queryKey = queryOptions.queryKey;
  return query;
}
const prefetchSearchDeployedChildEntities = async (queryClient, childEntitiesSearchRequest, options) => {
  const queryOptions = getSearchDeployedChildEntitiesQueryOptions(
    childEntitiesSearchRequest,
    options
  );
  await queryClient.prefetchQuery(queryOptions);
  return queryClient;
};
const fetchDeployedEmbeddedDependents = (entityType, entityId, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/deployed/embedded-dependents/${encodeURIComponent(String(entityType))}/${encodeURIComponent(String(entityId))}`,
      method: "GET",
      signal
    },
    options
  );
};
const getFetchDeployedEmbeddedDependentsQueryKey = (entityType, entityId) => {
  return [
    `/api/entity/deployed/embedded-dependents/${entityType}/${entityId}`
  ];
};
const getFetchDeployedEmbeddedDependentsQueryOptions = (entityType, entityId, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getFetchDeployedEmbeddedDependentsQueryKey(entityType, entityId);
  const queryFn = ({ signal, meta }) => fetchDeployedEmbeddedDependents(
    entityType,
    entityId,
    { ...requestOptions, meta },
    signal
  );
  return {
    queryKey,
    queryFn,
    enabled: !!(entityType && entityId),
    ...queryOptions
  };
};
function useFetchDeployedEmbeddedDependents(entityType, entityId, options, queryClient) {
  const queryOptions = getFetchDeployedEmbeddedDependentsQueryOptions(
    entityType,
    entityId,
    options
  );
  const query = useQuery(queryOptions, queryClient);
  query.queryKey = queryOptions.queryKey;
  return query;
}
const prefetchFetchDeployedEmbeddedDependents = async (queryClient, entityType, entityId, options) => {
  const queryOptions = getFetchDeployedEmbeddedDependentsQueryOptions(
    entityType,
    entityId,
    options
  );
  await queryClient.prefetchQuery(queryOptions);
  return queryClient;
};
const searchDeployedEmbeddedEntities = (embeddedEntitiesSearchRequest, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/deployed/embedded-entities`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: embeddedEntitiesSearchRequest,
      signal
    },
    options
  );
};
const getSearchDeployedEmbeddedEntitiesQueryKey = (embeddedEntitiesSearchRequest) => {
  return [
    `/api/entity/deployed/embedded-entities`,
    embeddedEntitiesSearchRequest
  ];
};
const getSearchDeployedEmbeddedEntitiesQueryOptions = (embeddedEntitiesSearchRequest, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getSearchDeployedEmbeddedEntitiesQueryKey(embeddedEntitiesSearchRequest);
  const queryFn = ({ signal, meta }) => searchDeployedEmbeddedEntities(
    embeddedEntitiesSearchRequest,
    { ...requestOptions, meta },
    signal
  );
  return { queryKey, queryFn, ...queryOptions };
};
function useSearchDeployedEmbeddedEntities(embeddedEntitiesSearchRequest, options, queryClient) {
  const queryOptions = getSearchDeployedEmbeddedEntitiesQueryOptions(
    embeddedEntitiesSearchRequest,
    options
  );
  const query = useQuery(queryOptions, queryClient);
  query.queryKey = queryOptions.queryKey;
  return query;
}
const prefetchSearchDeployedEmbeddedEntities = async (queryClient, embeddedEntitiesSearchRequest, options) => {
  const queryOptions = getSearchDeployedEmbeddedEntitiesQueryOptions(
    embeddedEntitiesSearchRequest,
    options
  );
  await queryClient.prefetchQuery(queryOptions);
  return queryClient;
};
const getDeployedEntityDependency = (entityDependencyRequest, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/deployed/entity-dependency`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: entityDependencyRequest,
      signal
    },
    options
  );
};
const getGetDeployedEntityDependencyQueryKey = (entityDependencyRequest) => {
  return [
    `/api/entity/deployed/entity-dependency`,
    entityDependencyRequest
  ];
};
const getGetDeployedEntityDependencyQueryOptions = (entityDependencyRequest, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetDeployedEntityDependencyQueryKey(entityDependencyRequest);
  const queryFn = ({ signal, meta }) => getDeployedEntityDependency(
    entityDependencyRequest,
    { ...requestOptions, meta },
    signal
  );
  return { queryKey, queryFn, ...queryOptions };
};
function useGetDeployedEntityDependency(entityDependencyRequest, options, queryClient) {
  const queryOptions = getGetDeployedEntityDependencyQueryOptions(
    entityDependencyRequest,
    options
  );
  const query = useQuery(queryOptions, queryClient);
  query.queryKey = queryOptions.queryKey;
  return query;
}
const prefetchGetDeployedEntityDependency = async (queryClient, entityDependencyRequest, options) => {
  const queryOptions = getGetDeployedEntityDependencyQueryOptions(
    entityDependencyRequest,
    options
  );
  await queryClient.prefetchQuery(queryOptions);
  return queryClient;
};
const deployedEntityDependentsWithAssets = (entityDependentsWithAssetsRequest, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/deployed/entity-dependents-with-assets`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: entityDependentsWithAssetsRequest,
      signal
    },
    options
  );
};
const getDeployedEntityDependentsWithAssetsMutationOptions = (options) => {
  const mutationKey = ["deployedEntityDependentsWithAssets"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { data } = props ?? {};
    return deployedEntityDependentsWithAssets(data, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useDeployedEntityDependentsWithAssets = (options, queryClient) => {
  const mutationOptions = getDeployedEntityDependentsWithAssetsMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const getDeployedEntityDependencyTree = (entityType, entityId, version, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/deployed/entity-dependents/${encodeURIComponent(String(entityType))}/${encodeURIComponent(String(entityId))}/${encodeURIComponent(String(version))}`,
      method: "GET",
      signal
    },
    options
  );
};
const getGetDeployedEntityDependencyTreeQueryKey = (entityType, entityId, version) => {
  return [
    `/api/entity/deployed/entity-dependents/${entityType}/${entityId}/${version}`
  ];
};
const getGetDeployedEntityDependencyTreeQueryOptions = (entityType, entityId, version, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetDeployedEntityDependencyTreeQueryKey(entityType, entityId, version);
  const queryFn = ({ signal, meta }) => getDeployedEntityDependencyTree(
    entityType,
    entityId,
    version,
    { ...requestOptions, meta },
    signal
  );
  return {
    queryKey,
    queryFn,
    enabled: !!(entityType && entityId && version),
    ...queryOptions
  };
};
function useGetDeployedEntityDependencyTree(entityType, entityId, version, options, queryClient) {
  const queryOptions = getGetDeployedEntityDependencyTreeQueryOptions(
    entityType,
    entityId,
    version,
    options
  );
  const query = useQuery(queryOptions, queryClient);
  query.queryKey = queryOptions.queryKey;
  return query;
}
const prefetchGetDeployedEntityDependencyTree = async (queryClient, entityType, entityId, version, options) => {
  const queryOptions = getGetDeployedEntityDependencyTreeQueryOptions(
    entityType,
    entityId,
    version,
    options
  );
  await queryClient.prefetchQuery(queryOptions);
  return queryClient;
};
const getDeployedEntitySnapshot = (entityType, entityId, params, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/deployed/snapshot/${encodeURIComponent(String(entityType))}/${encodeURIComponent(String(entityId))}`,
      method: "GET",
      params,
      signal
    },
    options
  );
};
const getGetDeployedEntitySnapshotQueryKey = (entityType, entityId, params) => {
  return [
    `/api/entity/deployed/snapshot/${entityType}/${entityId}`,
    ...params ? [params] : []
  ];
};
const getGetDeployedEntitySnapshotQueryOptions = (entityType, entityId, params, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetDeployedEntitySnapshotQueryKey(entityType, entityId, params);
  const queryFn = ({ signal, meta }) => getDeployedEntitySnapshot(
    entityType,
    entityId,
    params,
    { ...requestOptions, meta },
    signal
  );
  return {
    queryKey,
    queryFn,
    enabled: !!(entityType && entityId),
    ...queryOptions
  };
};
function useGetDeployedEntitySnapshot(entityType, entityId, params, options, queryClient) {
  const queryOptions = getGetDeployedEntitySnapshotQueryOptions(
    entityType,
    entityId,
    params,
    options
  );
  const query = useQuery(queryOptions, queryClient);
  query.queryKey = queryOptions.queryKey;
  return query;
}
const prefetchGetDeployedEntitySnapshot = async (queryClient, entityType, entityId, params, options) => {
  const queryOptions = getGetDeployedEntitySnapshotQueryOptions(
    entityType,
    entityId,
    params,
    options
  );
  await queryClient.prefetchQuery(queryOptions);
  return queryClient;
};
const searchDeployedEntities = (entityType, query, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/deployed/${encodeURIComponent(String(entityType))}/search`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: query,
      signal
    },
    options
  );
};
const getSearchDeployedEntitiesQueryKey = (entityType, query) => {
  return [`/api/entity/deployed/${entityType}/search`, query];
};
const getSearchDeployedEntitiesQueryOptions = (entityType, query, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getSearchDeployedEntitiesQueryKey(entityType, query);
  const queryFn = ({ signal, meta }) => searchDeployedEntities(
    entityType,
    query,
    { ...requestOptions, meta },
    signal
  );
  return {
    queryKey,
    queryFn,
    enabled: !!entityType,
    ...queryOptions
  };
};
function useSearchDeployedEntities(entityType, query, options, queryClient) {
  const queryOptions = getSearchDeployedEntitiesQueryOptions(
    entityType,
    query,
    options
  );
  const _query = useQuery(queryOptions, queryClient);
  _query.queryKey = queryOptions.queryKey;
  return _query;
}
const prefetchSearchDeployedEntities = async (queryClient, entityType, query, options) => {
  const queryOptions = getSearchDeployedEntitiesQueryOptions(
    entityType,
    query,
    options
  );
  await queryClient.prefetchQuery(queryOptions);
  return queryClient;
};
const findDeployedEntityById = (entityType, entityId, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/deployed/${encodeURIComponent(String(entityType))}/${encodeURIComponent(String(entityId))}`,
      method: "GET",
      signal
    },
    options
  );
};
const getFindDeployedEntityByIdQueryKey = (entityType, entityId) => {
  return [`/api/entity/deployed/${entityType}/${entityId}`];
};
const getFindDeployedEntityByIdQueryOptions = (entityType, entityId, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getFindDeployedEntityByIdQueryKey(entityType, entityId);
  const queryFn = ({ signal, meta }) => findDeployedEntityById(
    entityType,
    entityId,
    { ...requestOptions, meta },
    signal
  );
  return {
    queryKey,
    queryFn,
    enabled: !!(entityType && entityId),
    ...queryOptions
  };
};
function useFindDeployedEntityById(entityType, entityId, options, queryClient) {
  const queryOptions = getFindDeployedEntityByIdQueryOptions(
    entityType,
    entityId,
    options
  );
  const query = useQuery(queryOptions, queryClient);
  query.queryKey = queryOptions.queryKey;
  return query;
}
const prefetchFindDeployedEntityById = async (queryClient, entityType, entityId, options) => {
  const queryOptions = getFindDeployedEntityByIdQueryOptions(
    entityType,
    entityId,
    options
  );
  await queryClient.prefetchQuery(queryOptions);
  return queryClient;
};
const detectFileColumns = (detectFileColumnsRequest, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/detectFileColumns`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: detectFileColumnsRequest,
      signal
    },
    options
  );
};
const getDetectFileColumnsMutationOptions = (options) => {
  const mutationKey = ["detectFileColumns"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { data } = props ?? {};
    return detectFileColumns(data, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useDetectFileColumns = (options, queryClient) => {
  const mutationOptions = getDetectFileColumnsMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const getDistinctValues = (entityDistinctValuesRequest, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/distinct-values`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: entityDistinctValuesRequest,
      signal
    },
    options
  );
};
const getGetDistinctValuesQueryKey = (entityDistinctValuesRequest) => {
  return [`/api/entity/distinct-values`, entityDistinctValuesRequest];
};
const getGetDistinctValuesQueryOptions = (entityDistinctValuesRequest, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetDistinctValuesQueryKey(entityDistinctValuesRequest);
  const queryFn = ({ signal, meta }) => getDistinctValues(
    entityDistinctValuesRequest,
    { ...requestOptions, meta },
    signal
  );
  return { queryKey, queryFn, ...queryOptions };
};
function useGetDistinctValues(entityDistinctValuesRequest, options, queryClient) {
  const queryOptions = getGetDistinctValuesQueryOptions(
    entityDistinctValuesRequest,
    options
  );
  const query = useQuery(queryOptions, queryClient);
  query.queryKey = queryOptions.queryKey;
  return query;
}
const prefetchGetDistinctValues = async (queryClient, entityDistinctValuesRequest, options) => {
  const queryOptions = getGetDistinctValuesQueryOptions(
    entityDistinctValuesRequest,
    options
  );
  await queryClient.prefetchQuery(queryOptions);
  return queryClient;
};
const fetchEmbeddedDependents = (entityType, entityId, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/embedded-dependents/${encodeURIComponent(String(entityType))}/${encodeURIComponent(String(entityId))}`,
      method: "GET",
      signal
    },
    options
  );
};
const getFetchEmbeddedDependentsQueryKey = (entityType, entityId) => {
  return [`/api/entity/embedded-dependents/${entityType}/${entityId}`];
};
const getFetchEmbeddedDependentsQueryOptions = (entityType, entityId, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getFetchEmbeddedDependentsQueryKey(entityType, entityId);
  const queryFn = ({ signal, meta }) => fetchEmbeddedDependents(
    entityType,
    entityId,
    { ...requestOptions, meta },
    signal
  );
  return {
    queryKey,
    queryFn,
    enabled: !!(entityType && entityId),
    ...queryOptions
  };
};
function useFetchEmbeddedDependents(entityType, entityId, options, queryClient) {
  const queryOptions = getFetchEmbeddedDependentsQueryOptions(
    entityType,
    entityId,
    options
  );
  const query = useQuery(queryOptions, queryClient);
  query.queryKey = queryOptions.queryKey;
  return query;
}
const prefetchFetchEmbeddedDependents = async (queryClient, entityType, entityId, options) => {
  const queryOptions = getFetchEmbeddedDependentsQueryOptions(
    entityType,
    entityId,
    options
  );
  await queryClient.prefetchQuery(queryOptions);
  return queryClient;
};
const searchEmbeddedEntities = (embeddedEntitiesSearchRequest, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/embedded-entities`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: embeddedEntitiesSearchRequest,
      signal
    },
    options
  );
};
const getSearchEmbeddedEntitiesQueryKey = (embeddedEntitiesSearchRequest) => {
  return [
    `/api/entity/embedded-entities`,
    embeddedEntitiesSearchRequest
  ];
};
const getSearchEmbeddedEntitiesQueryOptions = (embeddedEntitiesSearchRequest, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getSearchEmbeddedEntitiesQueryKey(embeddedEntitiesSearchRequest);
  const queryFn = ({ signal, meta }) => searchEmbeddedEntities(
    embeddedEntitiesSearchRequest,
    { ...requestOptions, meta },
    signal
  );
  return { queryKey, queryFn, ...queryOptions };
};
function useSearchEmbeddedEntities(embeddedEntitiesSearchRequest, options, queryClient) {
  const queryOptions = getSearchEmbeddedEntitiesQueryOptions(
    embeddedEntitiesSearchRequest,
    options
  );
  const query = useQuery(queryOptions, queryClient);
  query.queryKey = queryOptions.queryKey;
  return query;
}
const prefetchSearchEmbeddedEntities = async (queryClient, embeddedEntitiesSearchRequest, options) => {
  const queryOptions = getSearchEmbeddedEntitiesQueryOptions(
    embeddedEntitiesSearchRequest,
    options
  );
  await queryClient.prefetchQuery(queryOptions);
  return queryClient;
};
const getEntityDependency = (entityDependencyRequest, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/entity-dependency`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: entityDependencyRequest,
      signal
    },
    options
  );
};
const getGetEntityDependencyQueryKey = (entityDependencyRequest) => {
  return [`/api/entity/entity-dependency`, entityDependencyRequest];
};
const getGetEntityDependencyQueryOptions = (entityDependencyRequest, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetEntityDependencyQueryKey(entityDependencyRequest);
  const queryFn = ({ signal, meta }) => getEntityDependency(
    entityDependencyRequest,
    { ...requestOptions, meta },
    signal
  );
  return { queryKey, queryFn, ...queryOptions };
};
function useGetEntityDependency(entityDependencyRequest, options, queryClient) {
  const queryOptions = getGetEntityDependencyQueryOptions(
    entityDependencyRequest,
    options
  );
  const query = useQuery(queryOptions, queryClient);
  query.queryKey = queryOptions.queryKey;
  return query;
}
const prefetchGetEntityDependency = async (queryClient, entityDependencyRequest, options) => {
  const queryOptions = getGetEntityDependencyQueryOptions(
    entityDependencyRequest,
    options
  );
  await queryClient.prefetchQuery(queryOptions);
  return queryClient;
};
const entityDependentsWithAssets = (entityDependentsWithAssetsRequest, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/entity-dependents-with-assets`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: entityDependentsWithAssetsRequest,
      signal
    },
    options
  );
};
const getEntityDependentsWithAssetsMutationOptions = (options) => {
  const mutationKey = ["entityDependentsWithAssets"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { data } = props ?? {};
    return entityDependentsWithAssets(data, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useEntityDependentsWithAssets = (options, queryClient) => {
  const mutationOptions = getEntityDependentsWithAssetsMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const getEntityDependencyTree = (entityType, entityId, version, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/entity-dependents/${encodeURIComponent(String(entityType))}/${encodeURIComponent(String(entityId))}/${encodeURIComponent(String(version))}`,
      method: "GET",
      signal
    },
    options
  );
};
const getGetEntityDependencyTreeQueryKey = (entityType, entityId, version) => {
  return [
    `/api/entity/entity-dependents/${entityType}/${entityId}/${version}`
  ];
};
const getGetEntityDependencyTreeQueryOptions = (entityType, entityId, version, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetEntityDependencyTreeQueryKey(entityType, entityId, version);
  const queryFn = ({ signal, meta }) => getEntityDependencyTree(
    entityType,
    entityId,
    version,
    { ...requestOptions, meta },
    signal
  );
  return {
    queryKey,
    queryFn,
    enabled: !!(entityType && entityId && version),
    ...queryOptions
  };
};
function useGetEntityDependencyTree(entityType, entityId, version, options, queryClient) {
  const queryOptions = getGetEntityDependencyTreeQueryOptions(
    entityType,
    entityId,
    version,
    options
  );
  const query = useQuery(queryOptions, queryClient);
  query.queryKey = queryOptions.queryKey;
  return query;
}
const prefetchGetEntityDependencyTree = async (queryClient, entityType, entityId, version, options) => {
  const queryOptions = getGetEntityDependencyTreeQueryOptions(
    entityType,
    entityId,
    version,
    options
  );
  await queryClient.prefetchQuery(queryOptions);
  return queryClient;
};
const exportEntities = (entityExportRequest, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/exportEntities`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: entityExportRequest,
      signal
    },
    options
  );
};
const getExportEntitiesMutationOptions = (options) => {
  const mutationKey = ["exportEntities"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { data } = props ?? {};
    return exportEntities(data, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useExportEntities = (options, queryClient) => {
  const mutationOptions = getExportEntitiesMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const findCountOfParentLookupEntities = (parentEntityType, childEntityType, childEntityId, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/findCountOfParentLookupEntities/${encodeURIComponent(String(parentEntityType))}/${encodeURIComponent(String(childEntityType))}/${encodeURIComponent(String(childEntityId))}`,
      method: "GET",
      signal
    },
    options
  );
};
const getFindCountOfParentLookupEntitiesQueryKey = (parentEntityType, childEntityType, childEntityId) => {
  return [
    `/api/entity/findCountOfParentLookupEntities/${parentEntityType}/${childEntityType}/${childEntityId}`
  ];
};
const getFindCountOfParentLookupEntitiesQueryOptions = (parentEntityType, childEntityType, childEntityId, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getFindCountOfParentLookupEntitiesQueryKey(
    parentEntityType,
    childEntityType,
    childEntityId
  );
  const queryFn = ({ signal, meta }) => findCountOfParentLookupEntities(
    parentEntityType,
    childEntityType,
    childEntityId,
    { ...requestOptions, meta },
    signal
  );
  return {
    queryKey,
    queryFn,
    enabled: !!(parentEntityType && childEntityType && childEntityId),
    ...queryOptions
  };
};
function useFindCountOfParentLookupEntities(parentEntityType, childEntityType, childEntityId, options, queryClient) {
  const queryOptions = getFindCountOfParentLookupEntitiesQueryOptions(
    parentEntityType,
    childEntityType,
    childEntityId,
    options
  );
  const query = useQuery(queryOptions, queryClient);
  query.queryKey = queryOptions.queryKey;
  return query;
}
const prefetchFindCountOfParentLookupEntities = async (queryClient, parentEntityType, childEntityType, childEntityId, options) => {
  const queryOptions = getFindCountOfParentLookupEntitiesQueryOptions(
    parentEntityType,
    childEntityType,
    childEntityId,
    options
  );
  await queryClient.prefetchQuery(queryOptions);
  return queryClient;
};
const findParentLookupEntities = (parentEntityType, childEntityType, childEntityId, findParentLookupEntitiesBody, params, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/findParentLookupEntities/${encodeURIComponent(String(parentEntityType))}/${encodeURIComponent(String(childEntityType))}/${encodeURIComponent(String(childEntityId))}`,
      method: "GET",
      headers: { "Content-Type": "application/json" },
      params,
      signal
    },
    options
  );
};
const getFindParentLookupEntitiesQueryKey = (parentEntityType, childEntityType, childEntityId, findParentLookupEntitiesBody, params) => {
  return [
    `/api/entity/findParentLookupEntities/${parentEntityType}/${childEntityType}/${childEntityId}`,
    ...params ? [params] : [],
    findParentLookupEntitiesBody
  ];
};
const getFindParentLookupEntitiesQueryOptions = (parentEntityType, childEntityType, childEntityId, findParentLookupEntitiesBody, params, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getFindParentLookupEntitiesQueryKey(
    parentEntityType,
    childEntityType,
    childEntityId,
    findParentLookupEntitiesBody,
    params
  );
  const queryFn = ({ signal, meta }) => findParentLookupEntities(
    parentEntityType,
    childEntityType,
    childEntityId,
    findParentLookupEntitiesBody,
    params,
    { ...requestOptions, meta },
    signal
  );
  return {
    queryKey,
    queryFn,
    enabled: !!(parentEntityType && childEntityType && childEntityId),
    ...queryOptions
  };
};
function useFindParentLookupEntities(parentEntityType, childEntityType, childEntityId, findParentLookupEntitiesBody, params, options, queryClient) {
  const queryOptions = getFindParentLookupEntitiesQueryOptions(
    parentEntityType,
    childEntityType,
    childEntityId,
    findParentLookupEntitiesBody,
    params,
    options
  );
  const query = useQuery(queryOptions, queryClient);
  query.queryKey = queryOptions.queryKey;
  return query;
}
const prefetchFindParentLookupEntities = async (queryClient, parentEntityType, childEntityType, childEntityId, findParentLookupEntitiesBody, params, options) => {
  const queryOptions = getFindParentLookupEntitiesQueryOptions(
    parentEntityType,
    childEntityType,
    childEntityId,
    findParentLookupEntitiesBody,
    params,
    options
  );
  await queryClient.prefetchQuery(queryOptions);
  return queryClient;
};
const getImportFieldMapping = (importFieldMappingRequest, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/getImportFieldMapping`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: importFieldMappingRequest,
      signal
    },
    options
  );
};
const getGetImportFieldMappingQueryKey = (importFieldMappingRequest) => {
  return [
    `/api/entity/getImportFieldMapping`,
    importFieldMappingRequest
  ];
};
const getGetImportFieldMappingQueryOptions = (importFieldMappingRequest, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetImportFieldMappingQueryKey(importFieldMappingRequest);
  const queryFn = ({ signal, meta }) => getImportFieldMapping(
    importFieldMappingRequest,
    { ...requestOptions, meta },
    signal
  );
  return { queryKey, queryFn, ...queryOptions };
};
function useGetImportFieldMapping(importFieldMappingRequest, options, queryClient) {
  const queryOptions = getGetImportFieldMappingQueryOptions(
    importFieldMappingRequest,
    options
  );
  const query = useQuery(queryOptions, queryClient);
  query.queryKey = queryOptions.queryKey;
  return query;
}
const prefetchGetImportFieldMapping = async (queryClient, importFieldMappingRequest, options) => {
  const queryOptions = getGetImportFieldMappingQueryOptions(
    importFieldMappingRequest,
    options
  );
  await queryClient.prefetchQuery(queryOptions);
  return queryClient;
};
const importEntities = (entityImportRequest, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/importEntities`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: entityImportRequest,
      signal
    },
    options
  );
};
const getImportEntitiesMutationOptions = (options) => {
  const mutationKey = ["importEntities"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { data } = props ?? {};
    return importEntities(data, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useImportEntities = (options, queryClient) => {
  const mutationOptions = getImportEntitiesMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const getLatestVersion = (entityType, entityId, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/latest-version/${encodeURIComponent(String(entityType))}/${encodeURIComponent(String(entityId))}`,
      method: "GET",
      signal
    },
    options
  );
};
const getGetLatestVersionQueryKey = (entityType, entityId) => {
  return [`/api/entity/latest-version/${entityType}/${entityId}`];
};
const getGetLatestVersionQueryOptions = (entityType, entityId, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetLatestVersionQueryKey(entityType, entityId);
  const queryFn = ({ signal, meta }) => getLatestVersion(entityType, entityId, { ...requestOptions, meta }, signal);
  return {
    queryKey,
    queryFn,
    enabled: !!(entityType && entityId),
    ...queryOptions
  };
};
function useGetLatestVersion(entityType, entityId, options, queryClient) {
  const queryOptions = getGetLatestVersionQueryOptions(
    entityType,
    entityId,
    options
  );
  const query = useQuery(queryOptions, queryClient);
  query.queryKey = queryOptions.queryKey;
  return query;
}
const prefetchGetLatestVersion = async (queryClient, entityType, entityId, options) => {
  const queryOptions = getGetLatestVersionQueryOptions(
    entityType,
    entityId,
    options
  );
  await queryClient.prefetchQuery(queryOptions);
  return queryClient;
};
const mutateEntityId = (entityType, existingEntityId, newEntityId, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/mutateEntityId/${encodeURIComponent(String(entityType))}/${encodeURIComponent(String(existingEntityId))}/${encodeURIComponent(String(newEntityId))}`,
      method: "POST",
      signal
    },
    options
  );
};
const getMutateEntityIdMutationOptions = (options) => {
  const mutationKey = ["mutateEntityId"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { entityType, existingEntityId, newEntityId } = props ?? {};
    return mutateEntityId(entityType, existingEntityId, newEntityId, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useMutateEntityId = (options, queryClient) => {
  const mutationOptions = getMutateEntityIdMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const parseColumn = (entityImportRequest, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/parseColumn`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: entityImportRequest,
      signal
    },
    options
  );
};
const getParseColumnMutationOptions = (options) => {
  const mutationKey = ["parseColumn"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { data } = props ?? {};
    return parseColumn(data, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useParseColumn = (options, queryClient) => {
  const mutationOptions = getParseColumnMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const parseColumnNames = (entityImportRequest, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/parseColumnNames`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: entityImportRequest,
      signal
    },
    options
  );
};
const getParseColumnNamesMutationOptions = (options) => {
  const mutationKey = ["parseColumnNames"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { data } = props ?? {};
    return parseColumnNames(data, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useParseColumnNames = (options, queryClient) => {
  const mutationOptions = getParseColumnNamesMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const parseColumnNamesInline = (entityImportRequest, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/parseColumnNamesInline`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: entityImportRequest,
      signal
    },
    options
  );
};
const getParseColumnNamesInlineMutationOptions = (options) => {
  const mutationKey = ["parseColumnNamesInline"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { data } = props ?? {};
    return parseColumnNamesInline(data, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useParseColumnNamesInline = (options, queryClient) => {
  const mutationOptions = getParseColumnNamesInlineMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const parseColumnNamesWithType = (entityImportRequest, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/parseColumnNamesWithType`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: entityImportRequest,
      signal
    },
    options
  );
};
const getParseColumnNamesWithTypeMutationOptions = (options) => {
  const mutationKey = ["parseColumnNamesWithType"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { data } = props ?? {};
    return parseColumnNamesWithType(data, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useParseColumnNamesWithType = (options, queryClient) => {
  const mutationOptions = getParseColumnNamesWithTypeMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const previewImport = (entityImportRequest, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/previewImport`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: entityImportRequest,
      signal
    },
    options
  );
};
const getPreviewImportMutationOptions = (options) => {
  const mutationKey = ["previewImport"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { data } = props ?? {};
    return previewImport(data, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const usePreviewImport = (options, queryClient) => {
  const mutationOptions = getPreviewImportMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const restoreEntityFromDeployed = (entityType, entityId, version, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/restore/deployed/${encodeURIComponent(String(entityType))}/${encodeURIComponent(String(entityId))}/${encodeURIComponent(String(version))}`,
      method: "POST",
      signal
    },
    options
  );
};
const getRestoreEntityFromDeployedMutationOptions = (options) => {
  const mutationKey = ["restoreEntityFromDeployed"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { entityType, entityId, version } = props ?? {};
    return restoreEntityFromDeployed(entityType, entityId, version, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useRestoreEntityFromDeployed = (options, queryClient) => {
  const mutationOptions = getRestoreEntityFromDeployedMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const restoreEntity = (entityType, entityId, version, params, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/restore/${encodeURIComponent(String(entityType))}/${encodeURIComponent(String(entityId))}/${encodeURIComponent(String(version))}`,
      method: "POST",
      params,
      signal
    },
    options
  );
};
const getRestoreEntityMutationOptions = (options) => {
  const mutationKey = ["restoreEntity"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { entityType, entityId, version, params } = props ?? {};
    return restoreEntity(entityType, entityId, version, params, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useRestoreEntity = (options, queryClient) => {
  const mutationOptions = getRestoreEntityMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const searchEntitySnapshot = (entityType, query, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/snapshot/${encodeURIComponent(String(entityType))}/search`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: query,
      signal
    },
    options
  );
};
const getSearchEntitySnapshotMutationOptions = (options) => {
  const mutationKey = ["searchEntitySnapshot"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { entityType, data } = props ?? {};
    return searchEntitySnapshot(entityType, data, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useSearchEntitySnapshot = (options, queryClient) => {
  const mutationOptions = getSearchEntitySnapshotMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const getEntitySnapshot = (entityType, entityId, params, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/snapshot/${encodeURIComponent(String(entityType))}/${encodeURIComponent(String(entityId))}`,
      method: "GET",
      params,
      signal
    },
    options
  );
};
const getGetEntitySnapshotQueryKey = (entityType, entityId, params) => {
  return [
    `/api/entity/snapshot/${entityType}/${entityId}`,
    ...params ? [params] : []
  ];
};
const getGetEntitySnapshotQueryOptions = (entityType, entityId, params, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetEntitySnapshotQueryKey(entityType, entityId, params);
  const queryFn = ({ signal, meta }) => getEntitySnapshot(
    entityType,
    entityId,
    params,
    { ...requestOptions, meta },
    signal
  );
  return {
    queryKey,
    queryFn,
    enabled: !!(entityType && entityId),
    ...queryOptions
  };
};
function useGetEntitySnapshot(entityType, entityId, params, options, queryClient) {
  const queryOptions = getGetEntitySnapshotQueryOptions(
    entityType,
    entityId,
    params,
    options
  );
  const query = useQuery(queryOptions, queryClient);
  query.queryKey = queryOptions.queryKey;
  return query;
}
const prefetchGetEntitySnapshot = async (queryClient, entityType, entityId, params, options) => {
  const queryOptions = getGetEntitySnapshotQueryOptions(
    entityType,
    entityId,
    params,
    options
  );
  await queryClient.prefetchQuery(queryOptions);
  return queryClient;
};
const pullEntities = (entitySyncPullRequest, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/sync/pull`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: entitySyncPullRequest,
      signal
    },
    options
  );
};
const getPullEntitiesMutationOptions = (options) => {
  const mutationKey = ["pullEntities"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { data } = props ?? {};
    return pullEntities(data, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const usePullEntities = (options, queryClient) => {
  const mutationOptions = getPullEntitiesMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const pushEntities = (entitySyncPushRequest, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/sync/push`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: entitySyncPushRequest,
      signal
    },
    options
  );
};
const getPushEntitiesMutationOptions = (options) => {
  const mutationKey = ["pushEntities"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { data } = props ?? {};
    return pushEntities(data, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const usePushEntities = (options, queryClient) => {
  const mutationOptions = getPushEntitiesMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const updateEntity = (entity, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/update`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: entity,
      signal
    },
    options
  );
};
const getUpdateEntityMutationOptions = (options) => {
  const mutationKey = ["updateEntity"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { data } = props ?? {};
    return updateEntity(data, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useUpdateEntity = (options, queryClient) => {
  const mutationOptions = getUpdateEntityMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const searchEntities = (entityType, query, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/${encodeURIComponent(String(entityType))}`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: query,
      signal
    },
    options
  );
};
const getSearchEntitiesQueryKey = (entityType, query) => {
  return [`/api/entity/${entityType}`, query];
};
const getSearchEntitiesQueryOptions = (entityType, query, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getSearchEntitiesQueryKey(entityType, query);
  const queryFn = ({
    signal,
    meta
  }) => searchEntities(entityType, query, { ...requestOptions, meta }, signal);
  return {
    queryKey,
    queryFn,
    enabled: !!entityType,
    ...queryOptions
  };
};
function useSearchEntities(entityType, query, options, queryClient) {
  const queryOptions = getSearchEntitiesQueryOptions(
    entityType,
    query,
    options
  );
  const _query = useQuery(queryOptions, queryClient);
  _query.queryKey = queryOptions.queryKey;
  return _query;
}
const prefetchSearchEntities = async (queryClient, entityType, query, options) => {
  const queryOptions = getSearchEntitiesQueryOptions(
    entityType,
    query,
    options
  );
  await queryClient.prefetchQuery(queryOptions);
  return queryClient;
};
const archiveEntity = (entityType, entityId, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/${encodeURIComponent(String(entityType))}/archive/${encodeURIComponent(String(entityId))}`,
      method: "POST",
      signal
    },
    options
  );
};
const getArchiveEntityMutationOptions = (options) => {
  const mutationKey = ["archiveEntity"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { entityType, entityId } = props ?? {};
    return archiveEntity(entityType, entityId, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useArchiveEntity = (options, queryClient) => {
  const mutationOptions = getArchiveEntityMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const deleteDependentEntities = (entityType, entityId, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/${encodeURIComponent(String(entityType))}/delete-dependents/${encodeURIComponent(String(entityId))}`,
      method: "POST",
      signal
    },
    options
  );
};
const getDeleteDependentEntitiesMutationOptions = (options) => {
  const mutationKey = ["deleteDependentEntities"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { entityType, entityId } = props ?? {};
    return deleteDependentEntities(entityType, entityId, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useDeleteDependentEntities = (options, queryClient) => {
  const mutationOptions = getDeleteDependentEntitiesMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const deleteEntity = (entityType, entityId, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/${encodeURIComponent(String(entityType))}/delete/${encodeURIComponent(String(entityId))}`,
      method: "POST",
      signal
    },
    options
  );
};
const getDeleteEntityMutationOptions = (options) => {
  const mutationKey = ["deleteEntity"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { entityType, entityId } = props ?? {};
    return deleteEntity(entityType, entityId, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useDeleteEntity = (options, queryClient) => {
  const mutationOptions = getDeleteEntityMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const saveBulkEntities = (entityType, entity, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/${encodeURIComponent(String(entityType))}/saveBulkEntities`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: entity,
      signal
    },
    options
  );
};
const getSaveBulkEntitiesMutationOptions = (options) => {
  const mutationKey = ["saveBulkEntities"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { entityType, data } = props ?? {};
    return saveBulkEntities(entityType, data, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useSaveBulkEntities = (options, queryClient) => {
  const mutationOptions = getSaveBulkEntitiesMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const unarchiveEntity = (entityType, entityId, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/${encodeURIComponent(String(entityType))}/unarchive/${encodeURIComponent(String(entityId))}`,
      method: "POST",
      signal
    },
    options
  );
};
const getUnarchiveEntityMutationOptions = (options) => {
  const mutationKey = ["unarchiveEntity"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { entityType, entityId } = props ?? {};
    return unarchiveEntity(entityType, entityId, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useUnarchiveEntity = (options, queryClient) => {
  const mutationOptions = getUnarchiveEntityMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const updateEntityById = (entityType, entityId, update, params, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/${encodeURIComponent(String(entityType))}/update/${encodeURIComponent(String(entityId))}`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: update,
      params,
      signal
    },
    options
  );
};
const getUpdateEntityByIdMutationOptions = (options) => {
  const mutationKey = ["updateEntityById"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { entityType, entityId, data, params } = props ?? {};
    return updateEntityById(entityType, entityId, data, params, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useUpdateEntityById = (options, queryClient) => {
  const mutationOptions = getUpdateEntityByIdMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const findEntityById = (entityType, entityId, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/${encodeURIComponent(String(entityType))}/${encodeURIComponent(String(entityId))}`,
      method: "GET",
      signal
    },
    options
  );
};
const getFindEntityByIdQueryKey = (entityType, entityId) => {
  return [`/api/entity/${entityType}/${entityId}`];
};
const getFindEntityByIdQueryOptions = (entityType, entityId, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getFindEntityByIdQueryKey(entityType, entityId);
  const queryFn = ({
    signal,
    meta
  }) => findEntityById(entityType, entityId, { ...requestOptions, meta }, signal);
  return {
    queryKey,
    queryFn,
    enabled: !!(entityType && entityId),
    ...queryOptions
  };
};
function useFindEntityById(entityType, entityId, options, queryClient) {
  const queryOptions = getFindEntityByIdQueryOptions(
    entityType,
    entityId,
    options
  );
  const query = useQuery(queryOptions, queryClient);
  query.queryKey = queryOptions.queryKey;
  return query;
}
const prefetchFindEntityById = async (queryClient, entityType, entityId, options) => {
  const queryOptions = getFindEntityByIdQueryOptions(
    entityType,
    entityId,
    options
  );
  await queryClient.prefetchQuery(queryOptions);
  return queryClient;
};
const deployEntity = (entityType, entityId, deployEntityRequest, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity/${encodeURIComponent(String(entityType))}/${encodeURIComponent(String(entityId))}/deploy`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: deployEntityRequest,
      signal
    },
    options
  );
};
const getDeployEntityMutationOptions = (options) => {
  const mutationKey = ["deployEntity"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { entityType, entityId, data } = props ?? {};
    return deployEntity(entityType, entityId, data, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useDeployEntity = (options, queryClient) => {
  const mutationOptions = getDeployEntityMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const getEntityType = (params, options, signal) => {
  return executeFetch(
    { url: `/api/entity-type`, method: "GET", params, signal },
    options
  );
};
const getGetEntityTypeQueryKey = (params) => {
  return [`/api/entity-type`, ...params ? [params] : []];
};
const getGetEntityTypeQueryOptions = (params, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetEntityTypeQueryKey(params);
  const queryFn = ({
    signal,
    meta
  }) => getEntityType(params, { ...requestOptions, meta }, signal);
  return { queryKey, queryFn, ...queryOptions };
};
function useGetEntityType(params, options, queryClient) {
  const queryOptions = getGetEntityTypeQueryOptions(params, options);
  const query = useQuery(queryOptions, queryClient);
  query.queryKey = queryOptions.queryKey;
  return query;
}
const prefetchGetEntityType = async (queryClient, params, options) => {
  const queryOptions = getGetEntityTypeQueryOptions(params, options);
  await queryClient.prefetchQuery(queryOptions);
  return queryClient;
};
const createEntityType = (entityType, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity-type`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: entityType,
      signal
    },
    options
  );
};
const getCreateEntityTypeMutationOptions = (options) => {
  const mutationKey = ["createEntityType"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { data } = props ?? {};
    return createEntityType(data, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useCreateEntityType = (options, queryClient) => {
  const mutationOptions = getCreateEntityTypeMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const createEntityTypeAndReturnViolations = (entityType, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity-type/create`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: entityType,
      signal
    },
    options
  );
};
const getCreateEntityTypeAndReturnViolationsMutationOptions = (options) => {
  const mutationKey = ["createEntityTypeAndReturnViolations"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { data } = props ?? {};
    return createEntityTypeAndReturnViolations(data, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useCreateEntityTypeAndReturnViolations = (options, queryClient) => {
  const mutationOptions = getCreateEntityTypeAndReturnViolationsMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const deleteEntityType = (id, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity-type/delete/${encodeURIComponent(String(id))}`,
      method: "POST",
      signal
    },
    options
  );
};
const getDeleteEntityTypeMutationOptions = (options) => {
  const mutationKey = ["deleteEntityType"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { id } = props ?? {};
    return deleteEntityType(id, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useDeleteEntityType = (options, queryClient) => {
  const mutationOptions = getDeleteEntityTypeMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
const getDependentAssetCount = (id, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity-type/dependentAssetCount/${encodeURIComponent(String(id))}`,
      method: "GET",
      signal
    },
    options
  );
};
const getGetDependentAssetCountQueryKey = (id) => {
  return [`/api/entity-type/dependentAssetCount/${id}`];
};
const getGetDependentAssetCountQueryOptions = (id, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetDependentAssetCountQueryKey(id);
  const queryFn = ({ signal, meta }) => getDependentAssetCount(id, { ...requestOptions, meta }, signal);
  return {
    queryKey,
    queryFn,
    enabled: !!id,
    ...queryOptions
  };
};
function useGetDependentAssetCount(id, options, queryClient) {
  const queryOptions = getGetDependentAssetCountQueryOptions(id, options);
  const query = useQuery(queryOptions, queryClient);
  query.queryKey = queryOptions.queryKey;
  return query;
}
const prefetchGetDependentAssetCount = async (queryClient, id, options) => {
  const queryOptions = getGetDependentAssetCountQueryOptions(id, options);
  await queryClient.prefetchQuery(queryOptions);
  return queryClient;
};
const getLoggedInUserEntityType = (options, signal) => {
  return executeFetch(
    { url: `/api/entity-type/getLoggedInUser`, method: "GET", signal },
    options
  );
};
const getGetLoggedInUserEntityTypeQueryKey = () => {
  return [`/api/entity-type/getLoggedInUser`];
};
const getGetLoggedInUserEntityTypeQueryOptions = (options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetLoggedInUserEntityTypeQueryKey();
  const queryFn = ({ signal, meta }) => getLoggedInUserEntityType({ ...requestOptions, meta }, signal);
  return { queryKey, queryFn, ...queryOptions };
};
function useGetLoggedInUserEntityType(options, queryClient) {
  const queryOptions = getGetLoggedInUserEntityTypeQueryOptions(options);
  const query = useQuery(queryOptions, queryClient);
  query.queryKey = queryOptions.queryKey;
  return query;
}
const prefetchGetLoggedInUserEntityType = async (queryClient, options) => {
  const queryOptions = getGetLoggedInUserEntityTypeQueryOptions(options);
  await queryClient.prefetchQuery(queryOptions);
  return queryClient;
};
const getPrimaryKeyType = (id, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity-type/primaryKeyType/${encodeURIComponent(String(id))}`,
      method: "GET",
      signal
    },
    options
  );
};
const getGetPrimaryKeyTypeQueryKey = (id) => {
  return [`/api/entity-type/primaryKeyType/${id}`];
};
const getGetPrimaryKeyTypeQueryOptions = (id, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetPrimaryKeyTypeQueryKey(id);
  const queryFn = ({ signal, meta }) => getPrimaryKeyType(id, { ...requestOptions, meta }, signal);
  return {
    queryKey,
    queryFn,
    enabled: !!id,
    ...queryOptions
  };
};
function useGetPrimaryKeyType(id, options, queryClient) {
  const queryOptions = getGetPrimaryKeyTypeQueryOptions(id, options);
  const query = useQuery(queryOptions, queryClient);
  query.queryKey = queryOptions.queryKey;
  return query;
}
const prefetchGetPrimaryKeyType = async (queryClient, id, options) => {
  const queryOptions = getGetPrimaryKeyTypeQueryOptions(id, options);
  await queryClient.prefetchQuery(queryOptions);
  return queryClient;
};
const updateEntityType = (entityType, options, signal) => {
  return executeFetch(
    {
      url: `/api/entity-type/update`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: entityType,
      signal
    },
    options
  );
};
const getUpdateEntityTypeMutationOptions = (options) => {
  const mutationKey = ["updateEntityType"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = (props, context) => {
    const { data } = props ?? {};
    return updateEntityType(data, {
      ...requestOptions,
      meta: { ...context.meta, ...requestOptions?.meta }
    });
  };
  return { mutationFn, ...mutationOptions };
};
const useUpdateEntityType = (options, queryClient) => {
  const mutationOptions = getUpdateEntityTypeMutationOptions(options);
  return useMutation(mutationOptions, queryClient);
};
export {
  getDetectFileColumnsMutationOptions as $,
  findEntityById as A,
  findParentLookupEntities as B,
  getArchiveEntityMutationOptions as C,
  getBulkCreateUpdateOrDeleteHierarchicalEntityMutationOptions as D,
  getBulkFetchEntitiesMutationOptions as E,
  getBulkFetchEntitySnapshotsQueryKey as F,
  getBulkFetchEntitySnapshotsQueryOptions as G,
  getCloneEntityMutationOptions as H,
  getCopyEntityMutationOptions as I,
  getCountActivitiesAfterLastPublishQueryKey as J,
  getCountActivitiesAfterLastPublishQueryOptions as K,
  getCreateEntityAndGetViolationsMutationOptions as L,
  getCreateEntityMutationOptions as M,
  getCreateEntityTypeAndReturnViolationsMutationOptions as N,
  getCreateEntityTypeMutationOptions as O,
  getCreateUpdateOrDeleteHierarchicalEntityMutationOptions as P,
  getDeleteDependentEntitiesMutationOptions as Q,
  getDeleteEntityAndReplaceParentReferencesMutationOptions as R,
  getDeleteEntityMutationOptions as S,
  getDeleteEntityTypeMutationOptions as T,
  getDependentAssetCount as U,
  getDeployEntityMutationOptions as V,
  getDeployedBulkFetchEntitiesMutationOptions as W,
  getDeployedEntityDependency as X,
  getDeployedEntityDependencyTree as Y,
  getDeployedEntityDependentsWithAssetsMutationOptions as Z,
  getDeployedEntitySnapshot as _,
  archiveEntity as a,
  getSearchChildEntitiesQueryOptions as a$,
  getDistinctValues as a0,
  getEntityDependency as a1,
  getEntityDependencyTree as a2,
  getEntityDependentsWithAssetsMutationOptions as a3,
  getEntitySnapshot as a4,
  getEntityType as a5,
  getExportEntitiesMutationOptions as a6,
  getFetchDeployedEmbeddedDependentsQueryKey as a7,
  getFetchDeployedEmbeddedDependentsQueryOptions as a8,
  getFetchEmbeddedDependentsQueryKey as a9,
  getGetEntityTypeQueryOptions as aA,
  getGetImportFieldMappingQueryKey as aB,
  getGetImportFieldMappingQueryOptions as aC,
  getGetLatestVersionQueryKey as aD,
  getGetLatestVersionQueryOptions as aE,
  getGetLoggedInUserEntityTypeQueryKey as aF,
  getGetLoggedInUserEntityTypeQueryOptions as aG,
  getGetPrimaryKeyTypeQueryKey as aH,
  getGetPrimaryKeyTypeQueryOptions as aI,
  getImportEntitiesMutationOptions as aJ,
  getImportFieldMapping as aK,
  getLatestVersion as aL,
  getLoggedInUserEntityType as aM,
  getMutateEntityIdMutationOptions as aN,
  getParseColumnMutationOptions as aO,
  getParseColumnNamesInlineMutationOptions as aP,
  getParseColumnNamesMutationOptions as aQ,
  getParseColumnNamesWithTypeMutationOptions as aR,
  getPreviewImportMutationOptions as aS,
  getPrimaryKeyType as aT,
  getPullEntitiesMutationOptions as aU,
  getPushEntitiesMutationOptions as aV,
  getRestoreEntityFromDeployedMutationOptions as aW,
  getRestoreEntityMutationOptions as aX,
  getSaveAndDeployEntityMutationOptions as aY,
  getSaveBulkEntitiesMutationOptions as aZ,
  getSearchChildEntitiesQueryKey as a_,
  getFetchEmbeddedDependentsQueryOptions as aa,
  getFindCountOfParentLookupEntitiesQueryKey as ab,
  getFindCountOfParentLookupEntitiesQueryOptions as ac,
  getFindDeployedEntityByIdQueryKey as ad,
  getFindDeployedEntityByIdQueryOptions as ae,
  getFindEntityByIdQueryKey as af,
  getFindEntityByIdQueryOptions as ag,
  getFindParentLookupEntitiesQueryKey as ah,
  getFindParentLookupEntitiesQueryOptions as ai,
  getGetDependentAssetCountQueryKey as aj,
  getGetDependentAssetCountQueryOptions as ak,
  getGetDeployedEntityDependencyQueryKey as al,
  getGetDeployedEntityDependencyQueryOptions as am,
  getGetDeployedEntityDependencyTreeQueryKey as an,
  getGetDeployedEntityDependencyTreeQueryOptions as ao,
  getGetDeployedEntitySnapshotQueryKey as ap,
  getGetDeployedEntitySnapshotQueryOptions as aq,
  getGetDistinctValuesQueryKey as ar,
  getGetDistinctValuesQueryOptions as as,
  getGetEntityDependencyQueryKey as at,
  getGetEntityDependencyQueryOptions as au,
  getGetEntityDependencyTreeQueryKey as av,
  getGetEntityDependencyTreeQueryOptions as aw,
  getGetEntitySnapshotQueryKey as ax,
  getGetEntitySnapshotQueryOptions as ay,
  getGetEntityTypeQueryKey as az,
  bulkCreateUpdateOrDeleteHierarchicalEntity as b,
  unarchiveEntity as b$,
  getSearchDeployedChildEntitiesQueryKey as b0,
  getSearchDeployedChildEntitiesQueryOptions as b1,
  getSearchDeployedEmbeddedEntitiesQueryKey as b2,
  getSearchDeployedEmbeddedEntitiesQueryOptions as b3,
  getSearchDeployedEntitiesQueryKey as b4,
  getSearchDeployedEntitiesQueryOptions as b5,
  getSearchEmbeddedEntitiesQueryKey as b6,
  getSearchEmbeddedEntitiesQueryOptions as b7,
  getSearchEntitiesQueryKey as b8,
  getSearchEntitiesQueryOptions as b9,
  prefetchGetEntityDependencyTree as bA,
  prefetchGetEntitySnapshot as bB,
  prefetchGetEntityType as bC,
  prefetchGetImportFieldMapping as bD,
  prefetchGetLatestVersion as bE,
  prefetchGetLoggedInUserEntityType as bF,
  prefetchGetPrimaryKeyType as bG,
  prefetchSearchChildEntities as bH,
  prefetchSearchDeployedChildEntities as bI,
  prefetchSearchDeployedEmbeddedEntities as bJ,
  prefetchSearchDeployedEntities as bK,
  prefetchSearchEmbeddedEntities as bL,
  prefetchSearchEntities as bM,
  previewImport as bN,
  pullEntities as bO,
  pushEntities as bP,
  restoreEntity as bQ,
  restoreEntityFromDeployed as bR,
  saveAndDeployEntity as bS,
  saveBulkEntities as bT,
  searchChildEntities as bU,
  searchDeployedChildEntities as bV,
  searchDeployedEmbeddedEntities as bW,
  searchDeployedEntities as bX,
  searchEmbeddedEntities as bY,
  searchEntities as bZ,
  searchEntitySnapshot as b_,
  getSearchEntitySnapshotMutationOptions as ba,
  getUnarchiveEntityMutationOptions as bb,
  getUpdateEntityAndGetViolationsMutationOptions as bc,
  getUpdateEntityByIdMutationOptions as bd,
  getUpdateEntityMutationOptions as be,
  getUpdateEntityTypeMutationOptions as bf,
  importEntities as bg,
  mutateEntityId as bh,
  parseColumn as bi,
  parseColumnNames as bj,
  parseColumnNamesInline as bk,
  parseColumnNamesWithType as bl,
  prefetchBulkFetchEntitySnapshots as bm,
  prefetchCountActivitiesAfterLastPublish as bn,
  prefetchFetchDeployedEmbeddedDependents as bo,
  prefetchFetchEmbeddedDependents as bp,
  prefetchFindCountOfParentLookupEntities as bq,
  prefetchFindDeployedEntityById as br,
  prefetchFindEntityById as bs,
  prefetchFindParentLookupEntities as bt,
  prefetchGetDependentAssetCount as bu,
  prefetchGetDeployedEntityDependency as bv,
  prefetchGetDeployedEntityDependencyTree as bw,
  prefetchGetDeployedEntitySnapshot as bx,
  prefetchGetDistinctValues as by,
  prefetchGetEntityDependency as bz,
  bulkFetchEntities as c,
  useSearchEntities as c$,
  updateEntity as c0,
  updateEntityAndGetViolations as c1,
  updateEntityById as c2,
  updateEntityType as c3,
  useArchiveEntity as c4,
  useBulkCreateUpdateOrDeleteHierarchicalEntity as c5,
  useBulkFetchEntities as c6,
  useBulkFetchEntitySnapshots as c7,
  useCloneEntity as c8,
  useCopyEntity as c9,
  useGetDistinctValues as cA,
  useGetEntityDependency as cB,
  useGetEntityDependencyTree as cC,
  useGetEntitySnapshot as cD,
  useGetEntityType as cE,
  useGetImportFieldMapping as cF,
  useGetLatestVersion as cG,
  useGetLoggedInUserEntityType as cH,
  useGetPrimaryKeyType as cI,
  useImportEntities as cJ,
  useMutateEntityId as cK,
  useParseColumn as cL,
  useParseColumnNames as cM,
  useParseColumnNamesInline as cN,
  useParseColumnNamesWithType as cO,
  usePreviewImport as cP,
  usePullEntities as cQ,
  usePushEntities as cR,
  useRestoreEntity as cS,
  useRestoreEntityFromDeployed as cT,
  useSaveAndDeployEntity as cU,
  useSaveBulkEntities as cV,
  useSearchChildEntities as cW,
  useSearchDeployedChildEntities as cX,
  useSearchDeployedEmbeddedEntities as cY,
  useSearchDeployedEntities as cZ,
  useSearchEmbeddedEntities as c_,
  useCountActivitiesAfterLastPublish as ca,
  useCreateEntity as cb,
  useCreateEntityAndGetViolations as cc,
  useCreateEntityType as cd,
  useCreateEntityTypeAndReturnViolations as ce,
  useCreateUpdateOrDeleteHierarchicalEntity as cf,
  useDeleteDependentEntities as cg,
  useDeleteEntity as ch,
  useDeleteEntityAndReplaceParentReferences as ci,
  useDeleteEntityType as cj,
  useDeployEntity as ck,
  useDeployedBulkFetchEntities as cl,
  useDeployedEntityDependentsWithAssets as cm,
  useDetectFileColumns as cn,
  useEntityDependentsWithAssets as co,
  useExportEntities as cp,
  useFetchDeployedEmbeddedDependents as cq,
  useFetchEmbeddedDependents as cr,
  useFindCountOfParentLookupEntities as cs,
  useFindDeployedEntityById as ct,
  useFindEntityById as cu,
  useFindParentLookupEntities as cv,
  useGetDependentAssetCount as cw,
  useGetDeployedEntityDependency as cx,
  useGetDeployedEntityDependencyTree as cy,
  useGetDeployedEntitySnapshot as cz,
  bulkFetchEntitySnapshots as d,
  useSearchEntitySnapshot as d0,
  useUnarchiveEntity as d1,
  useUpdateEntity as d2,
  useUpdateEntityAndGetViolations as d3,
  useUpdateEntityById as d4,
  useUpdateEntityType as d5,
  cloneEntity as e,
  copyEntity as f,
  countActivitiesAfterLastPublish as g,
  createEntity as h,
  createEntityAndGetViolations as i,
  createEntityType as j,
  createEntityTypeAndReturnViolations as k,
  createUpdateOrDeleteHierarchicalEntity as l,
  deleteDependentEntities as m,
  deleteEntity as n,
  deleteEntityAndReplaceParentReferences as o,
  deleteEntityType as p,
  deployEntity as q,
  deployedBulkFetchEntities as r,
  deployedEntityDependentsWithAssets as s,
  detectFileColumns as t,
  entityDependentsWithAssets as u,
  exportEntities as v,
  fetchDeployedEmbeddedDependents as w,
  fetchEmbeddedDependents as x,
  findCountOfParentLookupEntities as y,
  findDeployedEntityById as z
};
