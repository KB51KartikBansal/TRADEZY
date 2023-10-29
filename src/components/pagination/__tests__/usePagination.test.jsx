import { usePagination } from '../usePagination';
import { renderHook } from '@testing-library/react'
let totalCount = 150;
let pageSize = 10;
describe("testing pagination hook", () => {
    it("testing pagination hook with only right dots", () => {
        let currentPage = 1;
        const { result } = renderHook(() => usePagination({ totalCount, pageSize, currentPage }))
        expect(result.current).toEqual([1, 2, 3, '...', 15]);
    })
    it("testing pagination hook2 with dots on both ends", () => {
        let currentPage = 5;
        const { result } = renderHook(() => usePagination({ totalCount, pageSize, currentPage }))
        expect(result.current).toEqual([1, '...', 4, 5, 6, '...', 15]);
    })
    it("testing pagination hook3 with only left dots", () => {
        let currentPage = 14;
        let siblingCount = 1;
        const { result } = renderHook(() => usePagination({ totalCount, pageSize, siblingCount, currentPage }))
        expect(result.current).toEqual([1, '...', 11, 12, 13, 14, 15]);
    })
    it("testing pagination hook4 with only 1 page", () => {
        let currentPage = 1;
        totalCount = 30;
        const { result } = renderHook(() => usePagination({ totalCount, pageSize, currentPage }))
        expect(result.current).toEqual([1, 2, 3]);
    })
    it("testing pagination with predefined page numbers", () => {
        let currentPage = 1;
        let totalPages = 3;
        totalCount = 30;
        const { result } = renderHook(() => usePagination({ totalCount, pageSize, currentPage, totalPages }))
        expect(result.current).toEqual([1, 2, 3]);
    })
})