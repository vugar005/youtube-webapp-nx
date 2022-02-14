import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectVideoSearchQuery } from "../../../reducers";
import { VideoActions } from "../../actions";

@Injectable({providedIn: 'root'})
export class VideoStoreService {
   constructor(private store: Store) {}

   public setSearchQuery(query: string): void {
       this.store.dispatch(VideoActions.setVideoSearchQuery({payload: query}));
   }

   public selectSearchQuery() {
       return this.store.select(selectVideoSearchQuery);
   }
}