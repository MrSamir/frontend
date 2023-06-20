import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    private _loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor() { }

    show() {
        this._loadingSubject.next(true);
    }

    hide() {
        this._loadingSubject.next(false);
    }

    get isLoading() {
        return this._loadingSubject.getValue();
    }
}
