import { Pipe, PipeTransform } from '@angular/core'
import { Song } from '../songs'
import { orderBy } from 'lodash-es'

@Pipe({
  name: 'byTitle'
})
export class ByTitlePipe implements PipeTransform {
  transform(songs: Song[]) {
    return orderBy(songs, ['title'], ['asc'])
  }
}
