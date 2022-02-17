import { Injectable } from "@angular/core";
import { SettingsStore } from "../settings-store/settings-store.service";
import { AppTheme } from "./theme.constants";

@Injectable({providedIn: 'root'})
export class ThemeService {
    constructor(private settingsStore: SettingsStore) {}

    public setTheme(theme: AppTheme): void {
        const root = document.getElementsByTagName('html' )[0];
        root.setAttribute('theme', theme);
        this.settingsStore.setTheme(theme);
    }
}