import { Pipe, PipeTransform } from '@angular/core';
import { Song } from '../songs';

@Pipe({
  name: 'remix',
})
export class RemixPipe implements PipeTransform {
  transform(songs: Song[]) {
    return songs?.filter(
      (song) => song.artist !== 'Captain' && song.artist !== 'Mike Allison'
    );
  }
}
