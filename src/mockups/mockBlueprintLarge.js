export default {
    generated: '2025-01-01T16:45:14.2848751+00:00',
    generator: 'v2',
    instanceId: 36,
    name: 'Test',
    version: '1',
    relatedProducts:
    [
        {
            name: 'Test',
            styleCode: 'Test',
            productId: 39275,
            related:
            [],
            navigable: false,
            tags:
            []
        }
    ],
    styleCode: 'Test',
    tags:
    [],
    productStatus: 'Production',
    productType: 'Standard',
    imageProvider: 'drive',
    imageRootUrl: 'https://fx.images.drivecommerce.com/api/v1/drive/image/ref/ABvGt3/',
    imageNameFormat:
    [
        {
            type: 'static',
            text: 'CZ-'
        },
        {
            type: 'placementless-code'
        }
    ],
    imageMapping:
    [],
    custom:
    {
        'property-with-json': '[{"a":5}]',
    },
    packages:
    [
        {
            componentPackageId: 28718,
            name: 'Main',
            custom:
            {}
        }
    ],
    views:
    [
        {
            name: 'Preview',
            code: 'Preview',
            hidden: false,
            viewType: 'Single',
            frameLow: 1,
            custom:
            {},
            bakeInRecipe: true,
            onlySelectedPlacements: false,
            placements:
            [],
            productionReady: false,
            variants:
            []
        }
    ],
    groups:
    [
        {
            name: 'Main',
            code: 'Main',
            custom:
            {},
            placements:
            [
                {
                    name: 'Selected SKU',
                    code: 'SelectedSku',
                    hidden: false,
                    locked: false,
                    components:
                    [
                        {
                            code: 'BlankSku',
                            placementIndependentCode: 'BlankSku',
                            dynamicCode: 'BlankSku',
                            packages:
                            [
                                28718
                            ],
                            available: true,
                            custom:
                            {},
                            description:
                            [
                                {
                                    definition: 'Sku',
                                    name: 'Blank SKU',
                                    code: 'BlankSku',
                                    otherCodes:
                                    [],
                                    custom:
                                    {},
                                    inventoryType: 'None'
                                }
                            ],
                            placeholder: true,
                            tags:
                            [],
                            topTags:
                            [],
                            removeTaggedProducts:
                            [],
                            addProducts:
                            [],
                            joints:
                            [],
                            assets:
                            []
                        },
                        {
                            code: 'SKUCode',
                            placementIndependentCode: 'SKUCode',
                            dynamicCode: 'SKUCode',
                            packages:
                            [
                                28718
                            ],
                            available: true,
                            custom:
                            {
                            },
                            description:
                            [
                                {
                                    definition: 'Sku',
                                    name: 'SKUCode',
                                    code: 'SKUCode',
                                    otherCodes:
                                    [],
                                    custom:
                                    {},
                                    inventoryType: 'None'
                                }
                            ],
                            tags:
                            [
                                'SKUCode'
                            ],
                            topTags:
                            [],
                            removeTaggedProducts:
                            [],
                            addProducts:
                            [],
                            joints:
                            [],
                            assets:
                            []
                        }
                    ],
                },
            ],
        },
    ],
    dimensions:
    [],
    rules:
    [
        {
            source:
            [],
            type: 'Action',
            target:
            [],
            except:
            [],
            condition:
            {
                type: 'And',
                group:
                [
                    {
                        type: 'Component',
                        placement: 'Placement',
                        component: 'Component'
                    }
                ]
            },
            action:
            {
                type: 'SelectComponent',
                placement: 'SelectedSku',
                component: 'SKU'
            },
            inactive: false
        }
    ],
    noSiblingRules: false,
    combineOnlyWhen: false,
    inventory:
    [],
    sites:
    [],
    translations:
    {},
    timings:
    {
        related: 0,
        imageMapping: 0,
        imageViews: 0,
        packages: 0,
        groups: 197,
        metadata: 2,
        metadataCache: 473,
        cache: 1,
        inventory: 3
    },
    message: ''
};
