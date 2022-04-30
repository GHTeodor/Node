export interface IPaginationResponseInterface<T> {
    page: number,
    perPage: number,
    itemCount: number,
    data: T[]
}
