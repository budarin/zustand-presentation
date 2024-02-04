const selector = (params) => useCallback(
    useShallow( (state) => { ... params ...}), 
    [params]
);