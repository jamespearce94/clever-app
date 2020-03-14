import { Pipe, PipeTransform } from '@angular/core';
import format from 'date-fns/format';

@Pipe({ name: 'dateFormat', pure: false })
export class DateFormatPipe implements PipeTransform {
    constructor() {
    }

    public transform(date: Date, dateFormat: string) {
        return format(date, dateFormat);
    }
}