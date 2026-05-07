import { PropsWithChildren } from "react";

const OptionalChildren = ({ children, condition, fallback }: PropsWithChildren<{ condition: any, fallback?: React.ReactNode }>) => {

    if (condition) return children;
    return fallback;

}

export default OptionalChildren;