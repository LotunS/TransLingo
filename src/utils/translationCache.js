class TranslationCache {
    constructor(ttl = 1000 * 60 * 60) { // 1 hour
        this.ttl = ttl;
        this.cache = new Map();
    }

    get(key) {
        const entry = this.cache.get(key);

        if (!entry) return null;

        if (Date.now() > entry.expires) {
            this.cache.delete(key);
            return null;
        }

        return entry.value;
    }

    set(key, value) {
        this.cache.set(key, {
            value,
            expires: Date.now() + this.ttl,
        });
    }

    clearExpired() {
        const now = Date.now();

        for (const [key, value] of this.cache) {
            if (value.expires < now) {
                this.cache.delete(key);
            }
        }
    }
}

module.exports = new TranslationCache();