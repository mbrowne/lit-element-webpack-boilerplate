// lit-element's @property decorator, upgraded for Babel 7 and current decorators proposal
export function property(options) {
    return elementDescriptor => {
        return {
            ...elementDescriptor,
            // TEMP WORKAROUND - rename instance field
            key: '__' + elementDescriptor.key,
            finisher(klass) {
                klass.createProperty(elementDescriptor.key, options)
            }
        }
    }
}
