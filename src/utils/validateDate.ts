export function isValideDate(value: any): string | true {
    const currentDate = new Date()
    const date = new Date(value)

    if(date < currentDate) return 'Data não pode ser no passado.';
    else if(!isNaN(date.getTime())) return 'Data inválida';
    return true
}