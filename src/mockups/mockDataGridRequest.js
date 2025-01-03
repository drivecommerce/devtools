export default {
    from: 'TestGrid',
    filter:
    {
        and:
        [
            {
                field: 'Style',
                op: 'Equal',
                value: 'TestStyle'
            }
        ]
    },
    take: 100,
    skip: 0
};
