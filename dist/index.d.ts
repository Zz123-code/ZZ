export declare function initTrackingSDK(): void;
export declare function trackEvent(eventType: string, extraData?: Record<string, any>): void;
export declare function unloadTrackingSDK(): void;
declare global {
    interface Window {
        TrackingSDK?: {
            initTrackingSDK: typeof initTrackingSDK;
            trackEvent: typeof trackEvent;
            unloadTrackingSDK: typeof unloadTrackingSDK;
        };
    }
}
