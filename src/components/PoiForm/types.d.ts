export interface IPoiForm {
    _id: string,
    name: string
    description?: string
    image?: File
    pos: IPos
}