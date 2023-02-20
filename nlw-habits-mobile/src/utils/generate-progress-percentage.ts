export function generateProgressPercentage(total: number, completed: number) {

    return Math.random((completed / total) * 100)

}