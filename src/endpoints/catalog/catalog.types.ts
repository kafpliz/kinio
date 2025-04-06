
export type SortOption = "relesed" | "-relesed" | "rating" | "-rating" | "-name" | "name" | '-votes' | 'votes'
export const SortOptionArr = ["relesed", "-relesed", "rating", "-rating", "-name", "name", '-votes', 'votes']

export type StatusType = "announced" | "completed" | "filming" | "post-production" | "pre-production"
export const  StatusArr = ["announced", "completed", "filming", "post-production", "pre-production"]

export type OrderType = 'DESC' | "ASC" | undefined