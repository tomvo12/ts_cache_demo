/// <reference path="typings/index.d.ts" />

const keyPrefix: string = "cache_";

export class Cache {

    static cache = {};

    public static memoize(func: () => Promise<any>, resolver?: () => string, ttl?: number): Promise<any> {

        var key = keyPrefix + (resolver ? resolver.apply(this, arguments) : arguments[0]);
        if (this.hasOwnProperty.call(this.cache, key)) {
            console.log("cache hit for key: " + key);
            return this.cache[key]
        } else {
            if (ttl) {
                console.log("set cache expiration for key '" + key + "' to " + ttl);
                setTimeout(
                    () => {
                        console.log("cache key " + key + " expired after " + ttl + " ms");
                        delete this.cache[key]
                    },
                    ttl);
            }
            console.log("cache miss for key: " + key);
            return this.cache[key] = func.apply(this, arguments);
        }
    }
}