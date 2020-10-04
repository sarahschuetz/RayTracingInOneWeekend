export default class Preconditions {
    public static checkNotNull<T>(objectToCheck: T, errorMessage: string): T {
        if(objectToCheck === null) {
            throw new Error(errorMessage);
        }
        return objectToCheck;
    }
}