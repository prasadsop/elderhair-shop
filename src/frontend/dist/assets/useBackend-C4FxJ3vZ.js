var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentQuery, _currentQueryInitialState, _currentResult, _currentResultState, _currentResultOptions, _currentThenable, _selectError, _selectFn, _selectResult, _lastQueryWithDefinedData, _staleTimeoutId, _refetchIntervalId, _currentRefetchInterval, _trackedProps, _QueryObserver_instances, executeFetch_fn, updateStaleTimeout_fn, computeRefetchInterval_fn, updateRefetchInterval_fn, updateTimers_fn, clearStaleTimeout_fn, clearRefetchInterval_fn, updateQuery_fn, notify_fn, _a, _client2, _currentResult2, _currentMutation, _mutateOptions, _MutationObserver_instances, updateResult_fn, notify_fn2, _b;
import { e as Subscribable, p as pendingThenable, f as resolveEnabled, s as shallowEqualObjects, g as resolveStaleTime, n as noop, h as environmentManager, i as isValidTimeout, t as timeUntilStale, k as timeoutManager, l as focusManager, m as fetchState, q as replaceData, w as notifyManager, x as hashKey, y as getDefaultState, r as reactExports, z as shouldThrowError, A as useQueryClient } from "./index-BrmIA-SK.js";
var QueryObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _QueryObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentQuery);
    __privateAdd(this, _currentQueryInitialState);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentResultState);
    __privateAdd(this, _currentResultOptions);
    __privateAdd(this, _currentThenable);
    __privateAdd(this, _selectError);
    __privateAdd(this, _selectFn);
    __privateAdd(this, _selectResult);
    // This property keeps track of the last query with defined data.
    // It will be used to pass the previous data and query to the placeholder function between renders.
    __privateAdd(this, _lastQueryWithDefinedData);
    __privateAdd(this, _staleTimeoutId);
    __privateAdd(this, _refetchIntervalId);
    __privateAdd(this, _currentRefetchInterval);
    __privateAdd(this, _trackedProps, /* @__PURE__ */ new Set());
    this.options = options;
    __privateSet(this, _client, client);
    __privateSet(this, _selectError, null);
    __privateSet(this, _currentThenable, pendingThenable());
    this.bindMethods();
    this.setOptions(options);
  }
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    if (this.listeners.size === 1) {
      __privateGet(this, _currentQuery).addObserver(this);
      if (shouldFetchOnMount(__privateGet(this, _currentQuery), this.options)) {
        __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
      } else {
        this.updateResult();
      }
      __privateMethod(this, _QueryObserver_instances, updateTimers_fn).call(this);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.destroy();
    }
  }
  shouldFetchOnReconnect() {
    return shouldFetchOn(
      __privateGet(this, _currentQuery),
      this.options,
      this.options.refetchOnReconnect
    );
  }
  shouldFetchOnWindowFocus() {
    return shouldFetchOn(
      __privateGet(this, _currentQuery),
      this.options,
      this.options.refetchOnWindowFocus
    );
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set();
    __privateMethod(this, _QueryObserver_instances, clearStaleTimeout_fn).call(this);
    __privateMethod(this, _QueryObserver_instances, clearRefetchInterval_fn).call(this);
    __privateGet(this, _currentQuery).removeObserver(this);
  }
  setOptions(options) {
    const prevOptions = this.options;
    const prevQuery = __privateGet(this, _currentQuery);
    this.options = __privateGet(this, _client).defaultQueryOptions(options);
    if (this.options.enabled !== void 0 && typeof this.options.enabled !== "boolean" && typeof this.options.enabled !== "function" && typeof resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== "boolean") {
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean"
      );
    }
    __privateMethod(this, _QueryObserver_instances, updateQuery_fn).call(this);
    __privateGet(this, _currentQuery).setOptions(this.options);
    if (prevOptions._defaulted && !shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getQueryCache().notify({
        type: "observerOptionsUpdated",
        query: __privateGet(this, _currentQuery),
        observer: this
      });
    }
    const mounted = this.hasListeners();
    if (mounted && shouldFetchOptionally(
      __privateGet(this, _currentQuery),
      prevQuery,
      this.options,
      prevOptions
    )) {
      __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
    }
    this.updateResult();
    if (mounted && (__privateGet(this, _currentQuery) !== prevQuery || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== resolveEnabled(prevOptions.enabled, __privateGet(this, _currentQuery)) || resolveStaleTime(this.options.staleTime, __privateGet(this, _currentQuery)) !== resolveStaleTime(prevOptions.staleTime, __privateGet(this, _currentQuery)))) {
      __privateMethod(this, _QueryObserver_instances, updateStaleTimeout_fn).call(this);
    }
    const nextRefetchInterval = __privateMethod(this, _QueryObserver_instances, computeRefetchInterval_fn).call(this);
    if (mounted && (__privateGet(this, _currentQuery) !== prevQuery || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== resolveEnabled(prevOptions.enabled, __privateGet(this, _currentQuery)) || nextRefetchInterval !== __privateGet(this, _currentRefetchInterval))) {
      __privateMethod(this, _QueryObserver_instances, updateRefetchInterval_fn).call(this, nextRefetchInterval);
    }
  }
  getOptimisticResult(options) {
    const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), options);
    const result = this.createResult(query, options);
    if (shouldAssignObserverCurrentProperties(this, result)) {
      __privateSet(this, _currentResult, result);
      __privateSet(this, _currentResultOptions, this.options);
      __privateSet(this, _currentResultState, __privateGet(this, _currentQuery).state);
    }
    return result;
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  trackResult(result, onPropTracked) {
    return new Proxy(result, {
      get: (target, key) => {
        this.trackProp(key);
        onPropTracked == null ? void 0 : onPropTracked(key);
        if (key === "promise") {
          this.trackProp("data");
          if (!this.options.experimental_prefetchInRender && __privateGet(this, _currentThenable).status === "pending") {
            __privateGet(this, _currentThenable).reject(
              new Error(
                "experimental_prefetchInRender feature flag is not enabled"
              )
            );
          }
        }
        return Reflect.get(target, key);
      }
    });
  }
  trackProp(key) {
    __privateGet(this, _trackedProps).add(key);
  }
  getCurrentQuery() {
    return __privateGet(this, _currentQuery);
  }
  refetch({ ...options } = {}) {
    return this.fetch({
      ...options
    });
  }
  fetchOptimistic(options) {
    const defaultedOptions = __privateGet(this, _client).defaultQueryOptions(options);
    const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), defaultedOptions);
    return query.fetch().then(() => this.createResult(query, defaultedOptions));
  }
  fetch(fetchOptions) {
    return __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this, {
      ...fetchOptions,
      cancelRefetch: fetchOptions.cancelRefetch ?? true
    }).then(() => {
      this.updateResult();
      return __privateGet(this, _currentResult);
    });
  }
  createResult(query, options) {
    var _a2;
    const prevQuery = __privateGet(this, _currentQuery);
    const prevOptions = this.options;
    const prevResult = __privateGet(this, _currentResult);
    const prevResultState = __privateGet(this, _currentResultState);
    const prevResultOptions = __privateGet(this, _currentResultOptions);
    const queryChange = query !== prevQuery;
    const queryInitialState = queryChange ? query.state : __privateGet(this, _currentQueryInitialState);
    const { state } = query;
    let newState = { ...state };
    let isPlaceholderData = false;
    let data;
    if (options._optimisticResults) {
      const mounted = this.hasListeners();
      const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
      const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
      if (fetchOnMount || fetchOptionally) {
        newState = {
          ...newState,
          ...fetchState(state.data, query.options)
        };
      }
      if (options._optimisticResults === "isRestoring") {
        newState.fetchStatus = "idle";
      }
    }
    let { error, errorUpdatedAt, status } = newState;
    data = newState.data;
    let skipSelect = false;
    if (options.placeholderData !== void 0 && data === void 0 && status === "pending") {
      let placeholderData;
      if ((prevResult == null ? void 0 : prevResult.isPlaceholderData) && options.placeholderData === (prevResultOptions == null ? void 0 : prevResultOptions.placeholderData)) {
        placeholderData = prevResult.data;
        skipSelect = true;
      } else {
        placeholderData = typeof options.placeholderData === "function" ? options.placeholderData(
          (_a2 = __privateGet(this, _lastQueryWithDefinedData)) == null ? void 0 : _a2.state.data,
          __privateGet(this, _lastQueryWithDefinedData)
        ) : options.placeholderData;
      }
      if (placeholderData !== void 0) {
        status = "success";
        data = replaceData(
          prevResult == null ? void 0 : prevResult.data,
          placeholderData,
          options
        );
        isPlaceholderData = true;
      }
    }
    if (options.select && data !== void 0 && !skipSelect) {
      if (prevResult && data === (prevResultState == null ? void 0 : prevResultState.data) && options.select === __privateGet(this, _selectFn)) {
        data = __privateGet(this, _selectResult);
      } else {
        try {
          __privateSet(this, _selectFn, options.select);
          data = options.select(data);
          data = replaceData(prevResult == null ? void 0 : prevResult.data, data, options);
          __privateSet(this, _selectResult, data);
          __privateSet(this, _selectError, null);
        } catch (selectError) {
          __privateSet(this, _selectError, selectError);
        }
      }
    }
    if (__privateGet(this, _selectError)) {
      error = __privateGet(this, _selectError);
      data = __privateGet(this, _selectResult);
      errorUpdatedAt = Date.now();
      status = "error";
    }
    const isFetching = newState.fetchStatus === "fetching";
    const isPending = status === "pending";
    const isError = status === "error";
    const isLoading = isPending && isFetching;
    const hasData = data !== void 0;
    const result = {
      status,
      fetchStatus: newState.fetchStatus,
      isPending,
      isSuccess: status === "success",
      isError,
      isInitialLoading: isLoading,
      isLoading,
      data,
      dataUpdatedAt: newState.dataUpdatedAt,
      error,
      errorUpdatedAt,
      failureCount: newState.fetchFailureCount,
      failureReason: newState.fetchFailureReason,
      errorUpdateCount: newState.errorUpdateCount,
      isFetched: query.isFetched(),
      isFetchedAfterMount: newState.dataUpdateCount > queryInitialState.dataUpdateCount || newState.errorUpdateCount > queryInitialState.errorUpdateCount,
      isFetching,
      isRefetching: isFetching && !isPending,
      isLoadingError: isError && !hasData,
      isPaused: newState.fetchStatus === "paused",
      isPlaceholderData,
      isRefetchError: isError && hasData,
      isStale: isStale(query, options),
      refetch: this.refetch,
      promise: __privateGet(this, _currentThenable),
      isEnabled: resolveEnabled(options.enabled, query) !== false
    };
    const nextResult = result;
    if (this.options.experimental_prefetchInRender) {
      const hasResultData = nextResult.data !== void 0;
      const isErrorWithoutData = nextResult.status === "error" && !hasResultData;
      const finalizeThenableIfPossible = (thenable) => {
        if (isErrorWithoutData) {
          thenable.reject(nextResult.error);
        } else if (hasResultData) {
          thenable.resolve(nextResult.data);
        }
      };
      const recreateThenable = () => {
        const pending = __privateSet(this, _currentThenable, nextResult.promise = pendingThenable());
        finalizeThenableIfPossible(pending);
      };
      const prevThenable = __privateGet(this, _currentThenable);
      switch (prevThenable.status) {
        case "pending":
          if (query.queryHash === prevQuery.queryHash) {
            finalizeThenableIfPossible(prevThenable);
          }
          break;
        case "fulfilled":
          if (isErrorWithoutData || nextResult.data !== prevThenable.value) {
            recreateThenable();
          }
          break;
        case "rejected":
          if (!isErrorWithoutData || nextResult.error !== prevThenable.reason) {
            recreateThenable();
          }
          break;
      }
    }
    return nextResult;
  }
  updateResult() {
    const prevResult = __privateGet(this, _currentResult);
    const nextResult = this.createResult(__privateGet(this, _currentQuery), this.options);
    __privateSet(this, _currentResultState, __privateGet(this, _currentQuery).state);
    __privateSet(this, _currentResultOptions, this.options);
    if (__privateGet(this, _currentResultState).data !== void 0) {
      __privateSet(this, _lastQueryWithDefinedData, __privateGet(this, _currentQuery));
    }
    if (shallowEqualObjects(nextResult, prevResult)) {
      return;
    }
    __privateSet(this, _currentResult, nextResult);
    const shouldNotifyListeners = () => {
      if (!prevResult) {
        return true;
      }
      const { notifyOnChangeProps } = this.options;
      const notifyOnChangePropsValue = typeof notifyOnChangeProps === "function" ? notifyOnChangeProps() : notifyOnChangeProps;
      if (notifyOnChangePropsValue === "all" || !notifyOnChangePropsValue && !__privateGet(this, _trackedProps).size) {
        return true;
      }
      const includedProps = new Set(
        notifyOnChangePropsValue ?? __privateGet(this, _trackedProps)
      );
      if (this.options.throwOnError) {
        includedProps.add("error");
      }
      return Object.keys(__privateGet(this, _currentResult)).some((key) => {
        const typedKey = key;
        const changed = __privateGet(this, _currentResult)[typedKey] !== prevResult[typedKey];
        return changed && includedProps.has(typedKey);
      });
    };
    __privateMethod(this, _QueryObserver_instances, notify_fn).call(this, { listeners: shouldNotifyListeners() });
  }
  onQueryUpdate() {
    this.updateResult();
    if (this.hasListeners()) {
      __privateMethod(this, _QueryObserver_instances, updateTimers_fn).call(this);
    }
  }
}, _client = new WeakMap(), _currentQuery = new WeakMap(), _currentQueryInitialState = new WeakMap(), _currentResult = new WeakMap(), _currentResultState = new WeakMap(), _currentResultOptions = new WeakMap(), _currentThenable = new WeakMap(), _selectError = new WeakMap(), _selectFn = new WeakMap(), _selectResult = new WeakMap(), _lastQueryWithDefinedData = new WeakMap(), _staleTimeoutId = new WeakMap(), _refetchIntervalId = new WeakMap(), _currentRefetchInterval = new WeakMap(), _trackedProps = new WeakMap(), _QueryObserver_instances = new WeakSet(), executeFetch_fn = function(fetchOptions) {
  __privateMethod(this, _QueryObserver_instances, updateQuery_fn).call(this);
  let promise = __privateGet(this, _currentQuery).fetch(
    this.options,
    fetchOptions
  );
  if (!(fetchOptions == null ? void 0 : fetchOptions.throwOnError)) {
    promise = promise.catch(noop);
  }
  return promise;
}, updateStaleTimeout_fn = function() {
  __privateMethod(this, _QueryObserver_instances, clearStaleTimeout_fn).call(this);
  const staleTime = resolveStaleTime(
    this.options.staleTime,
    __privateGet(this, _currentQuery)
  );
  if (environmentManager.isServer() || __privateGet(this, _currentResult).isStale || !isValidTimeout(staleTime)) {
    return;
  }
  const time = timeUntilStale(__privateGet(this, _currentResult).dataUpdatedAt, staleTime);
  const timeout = time + 1;
  __privateSet(this, _staleTimeoutId, timeoutManager.setTimeout(() => {
    if (!__privateGet(this, _currentResult).isStale) {
      this.updateResult();
    }
  }, timeout));
}, computeRefetchInterval_fn = function() {
  return (typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(__privateGet(this, _currentQuery)) : this.options.refetchInterval) ?? false;
}, updateRefetchInterval_fn = function(nextInterval) {
  __privateMethod(this, _QueryObserver_instances, clearRefetchInterval_fn).call(this);
  __privateSet(this, _currentRefetchInterval, nextInterval);
  if (environmentManager.isServer() || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) === false || !isValidTimeout(__privateGet(this, _currentRefetchInterval)) || __privateGet(this, _currentRefetchInterval) === 0) {
    return;
  }
  __privateSet(this, _refetchIntervalId, timeoutManager.setInterval(() => {
    if (this.options.refetchIntervalInBackground || focusManager.isFocused()) {
      __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
    }
  }, __privateGet(this, _currentRefetchInterval)));
}, updateTimers_fn = function() {
  __privateMethod(this, _QueryObserver_instances, updateStaleTimeout_fn).call(this);
  __privateMethod(this, _QueryObserver_instances, updateRefetchInterval_fn).call(this, __privateMethod(this, _QueryObserver_instances, computeRefetchInterval_fn).call(this));
}, clearStaleTimeout_fn = function() {
  if (__privateGet(this, _staleTimeoutId)) {
    timeoutManager.clearTimeout(__privateGet(this, _staleTimeoutId));
    __privateSet(this, _staleTimeoutId, void 0);
  }
}, clearRefetchInterval_fn = function() {
  if (__privateGet(this, _refetchIntervalId)) {
    timeoutManager.clearInterval(__privateGet(this, _refetchIntervalId));
    __privateSet(this, _refetchIntervalId, void 0);
  }
}, updateQuery_fn = function() {
  const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), this.options);
  if (query === __privateGet(this, _currentQuery)) {
    return;
  }
  const prevQuery = __privateGet(this, _currentQuery);
  __privateSet(this, _currentQuery, query);
  __privateSet(this, _currentQueryInitialState, query.state);
  if (this.hasListeners()) {
    prevQuery == null ? void 0 : prevQuery.removeObserver(this);
    query.addObserver(this);
  }
}, notify_fn = function(notifyOptions) {
  notifyManager.batch(() => {
    if (notifyOptions.listeners) {
      this.listeners.forEach((listener) => {
        listener(__privateGet(this, _currentResult));
      });
    }
    __privateGet(this, _client).getQueryCache().notify({
      query: __privateGet(this, _currentQuery),
      type: "observerResultsUpdated"
    });
  });
}, _a);
function shouldLoadOnMount(query, options) {
  return resolveEnabled(options.enabled, query) !== false && query.state.data === void 0 && !(query.state.status === "error" && options.retryOnMount === false);
}
function shouldFetchOnMount(query, options) {
  return shouldLoadOnMount(query, options) || query.state.data !== void 0 && shouldFetchOn(query, options, options.refetchOnMount);
}
function shouldFetchOn(query, options, field) {
  if (resolveEnabled(options.enabled, query) !== false && resolveStaleTime(options.staleTime, query) !== "static") {
    const value = typeof field === "function" ? field(query) : field;
    return value === "always" || value !== false && isStale(query, options);
  }
  return false;
}
function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
  return (query !== prevQuery || resolveEnabled(prevOptions.enabled, query) === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
}
function isStale(query, options) {
  return resolveEnabled(options.enabled, query) !== false && query.isStaleByTime(resolveStaleTime(options.staleTime, query));
}
function shouldAssignObserverCurrentProperties(observer, optimisticResult) {
  if (!shallowEqualObjects(observer.getCurrentResult(), optimisticResult)) {
    return true;
  }
  return false;
}
var MutationObserver = (_b = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _MutationObserver_instances);
    __privateAdd(this, _client2);
    __privateAdd(this, _currentResult2);
    __privateAdd(this, _currentMutation);
    __privateAdd(this, _mutateOptions);
    __privateSet(this, _client2, client);
    this.setOptions(options);
    this.bindMethods();
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    var _a2;
    const prevOptions = this.options;
    this.options = __privateGet(this, _client2).defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client2).getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: __privateGet(this, _currentMutation),
        observer: this
      });
    }
    if ((prevOptions == null ? void 0 : prevOptions.mutationKey) && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
      this.reset();
    } else if (((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state.status) === "pending") {
      __privateGet(this, _currentMutation).setOptions(this.options);
    }
  }
  onUnsubscribe() {
    var _a2;
    if (!this.hasListeners()) {
      (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn2).call(this, action);
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult2);
  }
  reset() {
    var _a2;
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, void 0);
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn2).call(this);
  }
  mutate(variables, options) {
    var _a2;
    __privateSet(this, _mutateOptions, options);
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, __privateGet(this, _client2).getMutationCache().build(__privateGet(this, _client2), this.options));
    __privateGet(this, _currentMutation).addObserver(this);
    return __privateGet(this, _currentMutation).execute(variables);
  }
}, _client2 = new WeakMap(), _currentResult2 = new WeakMap(), _currentMutation = new WeakMap(), _mutateOptions = new WeakMap(), _MutationObserver_instances = new WeakSet(), updateResult_fn = function() {
  var _a2;
  const state = ((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state) ?? getDefaultState();
  __privateSet(this, _currentResult2, {
    ...state,
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    isIdle: state.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, notify_fn2 = function(action) {
  notifyManager.batch(() => {
    var _a2, _b2, _c, _d, _e, _f, _g, _h;
    if (__privateGet(this, _mutateOptions) && this.hasListeners()) {
      const variables = __privateGet(this, _currentResult2).variables;
      const onMutateResult = __privateGet(this, _currentResult2).context;
      const context = {
        client: __privateGet(this, _client2),
        meta: this.options.meta,
        mutationKey: this.options.mutationKey
      };
      if ((action == null ? void 0 : action.type) === "success") {
        try {
          (_b2 = (_a2 = __privateGet(this, _mutateOptions)).onSuccess) == null ? void 0 : _b2.call(
            _a2,
            action.data,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_d = (_c = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _d.call(
            _c,
            action.data,
            null,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      } else if ((action == null ? void 0 : action.type) === "error") {
        try {
          (_f = (_e = __privateGet(this, _mutateOptions)).onError) == null ? void 0 : _f.call(
            _e,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_h = (_g = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _h.call(
            _g,
            void 0,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      }
    }
    this.listeners.forEach((listener) => {
      listener(__privateGet(this, _currentResult2));
    });
  });
}, _b);
var IsRestoringContext = reactExports.createContext(false);
var useIsRestoring = () => reactExports.useContext(IsRestoringContext);
IsRestoringContext.Provider;
function createValue() {
  let isReset = false;
  return {
    clearReset: () => {
      isReset = false;
    },
    reset: () => {
      isReset = true;
    },
    isReset: () => {
      return isReset;
    }
  };
}
var QueryErrorResetBoundaryContext = reactExports.createContext(createValue());
var useQueryErrorResetBoundary = () => reactExports.useContext(QueryErrorResetBoundaryContext);
var ensurePreventErrorBoundaryRetry = (options, errorResetBoundary, query) => {
  const throwOnError = (query == null ? void 0 : query.state.error) && typeof options.throwOnError === "function" ? shouldThrowError(options.throwOnError, [query.state.error, query]) : options.throwOnError;
  if (options.suspense || options.experimental_prefetchInRender || throwOnError) {
    if (!errorResetBoundary.isReset()) {
      options.retryOnMount = false;
    }
  }
};
var useClearResetErrorBoundary = (errorResetBoundary) => {
  reactExports.useEffect(() => {
    errorResetBoundary.clearReset();
  }, [errorResetBoundary]);
};
var getHasError = ({
  result,
  errorResetBoundary,
  throwOnError,
  query,
  suspense
}) => {
  return result.isError && !errorResetBoundary.isReset() && !result.isFetching && query && (suspense && result.data === void 0 || shouldThrowError(throwOnError, [result.error, query]));
};
var ensureSuspenseTimers = (defaultedOptions) => {
  if (defaultedOptions.suspense) {
    const MIN_SUSPENSE_TIME_MS = 1e3;
    const clamp = (value) => value === "static" ? value : Math.max(value ?? MIN_SUSPENSE_TIME_MS, MIN_SUSPENSE_TIME_MS);
    const originalStaleTime = defaultedOptions.staleTime;
    defaultedOptions.staleTime = typeof originalStaleTime === "function" ? (...args) => clamp(originalStaleTime(...args)) : clamp(originalStaleTime);
    if (typeof defaultedOptions.gcTime === "number") {
      defaultedOptions.gcTime = Math.max(
        defaultedOptions.gcTime,
        MIN_SUSPENSE_TIME_MS
      );
    }
  }
};
var willFetch = (result, isRestoring) => result.isLoading && result.isFetching && !isRestoring;
var shouldSuspend = (defaultedOptions, result) => (defaultedOptions == null ? void 0 : defaultedOptions.suspense) && result.isPending;
var fetchOptimistic = (defaultedOptions, observer, errorResetBoundary) => observer.fetchOptimistic(defaultedOptions).catch(() => {
  errorResetBoundary.clearReset();
});
function useBaseQuery(options, Observer, queryClient) {
  var _a2, _b2, _c, _d;
  const isRestoring = useIsRestoring();
  const errorResetBoundary = useQueryErrorResetBoundary();
  const client = useQueryClient();
  const defaultedOptions = client.defaultQueryOptions(options);
  (_b2 = (_a2 = client.getDefaultOptions().queries) == null ? void 0 : _a2._experimental_beforeQuery) == null ? void 0 : _b2.call(
    _a2,
    defaultedOptions
  );
  const query = client.getQueryCache().get(defaultedOptions.queryHash);
  defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : "optimistic";
  ensureSuspenseTimers(defaultedOptions);
  ensurePreventErrorBoundaryRetry(defaultedOptions, errorResetBoundary, query);
  useClearResetErrorBoundary(errorResetBoundary);
  const isNewCacheEntry = !client.getQueryCache().get(defaultedOptions.queryHash);
  const [observer] = reactExports.useState(
    () => new Observer(
      client,
      defaultedOptions
    )
  );
  const result = observer.getOptimisticResult(defaultedOptions);
  const shouldSubscribe = !isRestoring && options.subscribed !== false;
  reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => {
        const unsubscribe = shouldSubscribe ? observer.subscribe(notifyManager.batchCalls(onStoreChange)) : noop;
        observer.updateResult();
        return unsubscribe;
      },
      [observer, shouldSubscribe]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  reactExports.useEffect(() => {
    observer.setOptions(defaultedOptions);
  }, [defaultedOptions, observer]);
  if (shouldSuspend(defaultedOptions, result)) {
    throw fetchOptimistic(defaultedOptions, observer, errorResetBoundary);
  }
  if (getHasError({
    result,
    errorResetBoundary,
    throwOnError: defaultedOptions.throwOnError,
    query,
    suspense: defaultedOptions.suspense
  })) {
    throw result.error;
  }
  (_d = (_c = client.getDefaultOptions().queries) == null ? void 0 : _c._experimental_afterQuery) == null ? void 0 : _d.call(
    _c,
    defaultedOptions,
    result
  );
  if (defaultedOptions.experimental_prefetchInRender && !environmentManager.isServer() && willFetch(result, isRestoring)) {
    const promise = isNewCacheEntry ? (
      // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
      fetchOptimistic(defaultedOptions, observer, errorResetBoundary)
    ) : (
      // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
      query == null ? void 0 : query.promise
    );
    promise == null ? void 0 : promise.catch(noop).finally(() => {
      observer.updateResult();
    });
  }
  return !defaultedOptions.notifyOnChangeProps ? observer.trackResult(result) : result;
}
function useQuery(options, queryClient) {
  return useBaseQuery(options, QueryObserver);
}
function useMutation(options, queryClient) {
  const client = useQueryClient();
  const [observer] = reactExports.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  reactExports.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = reactExports.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}
function getCategoryLabel(category) {
  if ("shampoosAndConditioners" in category) return "Shampoos & Conditioners";
  if ("treatmentsAndSerums" in category) return "Treatments & Serums";
  if ("stylingTools" in category) return "Styling Tools";
  if ("scalpCare" in category) return "Scalp Care";
  return "Unknown";
}
function getGuideTagLabel(tag) {
  if ("greyHair" in tag) return "Grey Hair";
  if ("thinning" in tag) return "Thinning Hair";
  if ("scalpCare" in tag) return "Scalp Care";
  if ("styling" in tag) return "Styling";
  if ("products" in tag) return "Products";
  return "Unknown";
}
const MOCK_PRODUCTS = [
  {
    id: BigInt(1),
    name: "Silver Shine Shampoo",
    brand: "GoldenYears",
    price: 24.99,
    category: { shampoosAndConditioners: null },
    description: "Hydrating shampoo specially formulated for silver and grey hair. Enhances natural shimmer while nourishing dry strands.",
    imageUrl: "/assets/generated/product-shampoo.dim_600x600.jpg",
    rating: 4.8,
    reviewCount: BigInt(124),
    stockStatus: { inStock: null },
    keyIngredients: ["Argan Oil", "Keratin", "Violet Pigments", "Aloe Vera"],
    benefits: [
      "Brightens grey hair",
      "Reduces yellowing",
      "Deep hydration",
      "Strengthens strands"
    ],
    suitableFor: ["Grey hair", "Silver hair", "Dry hair"],
    size: "250ml",
    tags: ["grey-hair", "hydrating", "brightening"],
    createdAt: BigInt(Date.now())
  },
  {
    id: BigInt(2),
    name: "Silk Nourish Conditioner",
    brand: "GoldenYears",
    price: 26.5,
    category: { shampoosAndConditioners: null },
    description: "Rich, creamy conditioner that restores moisture and softness to mature, thinning hair without weighing it down.",
    imageUrl: "/assets/generated/product-conditioner.dim_600x600.jpg",
    rating: 4.7,
    reviewCount: BigInt(98),
    stockStatus: { inStock: null },
    keyIngredients: ["Silk Proteins", "Coconut Oil", "Vitamin E", "Chamomile"],
    benefits: [
      "Intense moisture",
      "Reduces breakage",
      "Adds softness",
      "Detangles gently"
    ],
    suitableFor: ["Thinning hair", "Fine hair", "Mature hair"],
    size: "250ml",
    tags: ["thinning-hair", "moisturizing", "gentle"],
    createdAt: BigInt(Date.now())
  },
  {
    id: BigInt(3),
    name: "Root Fortifying Serum",
    brand: "VitaScalp",
    price: 32,
    category: { treatmentsAndSerums: null },
    description: "Concentrated scalp serum that stimulates follicles and strengthens hair roots. Clinically tested for mature scalp health.",
    imageUrl: "/assets/generated/product-serum.dim_600x600.jpg",
    rating: 4.9,
    reviewCount: BigInt(76),
    stockStatus: { inStock: null },
    keyIngredients: [
      "Biotin",
      "Caffeine Extract",
      "Rosemary Oil",
      "Niacinamide"
    ],
    benefits: [
      "Stimulates growth",
      "Strengthens roots",
      "Reduces hair fall",
      "Nourishes scalp"
    ],
    suitableFor: ["Thinning hair", "Hair loss", "Sensitive scalp"],
    size: "50ml",
    tags: ["thinning-hair", "scalp-care", "growth"],
    createdAt: BigInt(Date.now())
  },
  {
    id: BigInt(4),
    name: "Gentle Detangling Brush",
    brand: "SilverComfort",
    price: 18.99,
    category: { stylingTools: null },
    description: "Wide-tooth brush with flexible bristles that glide through hair without pulling or breaking. Ergonomic handle for easy grip.",
    imageUrl: "/assets/generated/product-brush.dim_600x600.jpg",
    rating: 4.6,
    reviewCount: BigInt(211),
    stockStatus: { inStock: null },
    keyIngredients: [],
    benefits: [
      "Reduces breakage",
      "Gentle on scalp",
      "Easy grip handle",
      "Suitable for wet hair"
    ],
    suitableFor: ["All hair types", "Sensitive scalp", "Elderly users"],
    size: "Standard",
    tags: ["styling-tools", "gentle", "detangling"],
    createdAt: BigInt(Date.now())
  },
  {
    id: BigInt(5),
    name: "Calming Scalp Mask",
    brand: "PureHerbs",
    price: 28,
    category: { scalpCare: null },
    description: "Soothing weekly scalp treatment with natural botanicals that calm irritation, reduce dryness, and restore balance.",
    imageUrl: "/assets/generated/product-mask.dim_600x600.jpg",
    rating: 4.5,
    reviewCount: BigInt(63),
    stockStatus: { lowStock: null },
    keyIngredients: [
      "Tea Tree Oil",
      "Peppermint",
      "Salicylic Acid",
      "Aloe Vera"
    ],
    benefits: [
      "Soothes irritation",
      "Reduces flaking",
      "Balances scalp",
      "Refreshes roots"
    ],
    suitableFor: ["Sensitive scalp", "Dry scalp", "Itchy scalp"],
    size: "150ml",
    tags: ["scalp-care", "soothing", "weekly-treatment"],
    createdAt: BigInt(Date.now())
  },
  {
    id: BigInt(6),
    name: "Smooth Levain Serum",
    brand: "GoldenYears",
    price: 35,
    category: { treatmentsAndSerums: null },
    description: "Leave-in finishing serum that tames frizz, adds luminous shine, and protects grey hair from environmental damage.",
    imageUrl: "/assets/generated/product-serum2.dim_600x600.jpg",
    rating: 4.7,
    reviewCount: BigInt(89),
    stockStatus: { inStock: null },
    keyIngredients: [
      "Moringa Oil",
      "UV Filters",
      "Hyaluronic Acid",
      "Pearl Extract"
    ],
    benefits: [
      "Controls frizz",
      "Adds shine",
      "UV protection",
      "Lightweight formula"
    ],
    suitableFor: ["Grey hair", "Frizzy hair", "All hair types"],
    size: "75ml",
    tags: ["grey-hair", "shine", "frizz-control"],
    createdAt: BigInt(Date.now())
  }
];
const MOCK_GUIDES = [
  {
    id: BigInt(1),
    title: "Caring for Grey & Silver Hair: A Complete Guide",
    author: "Dr. Priya Sharma",
    publishDate: BigInt(Date.now() - 7 * 24 * 60 * 60 * 1e3),
    readTime: BigInt(8),
    content: `Grey and silver hair is beautiful, but it requires specific care. As hair loses its pigment, it also changes in texture — often becoming coarser, drier, and more prone to yellowing.

**Why Grey Hair Needs Special Care**

When hair goes grey, the melanin that once protected and colored each strand disappears. This makes grey hair more porous, meaning it absorbs moisture (and pollution) more easily — but also loses it faster.

**Daily Care Routine**

1. **Wash gently**: Use a sulfate-free shampoo 2-3 times per week. Over-washing strips natural oils your scalp needs.
2. **Condition every wash**: Grey hair needs consistent moisture. Apply conditioner from mid-shaft to ends.
3. **Weekly deep treatment**: A hydrating hair mask once a week can make a significant difference in texture and shine.
4. **Protect from heat**: If you use heat tools, always use a heat protectant spray first.

**Preventing Yellowing**

Yellow tones in grey hair come from mineral buildup, smoke, pollution, and product residue. Use a purple or blue-tinted shampoo once a week to neutralize brassiness and keep your silver bright.

**Products We Recommend**

Our Silver Shine Shampoo is formulated with gentle violet pigments to counteract yellowing, while the Smooth Levain Serum adds the luminous finish grey hair deserves.`,
    tags: [{ greyHair: null }, { styling: null }],
    relatedProductIds: [BigInt(1), BigInt(6)]
  },
  {
    id: BigInt(2),
    title: "Managing Thinning Hair: Natural Solutions That Work",
    author: "Rajesh Poudel, Trichologist",
    publishDate: BigInt(Date.now() - 14 * 24 * 60 * 60 * 1e3),
    readTime: BigInt(10),
    content: `Hair thinning is one of the most common concerns for people over 60. While genetics play a role, nutrition, stress, and hair care habits significantly impact hair density.

**Understanding Hair Thinning in Later Life**

As we age, hair follicles shrink and the growth cycle shortens. Each hair strand becomes finer, and the scalp may show through more. This is completely natural — but there are many ways to support healthy hair growth and volume.

**Nutritional Support**

Hair is made of protein (keratin). Ensure your diet includes:
- **Biotin-rich foods**: Eggs, nuts, seeds, and sweet potatoes
- **Iron**: Leafy greens, lentils, lean meat
- **Omega-3 fatty acids**: Oily fish, walnuts, flaxseeds
- **Vitamin D**: Sunlight exposure and fortified foods

**Hair Care Practices**

1. **Gentle handling**: Wet hair is fragile. Use wide-tooth combs and detangling brushes.
2. **Avoid tight styles**: Ponytails and braids that pull at the roots can cause traction alopecia.
3. **Scalp massage**: 5 minutes daily of gentle scalp massage increases blood flow to follicles.
4. **Targeted serums**: Look for products with biotin, caffeine, and rosemary oil.

**What to Avoid**

- Harsh chemical treatments (perms, relaxers)
- Very hot water when washing
- Rough towel drying — pat gently instead`,
    tags: [{ thinning: null }, { scalpCare: null }, { products: null }],
    relatedProductIds: [BigInt(2), BigInt(3), BigInt(4)]
  },
  {
    id: BigInt(3),
    title: "Scalp Health: The Foundation of Beautiful Hair",
    author: "Dr. Meera Gurung",
    publishDate: BigInt(Date.now() - 21 * 24 * 60 * 60 * 1e3),
    readTime: BigInt(7),
    content: `A healthy scalp is the foundation of healthy hair. Yet many people focus only on the hair itself, neglecting the skin it grows from.

**Common Scalp Issues in Mature Adults**

As we age, scalp skin becomes thinner and oil production decreases. This can lead to:
- **Dry, itchy scalp**: Reduced sebum production
- **Sensitivity**: Thinner skin reacts more to products
- **Dandruff**: Can worsen with hormonal changes
- **Psoriasis**: Often becomes more pronounced with age

**Building a Scalp Care Routine**

**Step 1: Cleanse gently**
Choose a mild, pH-balanced shampoo. Look for labels that say "sensitive scalp" or "gentle formula." Avoid anything with sulfates (SLS/SLES) if your scalp is dry or irritated.

**Step 2: Weekly scalp treatment**
Apply a targeted scalp mask or oil treatment once a week. Leave it on for 20-30 minutes before washing. Our Calming Scalp Mask uses tea tree and peppermint to soothe while restoring balance.

**Step 3: Hydrate from within**
Drink at least 8 glasses of water daily. A hydrated body means a hydrated scalp.

**Step 4: Professional check-ins**
If you experience persistent itching, redness, or unusual hair loss, visit a dermatologist. Scalp conditions are very treatable when caught early.`,
    tags: [{ scalpCare: null }, { thinning: null }],
    relatedProductIds: [BigInt(5), BigInt(3)]
  },
  {
    id: BigInt(4),
    title: "Gentle Styling Tips for Mature Hair",
    author: "Sunita Thapa, Stylist",
    publishDate: BigInt(Date.now() - 28 * 24 * 60 * 60 * 1e3),
    readTime: BigInt(6),
    content: `Styling mature hair requires a gentle touch and the right techniques. The goal is to look and feel beautiful without causing damage or stress to fragile strands.

**Embracing Your Natural Texture**

Many women in their 60s and 70s find that embracing their natural texture — whether wavy, curly, or straight — is both liberating and practical. Working with your hair's natural movement reduces the need for heat styling.

**Low-Heat Styling Techniques**

1. **Air drying**: Let hair dry naturally whenever possible. Use a microfiber towel to absorb excess water gently.
2. **Diffusing**: If you prefer volume, use a diffuser attachment on low heat instead of a direct blast.
3. **Flexi rods or foam rollers**: Create soft waves overnight without any heat.

**Protective Styles**

Soft updos, loose braids, and gentle twists protect hair ends from friction and environmental damage. Avoid styles that pull tightly at the hairline.

**Product Layering for Volume**

For fine or thinning hair, less is more. Start with a volumizing mousse on damp hair at the roots, then a light-hold finishing spray. Avoid heavy creams or oils near the roots — save those for the ends.

**Cutting Advice**

Regular trims every 6-8 weeks prevent split ends from traveling up the shaft. Ask your stylist for layers that add movement without removing too much volume.`,
    tags: [{ styling: null }, { thinning: null }],
    relatedProductIds: [BigInt(4), BigInt(6)]
  }
];
function useProducts(filter) {
  return useQuery({
    queryKey: ["products", filter],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      let products = [...MOCK_PRODUCTS];
      if (filter == null ? void 0 : filter.searchTerm) {
        const term = filter.searchTerm.toLowerCase();
        products = products.filter(
          (p) => p.name.toLowerCase().includes(term) || p.brand.toLowerCase().includes(term) || p.description.toLowerCase().includes(term)
        );
      }
      if (filter == null ? void 0 : filter.category) {
        const catKey = Object.keys(filter.category)[0];
        products = products.filter((p) => catKey in p.category);
      }
      if (filter == null ? void 0 : filter.sortOrder) {
        if ("byPrice" in filter.sortOrder) {
          products.sort((a, b) => a.price - b.price);
        } else if ("byRating" in filter.sortOrder) {
          products.sort((a, b) => b.rating - a.rating);
        } else if ("byPopularity" in filter.sortOrder) {
          products.sort((a, b) => Number(b.reviewCount - a.reviewCount));
        }
      }
      return products;
    },
    staleTime: 1e3 * 60 * 5
  });
}
function useProduct(id) {
  return useQuery({
    queryKey: ["product", id == null ? void 0 : id.toString()],
    queryFn: async () => {
      if (!id) return null;
      await new Promise((r) => setTimeout(r, 200));
      return MOCK_PRODUCTS.find((p) => p.id === id) ?? null;
    },
    enabled: id !== void 0,
    staleTime: 1e3 * 60 * 5
  });
}
function useRelatedProducts(productId, limit = 3) {
  return useQuery({
    queryKey: ["relatedProducts", productId == null ? void 0 : productId.toString(), limit],
    queryFn: async () => {
      if (!productId) return [];
      await new Promise((r) => setTimeout(r, 200));
      const product = MOCK_PRODUCTS.find((p) => p.id === productId);
      if (!product) return [];
      return MOCK_PRODUCTS.filter(
        (p) => p.id !== productId && Object.keys(p.category)[0] === Object.keys(product.category)[0]
      ).slice(0, limit);
    },
    enabled: productId !== void 0,
    staleTime: 1e3 * 60 * 5
  });
}
function useProductReviews(productId) {
  return useQuery({
    queryKey: ["reviews", productId == null ? void 0 : productId.toString()],
    queryFn: async () => {
      if (!productId) return [];
      await new Promise((r) => setTimeout(r, 200));
      return [
        {
          id: BigInt(1),
          productId,
          authorName: "Margaret H.",
          rating: 5,
          content: "Finally a product that brightens my grey hair without making it brittle. I've been using this for 3 months and my hair feels so much healthier!",
          date: BigInt(Date.now() - 10 * 24 * 60 * 60 * 1e3)
        },
        {
          id: BigInt(2),
          productId,
          authorName: "Dorothy K.",
          rating: 4,
          content: "Lovely scent and my hair feels soft after every wash. I noticed less yellowing in my silver strands within the first two weeks.",
          date: BigInt(Date.now() - 25 * 24 * 60 * 60 * 1e3)
        },
        {
          id: BigInt(3),
          productId,
          authorName: "Robert S.",
          rating: 5,
          content: "My wife recommended this to me and I'm very happy with the results. My scalp feels healthy and my hair has more volume.",
          date: BigInt(Date.now() - 40 * 24 * 60 * 60 * 1e3)
        }
      ];
    },
    enabled: productId !== void 0,
    staleTime: 1e3 * 60 * 5
  });
}
function useSubmitReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      await new Promise((r) => setTimeout(r, 500));
      return {
        id: BigInt(Math.floor(Math.random() * 1e4)),
        productId: data.productId,
        authorName: data.authorName,
        rating: data.rating,
        content: data.content,
        date: BigInt(Date.now())
      };
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", variables.productId.toString()]
      });
    }
  });
}
function useGuideArticles(tag) {
  return useQuery({
    queryKey: ["guides", tag ? Object.keys(tag)[0] : "all"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      if (!tag) return MOCK_GUIDES;
      const tagKey = Object.keys(tag)[0];
      return MOCK_GUIDES.filter((g) => g.tags.some((t) => tagKey in t));
    },
    staleTime: 1e3 * 60 * 10
  });
}
function useGuideArticle(id) {
  return useQuery({
    queryKey: ["guide", id == null ? void 0 : id.toString()],
    queryFn: async () => {
      if (!id) return null;
      await new Promise((r) => setTimeout(r, 200));
      return MOCK_GUIDES.find((g) => g.id === id) ?? null;
    },
    enabled: id !== void 0,
    staleTime: 1e3 * 60 * 10
  });
}
export {
  MOCK_PRODUCTS as M,
  useProduct as a,
  useProductReviews as b,
  useRelatedProducts as c,
  useSubmitReview as d,
  useGuideArticles as e,
  useGuideArticle as f,
  getGuideTagLabel as g,
  getCategoryLabel as h,
  useProducts as u
};
