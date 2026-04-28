export function isValideDate(value: any): boolean {
    const currentDate = new Date()
    const date = new Date(value)

    if(date < currentDate) return false
    ;
    else if(isNaN(date.getTime())) return false;
    return true
}