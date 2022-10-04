namespace FormatUtils {
    export function numberToString(number: number): string {
        return round2(number / (1.0)).toString().replace(",", "").replace(".", ",")
    }
    export function dateToString(date: Date): string {
        return date.toString().split("-").reverse().join("/")
    }

    function round2(number: number): number {
        return Math.round((number + Number.EPSILON) * 100) / 100
    }
}