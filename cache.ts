/// <reference path="typings/index.d.ts" />

export namespace Cache {
    const keyPrefix: string = "cache_";
    
    let cache: { [key: string]: any } = {};

    public static memoize<T>(func: () => Promise<T>, resolver?: () => string, ttl?: number): Promise<T> {
        const key = keyPrefix + (resolver && resolver() || arguments[0]);
        
        if (cache.hasOwnProperty(key)) {
            console.log("cache hit for key: " + key);
            return this.cache[key];
        } else {
            if (ttl) {
                console.log("set cache expiration for key '" + key + "' to " + ttl);
                setTimeout(
                    () => {
                        console.log("cache key " + key + " expired after " + ttl + " ms");
                        delete this.cache[key];
                    },
                    ttl);
            }
            
            console.log("cache miss for key: " + key);
            return this.cache[key] = func();
        }
    }
}
