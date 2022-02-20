import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { CustomEventConfig } from './event-dispatcher.constants';

@Injectable({
  providedIn: 'root',
})
export class EventDispatcherService {
  public dispatchEvent(eventName: string, config?: CustomEventConfig): void {
    const eventNameUnique = eventName.trim();
    console.log(eventNameUnique);
    const event = new CustomEvent(eventNameUnique, config);
    window.dispatchEvent(event);
  }

  public on(eventName: string): Observable<Partial<CustomEvent>> {
    return fromEvent(window, eventName.trim());
  }
}
