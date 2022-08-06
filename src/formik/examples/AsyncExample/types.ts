export const generateProvinces = (regionName: any) => Array(5).fill(0).map((_, i) => ({ region: regionName, name: `${regionName} - Province ${i + 1}` }))

export const db = {
    regions: [
        { name: 'Region 1', provinces: generateProvinces('Region 1') },
        { name: 'Region 2', provinces: generateProvinces('Region 2') },
        { name: 'Region 3', provinces: generateProvinces('Region 3') },
        { name: 'Region 4', provinces: generateProvinces('Region 4') },
        { name: 'Region 5', provinces: generateProvinces('Region 5') }
    ]
}

export interface FormModel {
    region: string,
    province: string
}